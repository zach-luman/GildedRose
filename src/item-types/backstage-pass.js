const Normal = require('./normal');

class BackstagePass extends Normal {
  adjustQuality() {
    if (this.item.sellIn <= 0) {
      this.item.quality = 0;
      return;
    }

    super.adjustQuality();
  }

  getQualityAdjustRate() {
    if (this.item.sellIn <= 5) {
      return 3;
    } else if (this.item.sellIn <= 10) {
      return 2;
    } else {
      return 1;
    }
  }
}

module.exports = BackstagePass;
