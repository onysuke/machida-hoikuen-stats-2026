// 保育園ダッシュボードクラス (実データ直接表示版)
class NurseryDashboard {
  constructor() {
    this.dataLoader = new NurseryDataLoader();
    this.nurseryData = [];
    this.filteredData = [];
    this.charts = {};
    this.currentRanking = 'ratio';
    this.currentRankingAge = 'all';  // ランキングの年齢フィルタ
    this.currentRankingRegion = 'all';  // ランキングの地域フィルタ
    this.currentRegionAge = 'all';  // 地域別グラフの年齢フィルタ
    this.rankingDisplayCount = 5;  // ランキングの表示件数（初期値は5件）

    // 保育園のホームページリンクマッピング
    this.homepageLinks = {
      "クローバー": "https://clover.keikoukai.ed.jp/",
      "市立こうさぎ": "https://kosodate-machida.tokyo.jp/soshiki/4/4/4/1290.html",
      "サンフィール": "http://sunfeel-hoikuen.com/",
      "多摩境敬愛": "https://www.keiaigakuen.com/hoikuen/tamasakai/",
      "敬愛桃の実": "https://www.keiaigakuen.com/hoikuen/momonomi/",
      "もみの木": "https://www.mominokihoikuen.net/",
      "小山": "https://oyamahoikuen.ed.jp/index.html",
      "かえで": "https://www.koufuukai.ed.jp/",
      "かりん": "https://karinhoiku.com/",
      "町田ときわ": "https://www.teiaikai.or.jp/",
      "桜台": "https://yasuragikai.net/sakuradai/",
      "子どもの森": "https://www.kodomonomori-n.com/",
      "しぜんの国": "https://toukoukai.org/hoiku/small-village/",
      "ユニケ": "https://www.yunike.ed.jp/",
      "市立山崎": "https://kosodate-machida.tokyo.jp/soshiki/4/4/4/1310.html",
      "たかね": "https://hoiku.takane.ed.jp/",
      "たかね第二": "https://www.takane.ed.jp/",
      "ひかりの子": "https://www.hikarinoko.or.jp/",
      "すみれ": "http://www.sumire-nursery.ed.jp/",
      "すずらん": "http://suzuran.sumire-nursery.ed.jp/",
      "木曽": "https://www.kiso-hoikuen.jp/",
      "第二わかくさ": "https://m-wakakusa.net/",
      "まなざし": "http://www.manazashi.sakura.ne.jp/",
      "アスク木曽西": "https://www.nihonhoiku.co.jp/blog/kisonishi/",
      "こっこのもり": "https://www.kokkonomori.net/",
      "カナリヤ": "https://www.kanariya.org/nurseryschool",
      "わかば": "https://machida-fukushi.or.jp/hoiku/",
      "草笛": "https://kusabue.keikoukai.ed.jp/",
      "玉川さくら": "https://www.tamagawasakura.site/",
      "本町田わかくさ": "https://m-wakakusa.net/honmachida-wakakusa",
      "もりの聖愛": "https://yasuragikai.net/morino/",
      "市立町田": "https://kosodate-machida.tokyo.jp/soshiki/4/4/4/1260.html",
      "赤ちゃんの家": "http://www.akachan-no-ie.com/",
      "こひつじ": "https://kohitsujikai.xsrv.jp/wp/",
      "未来保育CLUB": "https://sunnyside-mirai.com/",
      "なごみ": "https://www.753kai.or.jp/",
      "開進こども": "https://kaishin.ac.jp/nursery/",
      "なごみ第二": "https://www.753kai.or.jp/",
      "太陽の子町田駅前": "https://www.kidslife-nursery.com/facility/tokyo/machida/machida/",
      "まちっこ": "https://machicco.net/",
      "まなびの森 保育園町田プチ・クレイシュ": "http://kodomonomori.co.jp/mc/",
      "高ヶ坂": "https://kogasaka.org/",
      "高ヶ坂ふたば": "https://kogasakafutaba.org/",
      "こうりん": "https://www.kourin.site/",
      "こばと": "https://kobatohoikuen.net/",
      "市立金森": "https://kosodate-machida.tokyo.jp/soshiki/4/4/4/1272.html",
      "ねむの木": "https://kosodate-web.com/nemunoki/",
      "成瀬南野": "http://www.naruseminamino.jp/",
      "町田わかくさ": "https://m-wakakusa.net/",
      "成瀬くりの家": "https://toukoukai.org/hoiku/kuri/",
      "田園": "http://www.denenho.sakura.ne.jp/",
      "町田南": "https://machidaminami.com/",
      "光の原": "http://www.hikarinohara.com/",
      "南つくし野": "https://m-tsukushi.ryobi.or.jp/",
      "ハッピードリーム鶴間": "https://hd-tsuruma.ryobi.or.jp/",
      "もりのおがわ": "https://www.morinoogawa.net/",
      "こびとのもり": "https://www.kobitonomori.org/",
      "レイモンド南町田": "https://www.lemonkai.or.jp/school/nursary/leimond-minamimachida-hoikuen/",
      "子どもの森南町田": "https://www.minamimachida.net/",
      "子どもの森ゆうぱーく": "https://www.yuupa-ku.net/",
      "ベネッセ南町田グランベリーパーク": "https://hoiku.benesse-style-care.co.jp/facilities/area_tokyo/machida/h-minamimachida/",
      "ゆうき山": "https://yuukiyama.ciao.jp/",
      "小野路": "https://www.koufuukai.ed.jp/onoji/",
      "おひさま共同": "https://www.ohisamakyodo.com/",
      "井の花": "https://inohana.ciao.jp/",
      "市立大蔵": "https://kosodate-machida.tokyo.jp/soshiki/4/4/4/1322.html",
      "つるかわ": "https://www.keishou.org/",
      "ききょう": "https://www.kikyou-swc.or.jp/",
      "花の木": "https://hananoki-hoikuen.jp/",
      "三輪": "http://www.miwaaikou-hoikuen.com/",
      "三輪あいこう": "http://www.miwaaikou-hoikuen.com/",
      "みどりの森": "https://www.midorinomorihoikuen.net/",
      "東平しらゆり": "https://www.higashidaira.com/",
      "ぽっぽの森": "http://www.popponomori.jp/"
    };

    this.init();
  }

