// 保育園データローダークラス
// PDFから抽出したJSONデータを読み込み、使いやすい形式に変換
class NurseryDataLoader {
  constructor() {
    this.rawData = null;
    this.parsedData = [];
  }

  // データ読み込みメイン処理
  async loadData() {
    try {
      const response = await fetch('data/extracted_tables.json');
      if (!response.ok) {
        throw new Error('データの読み込みに失敗しました');
      }

      this.rawData = await response.json();
      this.parsedData = this.parseAllPages();

      console.log(`${this.parsedData.length}件の保育園データを読み込みました`);
      return this.parsedData;
    } catch (error) {
      console.error('データ読み込みエラー:', error);
      throw error;
    }
  }

  // 全ページのデータをパース
  parseAllPages() {
    const facilities = [];
    let idCounter = 1;
    let currentRegion = '';

    this.rawData.forEach(pageData => {
      const { page, table_index, data } = pageData;

      // ヘッダー行をスキップ(最初の2行)
      const dataRows = data.slice(2);

      dataRows.forEach(row => {
        // 空行をスキップ
        if (!row || row.every(cell => !cell)) return;

        // 地域名を更新
        if (row[0] && row[0].trim()) {
          currentRegion = row[0].replace(/\n/g, '').replace(/地域/g, '').trim() + '地域';
        }

        const facility = this.parseFacility(row, page, table_index, idCounter++, currentRegion);
        if (facility) facilities.push(facility);
      });
    });

    return facilities;
  }

  // 個別の保育園データをパース
  parseFacility(row, page, tableIndex, id, currentRegion) {
    const name = row[1];

    // 小規模保育園などはrow[2]に住所が入り、row[3]が定員
    // 認可保育園などはrow[2]がnull/空、row[3]が住所、row[4]が定員
    let address, capacity;
    if (row[2] && !isNaN(parseInt(row[3]))) {
      // 小規模保育園形式: row[2]=住所, row[3]=定員
      address = row[2];
      capacity = parseInt(row[3]) || 0;
    } else {
      // 認可保育園形式: row[3]=住所, row[4]=定員
      address = row[3];
      capacity = parseInt(row[4]) || 0;
    }

    // 保育園名がない場合はスキップ
    if (!name || !name.trim()) return null;

    // 年齢別データの抽出
    const ageData = [];
    let totalApplied = 0;
    let totalAccepted = 0;

    // 年齢別データの開始インデックスを決定
    const ageDataStartIndex = (row[2] && !isNaN(parseInt(row[3]))) ? 4 : 5;

    for (let age = 0; age <= 5; age++) {
      const appliedIndex = ageDataStartIndex + age * 2;
      const acceptedIndex = ageDataStartIndex + age * 2 + 1;

      const appliedStr = row[appliedIndex];
      const acceptedStr = row[acceptedIndex];

      // 空白または空文字の場合はスキップ(年齢対象外)
      if (appliedStr === '' || appliedStr === null || appliedStr === undefined) continue;
      if (acceptedStr === '' || acceptedStr === null || acceptedStr === undefined) continue;

      const applied = parseInt(appliedStr) || 0;
      const accepted = parseInt(acceptedStr) || 0;

      const ratio = this.calculateRatio(applied, accepted);
      // 簡易的な空き推定: 定員が年齢別に分からないため、内定数から逆算
      const vacancy = capacity > 0 ? Math.max(0, capacity - totalAccepted - accepted) : 0;

      ageData.push({
        age: `${age}歳`,
        applied,
        accepted,
        ratio,
        vacancy
      });

      totalApplied += applied;
      totalAccepted += accepted;
    }

    // 年齢データがない場合はスキップ
    if (ageData.length === 0) return null;

    // 全体の応募倍率
    const overallRatio = this.calculateRatio(totalApplied, totalAccepted);

    // 施設タイプの判定
    const facilityType = this.determineFacilityType(page, tableIndex);

    return {
      id,
      name: name.trim(),
      region: currentRegion,
      address: address || '',
      capacity,
      facilityType,
      ageData,
      totalApplied,
      totalAccepted,
      overallRatio
    };
  }

  // 応募倍率の計算
  calculateRatio(applied, accepted) {
    if (accepted === 0) {
      return applied > 0 ? 999 : 0; // 内定0の場合は特殊値999
    }
    return parseFloat((applied / accepted).toFixed(2));
  }

  // 施設タイプの判定
  determineFacilityType(page, tableIndex) {
    if (page === 1 || page === 2) return '認可保育園';
    if (page === 3 && tableIndex === 1) return '認定こども園';
    if (page === 3 && tableIndex === 2) return '小規模保育園';
    if (page === 4 && tableIndex === 1) return '家庭的保育者';
    if (page === 4 && tableIndex === 2) return '送迎保育園';
    return 'その他';
  }
}
