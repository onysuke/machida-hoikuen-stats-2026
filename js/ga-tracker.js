/**
 * Google Analytics 4 イベントトラッキングヘルパー
 */
class GATracker {
  constructor() {
    // gtagの存在チェックは実行時に行う（初期化時ではない）
  }

  /**
   * カスタムイベントを送信
   * @param {string} eventName - イベント名（snake_case推奨）
   * @param {object} params - イベントパラメータ
   */
  trackEvent(eventName, params = {}) {
    // gtagが定義されているかチェック
    if (typeof gtag === 'undefined') {
      console.log('[GA Tracker - Dev Mode]', eventName, params);
      return;
    }

    try {
      gtag('event', eventName, params);
      console.log('[GA Tracker]', eventName, params);
    } catch (error) {
      console.error('[GA Tracker Error]', error);
    }
  }

  /**
   * コンテンツ選択イベント（タブ切り替えなど）
   * @param {string} contentType - コンテンツタイプ
   * @param {string} contentId - コンテンツID
   * @param {object} additionalParams - 追加パラメータ
   */
  trackSelectContent(contentType, contentId, additionalParams = {}) {
    this.trackEvent('select_content', {
      content_type: contentType,
      content_id: contentId,
      ...additionalParams
    });
  }

  /**
   * アイテム選択イベント（カードクリック、マーカークリックなど）
   * @param {string} itemId - アイテムID
   * @param {string} itemName - アイテム名
   * @param {string} itemCategory - カテゴリ
   * @param {object} additionalParams - 追加パラメータ
   */
  trackSelectItem(itemId, itemName, itemCategory, additionalParams = {}) {
    this.trackEvent('select_item', {
      item_id: itemId,
      item_name: itemName,
      item_category: itemCategory,
      ...additionalParams
    });
  }

  /**
   * フィルター変更イベント
   * @param {string} filterType - フィルタータイプ（age/region）
   * @param {string} filterValue - フィルター値
   * @param {string} section - セクション（ranking/search）
   * @param {object} additionalParams - 追加パラメータ
   */
  trackFilterChange(filterType, filterValue, section, additionalParams = {}) {
    this.trackEvent('filter_change', {
      filter_type: filterType,
      filter_value: filterValue,
      section: section,
      ...additionalParams
    });
  }
}

// グローバルインスタンスを作成
const gaTracker = new GATracker();