  async init() {
    try {
      await this.loadNurseryData();
      this.initializeEventListeners();

      // 初期表示
      await this.renderCharts();
      this.renderRanking(this.currentRanking);
      this.applyFilters();
    } catch (error) {
      console.error('初期化エラー:', error);
      this.showMessage('データの読み込みに失敗しました', 'error');
    }
  }

  async loadNurseryData() {
    this.nurseryData = await this.dataLoader.loadData();
    this.filteredData = [...this.nurseryData];
  }

  initializeEventListeners() {
    // 地域別年齢タブ
    document.querySelectorAll('.region-age-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const age = e.target.dataset.age;
        this.switchRegionAge(age);
      });
    });

    // ランキング年齢セレクター
    document.getElementById('ranking-age-select')?.addEventListener('change', (e) => {
      this.currentRankingAge = e.target.value;
      this.renderRanking(this.currentRanking);
    });

    // ランキング地域セレクター
    document.getElementById('ranking-region-select')?.addEventListener('change', (e) => {
      this.currentRankingRegion = e.target.value;
      this.renderRanking(this.currentRanking);
    });

    // ランキングタブ
    document.querySelectorAll('.ranking-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const rankingType = e.target.dataset.ranking;
        this.switchRanking(rankingType);
      });
    });

    // ランキングアイテムのクリックイベント（動的に追加されるため、委譲イベントを使用）
    document.getElementById('ranking-list')?.addEventListener('click', (e) => {
      const rankingItem = e.target.closest('.ranking-item');
      if (rankingItem) {
        const nurseryId = rankingItem.dataset.nurseryId;
        if (nurseryId) {
          this.scrollToNursery(nurseryId);
        }
      }
    });

    // フィルター
    document.getElementById('age-filter')?.addEventListener('change', () => {
      this.applyFilters();
    });

    document.getElementById('region-filter')?.addEventListener('change', () => {
      this.applyFilters();
    });

    // サイドバーの閉じるボタン
    document.querySelector('.sidebar-close-btn')?.addEventListener('click', () => {
      this.closeMapSidebar();
    });

    // ESCキーでサイドバーを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMapSidebar();
      }
    });

    // モバイル用: スワイプでサイドバーを閉じる
    this.initializeSidebarSwipe();

    // 地図へスクロールするボタン
    this.initializeScrollToMapButton();
  }

  // スワイプでサイドバーを閉じる機能
  initializeSidebarSwipe() {
    const sidebar = document.getElementById('map-sidebar');
    const header = document.querySelector('.map-sidebar-header');
    if (!sidebar || !header) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    header.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 768) return; // モバイルのみ
      startY = e.touches[0].clientY;
      isDragging = true;
      sidebar.style.transition = 'none';
    });

    header.addEventListener('touchmove', (e) => {
      if (!isDragging || window.innerWidth > 768) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // 下方向のスワイプのみ許可
      if (deltaY > 0) {
        sidebar.style.transform = `translateY(${deltaY}px)`;
      }
    });

    header.addEventListener('touchend', () => {
      if (!isDragging || window.innerWidth > 768) return;

      isDragging = false;
      sidebar.style.transition = '';

      const deltaY = currentY - startY;

      // 100px以上下にスワイプしたら閉じる
      if (deltaY > 100) {
        this.closeMapSidebar();
      } else {
        // 元の位置に戻す
        sidebar.style.transform = 'translateY(0)';
      }
    });
  }

  // 地図へスクロールするボタンの初期化
  initializeScrollToMapButton() {
    const scrollToMapBtn = document.getElementById('scroll-to-map-btn');
    const mapContainer = document.getElementById('nursery-map');

    if (!scrollToMapBtn || !mapContainer) return;

    // ボタンクリック時の処理
    scrollToMapBtn.addEventListener('click', () => {
      mapContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    // スクロール位置に応じてボタンの表示/非表示を切り替え
    const toggleButtonVisibility = () => {
      const mapRect = mapContainer.getBoundingClientRect();

      // 地図が画面外（上にスクロールアウト）したらボタンを表示
      // 地図の下端が画面の上端より上にある = 地図が完全に見えなくなったら表示
      if (mapRect.bottom < 0) {
        scrollToMapBtn.classList.add('visible');
      } else {
        scrollToMapBtn.classList.remove('visible');
      }
    };

    // スクロールイベントをリスナー登録
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleButtonVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 初期状態を設定
    toggleButtonVisibility();
  }

  switchRegionAge(age) {
    this.currentRegionAge = age;

    // タブのアクティブ状態を更新
    document.querySelectorAll('.region-age-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.age === age) {
        tab.classList.add('active');
      }
    });

    // グラフを再描画
    this.renderRegionChart();
  }

  // updateStats() 関数は統計サマリーカードが削除されたため不要
  // updateStats() {
  //   const totalFacilities = this.nurseryData.length;
  //   const totalApplied = 2913;
  //   const totalAccepted = 2117;
  //   const avgRatio = totalAccepted > 0 ? (totalApplied / totalAccepted).toFixed(2) : '0.00';
  // }

  async renderCharts() {
    this.renderRegionChart();
    this.renderAgeChart();
    await this.renderMap();
  }

  renderRegionChart() {
    const regionData = this.aggregateByRegion(this.currentRegionAge);

    const ctx = document.getElementById('region-chart')?.getContext('2d');
    if (!ctx) return;

    if (this.charts.regionChart) {
      this.charts.regionChart.destroy();
    }

    this.charts.regionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: regionData.labels,
        datasets: [
          {
            label: '内定数',
            data: regionData.accepted,
            backgroundColor: 'rgba(34, 34, 34, 0.8)',
            borderColor: 'rgba(34, 34, 34, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: '応募数',
            data: regionData.applied,
            backgroundColor: 'rgba(255, 56, 92, 0.7)',
            borderColor: 'rgba(255, 56, 92, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: '応募倍率',
            data: regionData.ratio,
            type: 'line',
            borderColor: 'rgba(113, 113, 113, 1)',
            backgroundColor: 'rgba(113, 113, 113, 0.1)',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(113, 113, 113, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 12
              },
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label + '地域';
              },
              label: function(context) {
                const idx = context.dataIndex;
                let label = context.dataset.label || '';

                if (context.datasetIndex === 0) {
                  // 内定数
                  const accepted = context.parsed.y;
                  return `${label}: ${accepted}名`;
                } else if (context.datasetIndex === 1) {
                  // 応募数
                  const applied = context.parsed.y;
                  return `${label}: ${applied}名`;
                } else if (context.datasetIndex === 2) {
                  // 応募倍率
                  const ratio = context.parsed.y;
                  return `${label}: ${ratio}倍`;
                }
                return label;
              },
              footer: function(tooltipItems) {
                const idx = tooltipItems[0].dataIndex;
                const accepted = regionData.accepted[idx];
                const applied = regionData.applied[idx];
                const ratio = regionData.ratio[idx];

                return [
                  '',
                  '━━━━━━━━━━━━━━━━',
                  `内定数: ${accepted}名`,
                  `応募数: ${applied}名`,
                  `倍率: ${ratio}倍`,
                  '',
                  '※応募数は第五希望までの合計',
                  '　実際の倍率より高く表示されます'
                ];
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 12
            },
            footerFont: {
              size: 11
            },
            displayColors: true,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: '人数',
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 13,
                weight: '600'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            title: {
              display: true,
              text: '応募倍率',
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 13,
                weight: '600'
              }
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              font: {
                size: 11
              },
              callback: function(value) {
                return value + '倍';
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  }

  renderAgeChart() {
    const ageData = this.aggregateByAge();

    const ctx = document.getElementById('age-chart')?.getContext('2d');
    if (!ctx) return;

    if (this.charts.ageChart) {
      this.charts.ageChart.destroy();
    }

    this.charts.ageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ageData.labels,
        datasets: [
          {
            label: '内定数',
            data: ageData.accepted,
            type: 'bar',
            backgroundColor: 'rgba(34, 34, 34, 0.8)',
            borderColor: 'rgba(34, 34, 34, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: '応募数',
            data: ageData.applied,
            type: 'bar',
            backgroundColor: 'rgba(255, 56, 92, 0.7)',
            borderColor: 'rgba(255, 56, 92, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: '応募倍率',
            data: ageData.ratio,
            type: 'line',
            borderColor: 'rgba(113, 113, 113, 1)',
            backgroundColor: 'rgba(113, 113, 113, 0.1)',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(113, 113, 113, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 12
              },
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.datasetIndex === 2) {
                  // 応募倍率の場合
                  label += context.parsed.y.toFixed(2) + '倍';
                } else {
                  // 応募数・内定数の場合
                  label += context.parsed.y + '人';
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: '人数',
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            title: {
              display: true,
              text: '倍率',
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 12
              }
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  renderFacilityTypeChart() {
    const typeData = this.aggregateByFacilityType();

    const ctx = document.getElementById('facility-type-chart')?.getContext('2d');
    if (!ctx) return;

    if (this.charts.facilityTypeChart) {
      this.charts.facilityTypeChart.destroy();
    }

    this.charts.facilityTypeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: typeData.labels,
        datasets: [{
          data: typeData.counts,
          backgroundColor: [
            'rgba(255, 56, 92, 0.9)',
            'rgba(34, 34, 34, 0.85)',
            'rgba(113, 113, 113, 0.8)',
            'rgba(221, 221, 221, 0.85)',
            'rgba(247, 247, 247, 0.9)'
          ],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: '-apple-system, BlinkMacSystemFont, Segoe UI',
                size: 12
              },
              padding: 16,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value}件 (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  aggregateByRegion(ageFilter = 'all') {
    const regionMap = new Map();

    this.nurseryData.forEach(facility => {
      if (!regionMap.has(facility.region)) {
        regionMap.set(facility.region, {
          capacity: 0,
          accepted: 0,
          applied: 0
        });
      }
      const data = regionMap.get(facility.region);

      if (ageFilter === 'all') {
        // 全体: 全年齢の合計
        data.capacity += facility.capacity;
        data.accepted += facility.totalAccepted;
        data.applied += facility.totalApplied;
      } else {
        // 特定年齢のみ
        const ageData = facility.ageData.find(ad => ad.age === `${ageFilter}歳`);
        if (ageData) {
          // 年齢別定員は分からないため、内定数を使用
          data.capacity += ageData.accepted;  // 仮の定員として内定数を使用
          data.accepted += ageData.accepted;
          data.applied += ageData.applied;
        }
      }
    });

    const labels = Array.from(regionMap.keys()).sort();
    const capacity = labels.map(label => regionMap.get(label).capacity);
    const accepted = labels.map(label => regionMap.get(label).accepted);
    const applied = labels.map(label => regionMap.get(label).applied);

    // 空き席数 = 定員 - 内定数
    const vacancy = labels.map((_, idx) =>
      Math.max(0, capacity[idx] - accepted[idx])
    );

    // 充足率 = 内定数 / 定員 × 100
    const fulfillmentRate = labels.map((_, idx) =>
      capacity[idx] > 0 ? (accepted[idx] / capacity[idx] * 100).toFixed(1) : 0
    );

    // 倍率 = 応募数 / 内定数（応募数をそのまま使用）
    const ratio = labels.map((_, idx) => {
      const acc = accepted[idx];
      return acc > 0 ? (applied[idx] / acc).toFixed(2) : 0;
    });

    return {
      labels,
      capacity,
      accepted,
      vacancy,
      fulfillmentRate,
      ratio,
      applied
    };
  }

  aggregateByAge() {
    // 町田市公式データ（2026年4月一次募集）
    // 注: 施設ごとの応募数を足し合わせると第五希望までの重複が含まれるため、
    // 公式の応募人数データを使用
    const officialData = {
      '0歳': { applied: 680, accepted: 535 },
      '1歳': { applied: 1155, accepted: 780 },
      '2歳': { applied: 425, accepted: 252 },
      '3歳': { applied: 534, accepted: 465 },
      '4歳': { applied: 77, accepted: 57 },
      '5歳': { applied: 42, accepted: 28 }
    };

    const ages = ['0歳', '1歳', '2歳', '3歳', '4歳', '5歳'];
    const applied = [];
    const accepted = [];
    const ratio = [];

    ages.forEach(age => {
      const data = officialData[age];
      applied.push(data.applied);
      accepted.push(data.accepted);

      // 倍率を計算
      const ageRatio = data.accepted > 0 ? data.applied / data.accepted : 0;
      ratio.push(ageRatio);
    });

    return { labels: ages, applied, accepted, ratio };
  }

  aggregateByFacilityType() {
    const types = {};

    this.nurseryData.forEach(facility => {
      types[facility.facilityType] = (types[facility.facilityType] || 0) + 1;
    });

    return {
      labels: Object.keys(types),
      counts: Object.values(types)
    };
  }

  switchRanking(type) {
    // vacancyオプションを無効化
    if (type === 'vacancy') return;

    this.currentRanking = type;
    this.rankingDisplayCount = 5;  // ランキングタイプ変更時は表示件数をリセット

    // タブのアクティブ状態
    document.querySelectorAll('.ranking-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.ranking === type) {
        tab.classList.add('active');
      }
    });

    this.renderRanking(type);
  }

  renderRanking(type) {
    let sorted = [...this.nurseryData];

    // 地域フィルタリング
    if (this.currentRankingRegion !== 'all') {
      sorted = sorted.filter(facility => facility.region === this.currentRankingRegion);
    }

    // 年齢フィルタリング
    if (this.currentRankingAge !== 'all') {
      sorted = sorted.filter(facility =>
        facility.ageData.some(ad => ad.age === `${this.currentRankingAge}歳`)
      );
    }

    // 倍率ランキングの場合は∞(999)を除外
    if (type === 'ratio') {
      if (this.currentRankingAge === 'all') {
        sorted = sorted.filter(facility => facility.overallRatio < 999);
      } else {
        sorted = sorted.filter(facility => {
          const ageData = facility.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`);
          return ageData && ageData.ratio < 999;
        });
      }
    }

    // ソートロジック
    if (this.currentRankingAge === 'all') {
      // 全年齢の場合
      switch (type) {
        case 'ratio':
          sorted.sort((a, b) => b.overallRatio - a.overallRatio);
          break;
        case 'applied':
          sorted.sort((a, b) => b.totalApplied - a.totalApplied);
          break;
      }
    } else {
      // 特定年齢の場合
      switch (type) {
        case 'ratio':
          sorted.sort((a, b) => {
            const ratioA = a.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`)?.ratio || 0;
            const ratioB = b.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`)?.ratio || 0;
            return ratioB - ratioA;
          });
          break;
        case 'applied':
          sorted.sort((a, b) => {
            const appliedA = a.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`)?.applied || 0;
            const appliedB = b.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`)?.applied || 0;
            return appliedB - appliedA;
          });
          break;
      }
    }

    const displayItems = sorted.slice(0, this.rankingDisplayCount);
    const hasMore = sorted.length > this.rankingDisplayCount;

    const container = document.getElementById('ranking-list');
    if (!container) return;

    container.innerHTML = displayItems.map((facility, index) => {
      let value, unit, ratioClass = '';
      let breakdown = '';

      // 年齢別または全体のデータを取得
      let displayRatio, displayApplied, displayAccepted;
      if (this.currentRankingAge === 'all') {
        displayRatio = facility.overallRatio;
        displayApplied = facility.totalApplied;
        displayAccepted = facility.totalAccepted;
      } else {
        const ageData = facility.ageData.find(ad => ad.age === `${this.currentRankingAge}歳`);
        displayRatio = ageData?.ratio || 0;
        displayApplied = ageData?.applied || 0;
        displayAccepted = ageData?.accepted || 0;
      }

      switch (type) {
        case 'ratio':
          value = displayRatio === 999 ? '∞' : displayRatio;
          unit = '倍';
          // 内訳を追加（応募数/内定数）
          breakdown = `<div class="ranking-breakdown">${displayApplied}人/${displayAccepted}人</div>`;
          // 色分類
          if (displayRatio === 999) {
            ratioClass = 'ratio-infinite';
          } else {
            const ratioNum = parseFloat(displayRatio);
            if (!isNaN(ratioNum)) {
              if (ratioNum >= 3) {
                ratioClass = 'ratio-high';
              } else if (ratioNum >= 1.5) {
                ratioClass = 'ratio-medium';
              } else {
                ratioClass = 'ratio-low';
              }
            }
          }
          break;
        case 'applied':
          value = displayApplied;
          unit = '名';
          break;
      }

      return `
        <div class="ranking-item" data-nursery-id="${facility.id}" title="クリックして保育園の詳細を表示">
          <div class="ranking-number">${index + 1}</div>
          <div class="ranking-info">
            <div class="ranking-name">${facility.name}</div>
            <div class="ranking-details">
              ${facility.region} · ${facility.facilityType}
            </div>
          </div>
          <div class="ranking-value-wrapper">
            <div class="ranking-value ${ratioClass}">${value}${unit}</div>
            ${breakdown}
          </div>
        </div>
      `;
    }).join('');

    // 「もっと見る」ボタン
    if (hasMore) {
      const showMoreBtn = document.createElement('button');
      showMoreBtn.className = 'show-more-btn';
      showMoreBtn.innerHTML = '▼ もっと見る';
      showMoreBtn.addEventListener('click', () => {
        this.rankingDisplayCount += 5;
        this.renderRanking(type);
      });
      container.appendChild(showMoreBtn);
    }
  }

  applyFilters() {
    const ageFilter = document.getElementById('age-filter')?.value;
    const regionFilter = document.getElementById('region-filter')?.value;

    this.filteredData = this.nurseryData.filter(facility => {
      if (regionFilter && facility.region !== regionFilter) {
        return false;
      }

      if (ageFilter) {
        const hasAgeData = facility.ageData.some(ad => ad.age === `${ageFilter}歳`);
        if (!hasAgeData) return false;
      }

      return true;
    });

    this.renderFilteredList();
    this.updateMapMarkers();
  }

  renderFilteredList() {
    const container = document.getElementById('filtered-nursery-list');
    if (!container) return;

    if (this.filteredData.length === 0) {
      container.innerHTML = '<p class="no-results">条件に合う保育園が見つかりませんでした。</p>';
      return;
    }

    container.innerHTML = this.filteredData.map(facility =>
      this.renderNurseryCard(facility)
    ).join('');
  }

  // 地図を表示（非同期）
  async renderMap() {
    const mapContainer = document.getElementById('nursery-map');
    if (!mapContainer) return;

    // 町田市の中心座標
    const machidaCenter = [35.5493, 139.4466];

    // 地図を初期化
    this.map = L.map('nursery-map').setView(machidaCenter, 12);

    // OpenStreetMapタイルを追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);

    // マーカーグループを作成
    this.markers = [];

    // 保育園の座標データを非同期で取得
    const coordinates = await this.getNurseryCoordinates();

    // マーカーを追加
    this.nurseryData.forEach(facility => {
      const coords = coordinates[facility.name];
      if (coords) {
        // 倍率に応じてマーカーの色を変える
        let markerColor = '#48BB78'; // 緑（低倍率）
        if (facility.overallRatio >= 3) {
          markerColor = '#FF385C'; // 赤（高倍率）
        } else if (facility.overallRatio >= 1.5) {
          markerColor = '#FFB800'; // 黄（中倍率）
        }

        // 保育園の種類に応じてマーカーの形を変える
        const markerShape = this.getMarkerShape(facility.facilityType, markerColor);

        // カスタムアイコンを作成
        const icon = L.divIcon({
          className: 'custom-marker',
          html: markerShape,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        // マーカーを作成
        const marker = L.marker([coords.lat, coords.lng], { icon })
          .bindPopup(this.createMapPopup(facility), {
            maxWidth: 300
          })
          .bindTooltip(this.createMapTooltip(facility), {
            direction: 'top',
            offset: [0, -12],
            opacity: 0.95
          })
          .addTo(this.map);

        // マーカークリック時の処理
        marker.on('click', () => {
          // モバイル判定（768px以下）
          const isMobile = window.innerWidth <= 768;

          if (isMobile) {
            // モバイルの場合はポップアップを開く（デフォルト動作を維持）
            // ポップアップは自動で開かれる
          } else {
            // デスクトップの場合はポップアップを閉じてサイドバーを開く
            marker.closePopup();
            this.openMapSidebar(facility);
          }
        });

        // マーカーに施設情報を保存
        marker.facilityData = facility;
        this.markers.push(marker);
      }
    });
  }

  // 地図のマーカーを更新（フィルター連動）
  updateMapMarkers() {
    if (!this.map || !this.markers) return;

    const ageFilter = document.getElementById('age-filter')?.value;
    const regionFilter = document.getElementById('region-filter')?.value;

    // フィルタに合う座標を収集
    const visibleBounds = [];

    this.markers.forEach(marker => {
      const facility = marker.facilityData;
      let shouldShow = true;

      // 地域フィルター
      if (regionFilter && facility.region !== regionFilter) {
        shouldShow = false;
      }

      // 年齢フィルター
      if (ageFilter) {
        const hasAgeData = facility.ageData.some(ad => ad.age === `${ageFilter}歳`);
        if (!hasAgeData) {
          shouldShow = false;
        }
      }

      // マーカーの表示/非表示
      if (shouldShow) {
        if (!this.map.hasLayer(marker)) {
          marker.addTo(this.map);
        }
        visibleBounds.push(marker.getLatLng());
      } else {
        if (this.map.hasLayer(marker)) {
          this.map.removeLayer(marker);
        }
      }
    });

    // フィルタリング後のマーカーにフォーカス
    if (visibleBounds.length > 0) {
      const bounds = L.latLngBounds(visibleBounds);
      this.map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 13
      });
    }
  }

  // 地図のツールチップコンテンツを作成（ホバー時）
  createMapTooltip(facility) {
    const ratio = facility.overallRatio === 999 ? '∞' : facility.overallRatio;
    return `
      <div style="text-align: center; font-size: 13px; line-height: 1.4;">
        <div style="font-weight: 600; margin-bottom: 4px;">${facility.name}</div>
        <div style="font-size: 12px; color: #666;">倍率: ${ratio}倍 · 内定: ${facility.totalAccepted}名</div>
      </div>
    `;
  }

  // 地図のポップアップコンテンツを作成
  createMapPopup(facility) {
    const homepage = this.getHomepageLink(facility.name);
    return `
      <div class="map-popup">
        <div class="map-popup-title">${facility.name}</div>
        <div class="map-popup-info">${facility.region} · ${facility.facilityType}</div>
        <div class="map-popup-info">定員: ${facility.capacity}名</div>
        <div class="map-popup-info">応募倍率: ${facility.overallRatio === 999 ? '∞' : facility.overallRatio}倍</div>
        <div class="map-popup-info">総応募: ${facility.totalApplied}名 · 内定: ${facility.totalAccepted}名</div>
        <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="map-popup-detail-btn" onclick="event.stopPropagation(); nurseryDashboard.scrollToNurseryFromMap(${facility.id})">
            カード一覧で見る
          </button>
          ${homepage ? `<a href="${homepage}" target="_blank" rel="noopener noreferrer" class="map-popup-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            HP
          </a>` : ''}
        </div>
      </div>
    `;
  }

  // 保育園の種類に応じたマーカーの形状を取得
  getMarkerShape(facilityType, color) {
    const size = 24;
    const strokeWidth = 2;

    // 施設タイプごとに異なる形状を定義
    switch (facilityType) {
      case '認可保育園':
        // 円形
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <circle cx="${size/2}" cy="${size/2}" r="${size/2 - strokeWidth}" fill="${color}" stroke="white" stroke-width="${strokeWidth}"/>
          </svg>
        `;

      case '認定こども園':
        // 四角形
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <rect x="${strokeWidth}" y="${strokeWidth}" width="${size - strokeWidth*2}" height="${size - strokeWidth*2}"
                  fill="${color}" stroke="white" stroke-width="${strokeWidth}" rx="2"/>
          </svg>
        `;

      case '小規模保育園':
        // 三角形
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <polygon points="${size/2},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}"
                     fill="${color}" stroke="white" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
          </svg>
        `;

      case '家庭的保育者':
        // ダイヤモンド形（回転した四角形）
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <polygon points="${size/2},${strokeWidth} ${size - strokeWidth},${size/2} ${size/2},${size - strokeWidth} ${strokeWidth},${size/2}"
                     fill="${color}" stroke="white" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
          </svg>
        `;

      case '送迎保育園':
        // 六角形
        const r = size / 2 - strokeWidth;
        const cx = size / 2;
        const cy = size / 2;
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          hexPoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
        }
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <polygon points="${hexPoints.join(' ')}" fill="${color}" stroke="white" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
          </svg>
        `;

      default:
        // その他 - 星形
        const starR1 = size / 2 - strokeWidth;
        const starR2 = starR1 / 2.5;
        const starCx = size / 2;
        const starCy = size / 2;
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? starR1 : starR2;
          const angle = (Math.PI * 2 / 10) * i - Math.PI / 2;
          starPoints.push(`${starCx + radius * Math.cos(angle)},${starCy + radius * Math.sin(angle)}`);
        }
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <polygon points="${starPoints.join(' ')}" fill="${color}" stroke="white" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
          </svg>
        `;
    }
  }

  // 保育園の座標データを取得（JSONファイルから）
  async getNurseryCoordinates() {
    try {
      const response = await fetch('data/nursery_coordinates.json');
      if (!response.ok) {
        throw new Error('座標データの読み込みに失敗しました');
      }
      const coordinates = await response.json();
      console.log(`${Object.keys(coordinates).length}件の座標データを読み込みました`);
      return coordinates;
    } catch (error) {
      console.error('座標データ読み込みエラー:', error);
      // フォールバック: 空のオブジェクトを返す
      return {};
    }
  }

  // 保育園のホームページリンクを取得
  getHomepageLink(facilityName) {
    // 保育園名から余分な文字を除去してマッチング
    const cleanName = facilityName.replace(/保育園|認定こども園|小規模保育園|保育所/g, '').trim();

    // 完全一致を試みる
    if (this.homepageLinks[facilityName]) {
      return this.homepageLinks[facilityName];
    }

    // クリーンな名前で一致を試みる
    if (this.homepageLinks[cleanName]) {
      return this.homepageLinks[cleanName];
    }

    // 部分一致を試みる（本園・分園対応）
    for (const [key, value] of Object.entries(this.homepageLinks)) {
      if (cleanName.includes(key) || key.includes(cleanName)) {
        return value;
      }
    }

    return null;
  }

  // ランキングから保育園カードへスクロール
  scrollToNursery(nurseryId) {
    // 該当の保育園を検索
    const facility = this.nurseryData.find(f => f.id == nurseryId);
    if (!facility) return;

    // フィルターをクリアして全保育園を表示
    document.getElementById('age-filter').value = '';
    document.getElementById('region-filter').value = facility.region; // 該当地域でフィルター
    this.applyFilters();

    // 少し待ってから要素を検索（DOMの更新を待つ）
    setTimeout(() => {
      const cardElement = document.getElementById(`nursery-${nurseryId}`);
      if (cardElement) {
        // スムーズスクロール
        cardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // ハイライト効果を追加
        cardElement.classList.add('highlight-card');

        // 3秒後にハイライトを削除
        setTimeout(() => {
          cardElement.classList.remove('highlight-card');
        }, 3000);
      }
    }, 100);
  }

  renderNurseryCard(facility) {
    const ageFilter = document.getElementById('age-filter')?.value;
    const homepage = this.getHomepageLink(facility.name);

    return `
      <div class="nursery-card" id="nursery-${facility.id}">
        <div class="nursery-header">
          <div class="nursery-name-row">
            <div class="nursery-name">${facility.name}</div>
            ${homepage ? `
              <a href="${homepage}" target="_blank" rel="noopener noreferrer" class="homepage-link" title="ホームページを開く">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                HP
              </a>
            ` : ''}
          </div>
          <div class="nursery-meta">
            <span class="badge badge-region">${facility.region}</span>
            <span class="badge badge-type">${facility.facilityType}</span>
          </div>
        </div>

        <div class="nursery-stats-grid">
          <div class="nursery-stat">
            <div class="nursery-stat-label">定員</div>
            <div class="nursery-stat-value">${facility.capacity}<span class="stat-unit">人</span></div>
          </div>
          <div class="nursery-stat">
            <div class="nursery-stat-label">総応募</div>
            <div class="nursery-stat-value">${facility.totalApplied}<span class="stat-unit">人</span></div>
          </div>
          <div class="nursery-stat">
            <div class="nursery-stat-label">総内定</div>
            <div class="nursery-stat-value">${facility.totalAccepted}<span class="stat-unit">人</span></div>
          </div>
          <div class="nursery-stat">
            <div class="nursery-stat-label">応募倍率</div>
            <div class="nursery-stat-value">
              ${facility.overallRatio === 999 ? '∞' : facility.overallRatio}<span class="stat-unit">倍</span>
            </div>
          </div>
        </div>

        <div class="age-breakdown">
          <h4>年齢別状況</h4>
          <div class="age-grid">
            ${facility.ageData.map(ad => {
              // 倍率に応じてクラスを決定
              let ratioClass = '';
              const ratioNum = parseFloat(ad.ratio);
              if (ad.ratio === 999) {
                ratioClass = 'ratio-infinite';
              } else if (!isNaN(ratioNum)) {
                if (ratioNum >= 3) {
                  ratioClass = 'ratio-high';
                } else if (ratioNum >= 1.5) {
                  ratioClass = 'ratio-medium';
                }
              }

              return `
              <div class="age-item ${ageFilter && ad.age === `${ageFilter}歳` ? 'highlight' : ''} ${ratioClass}">
                <div class="age-label">${ad.age}</div>
                <div class="age-ratio">
                  ${ad.ratio === 999 ? '∞' : ad.ratio}倍
                </div>
                <div style="font-size: 0.75em; color: #717171;">
                  ${ad.applied}/${ad.accepted}
                </div>
              </div>
            `}).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 地図サイドバーを開く
  openMapSidebar(facility) {
    const sidebar = document.getElementById('map-sidebar');
    const title = document.getElementById('sidebar-title');
    const content = document.getElementById('sidebar-content');

    if (!sidebar || !title || !content) return;

    // タイトル設定
    title.textContent = facility.name;

    // コンテンツ生成
    content.innerHTML = this.renderSidebarContent(facility);

    // サイドバーを開く
    sidebar.classList.add('open');

    // 現在選択中の施設IDを保存
    this.selectedFacilityId = facility.id;
  }

  // 地図サイドバーを閉じる
  closeMapSidebar() {
    const sidebar = document.getElementById('map-sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
    this.selectedFacilityId = null;
  }

  // サイドバーコンテンツを生成
  renderSidebarContent(facility) {
    const ageFilter = document.getElementById('age-filter')?.value;
    const homepage = this.getHomepageLink(facility.name);

    return `
      <div class="sidebar-facility-meta">
        <div class="nursery-meta">
          <span class="badge badge-region">${facility.region}</span>
          <span class="badge badge-type">${facility.facilityType}</span>
          ${homepage ? `
            <a href="${homepage}" target="_blank" rel="noopener noreferrer" class="sidebar-homepage-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              HP
            </a>
          ` : ''}
        </div>
      </div>

      <div class="nursery-stats-grid">
        <div class="nursery-stat">
          <div class="nursery-stat-label">定員</div>
          <div class="nursery-stat-value">${facility.capacity}<span class="stat-unit">人</span></div>
        </div>
        <div class="nursery-stat">
          <div class="nursery-stat-label">総応募</div>
          <div class="nursery-stat-value">${facility.totalApplied}<span class="stat-unit">人</span></div>
        </div>
        <div class="nursery-stat">
          <div class="nursery-stat-label">総内定</div>
          <div class="nursery-stat-value">${facility.totalAccepted}<span class="stat-unit">人</span></div>
        </div>
        <div class="nursery-stat">
          <div class="nursery-stat-label">応募倍率</div>
          <div class="nursery-stat-value">
            ${facility.overallRatio === 999 ? '∞' : facility.overallRatio}<span class="stat-unit">倍</span>
          </div>
        </div>
      </div>

      <div class="age-breakdown">
        <h4>年齢別状況</h4>
        <div class="age-grid">
          ${facility.ageData.map(ad => {
            let ratioClass = '';
            const ratioNum = parseFloat(ad.ratio);
            if (ad.ratio === 999) {
              ratioClass = 'ratio-infinite';
            } else if (!isNaN(ratioNum)) {
              if (ratioNum >= 3) {
                ratioClass = 'ratio-high';
              } else if (ratioNum >= 1.5) {
                ratioClass = 'ratio-medium';
              }
            }

            return `
            <div class="age-item ${ageFilter && ad.age === ageFilter + '歳' ? 'highlight' : ''} ${ratioClass}">
              <div class="age-label">${ad.age}</div>
              <div class="age-ratio">
                ${ad.ratio === 999 ? '∞' : ad.ratio}倍
              </div>
              <div style="font-size: 0.75em; color: #717171;">
                ${ad.applied}/${ad.accepted}
              </div>
            </div>
          `}).join('')}
        </div>
      </div>

      <div style="margin-top: 24px;">
        <button class="sidebar-action-btn" onclick="nurseryDashboard.scrollToNurseryFromSidebar(${facility.id})">
          カード一覧で見る
        </button>
      </div>
    `;
  }

  // サイドバーからカード一覧へスクロール
  scrollToNurseryFromSidebar(nurseryId) {
    // サイドバーを閉じる
    this.closeMapSidebar();
    // サイドバーが閉じるのを待ってからスクロール
    setTimeout(() => {
      this.scrollToNursery(nurseryId);
    }, 400);
  }

  // 地図マーカーのポップアップからカード一覧へスクロール
  scrollToNurseryFromMap(nurseryId) {
    // 該当の保育園を検索
    const facility = this.nurseryData.find(f => f.id == nurseryId);
    if (!facility) return;

    // フィルターをクリアして全保育園を表示
    document.getElementById('age-filter').value = '';
    document.getElementById('region-filter').value = facility.region; // 該当地域でフィルター
    this.applyFilters();

    // 少し待ってから要素を検索（DOMの更新を待つ）
    setTimeout(() => {
      const cardElement = document.getElementById(`nursery-${nurseryId}`);
      if (cardElement) {
        // スムーズスクロール
        cardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // ハイライト効果を追加
        cardElement.classList.add('highlight-card');

        // 3秒後にハイライトを削除
        setTimeout(() => {
          cardElement.classList.remove('highlight-card');
        }, 3000);
      }
    }, 100);
  }

  showMessage(text, type = 'success') {
    const container = document.getElementById('message-container');
    if (!container) return;

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    container.appendChild(message);

    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        if (message.parentNode === container) {
          container.removeChild(message);
        }
      }, 300);
    }, 3000);
  }
}

// グローバル変数
let nurseryDashboard;

// ページ読み込み後に初期化
document.addEventListener('DOMContentLoaded', () => {
  nurseryDashboard = new NurseryDashboard();
});
