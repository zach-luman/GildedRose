class Normal {
  constructor(item) {
    this.item = item;

    this.MAX_QUALITY = 50;
    this.MIN_QUALITY = 0;
  }

  adjustItem() {
    this.adjustQuality();
    this.adjustSellIn();
  }

  adjustQuality() {
    let qualityChange = this.getQualityAdjustRate();

    if (this.item.sellIn <= 0) {
      qualityChange *= 2;
    }

    if (this.item.name.includes('Conjured')) {
      qualityChange *= 2;
    }

    const newQuality = this.item.quality + qualityChange;

    this.item.quality = Math.max(
      this.MIN_QUALITY,
      Math.min(
        newQuality,
        this.MAX_QUALITY
      )
    );
  }

  adjustSellIn() {
    this.item.sellIn += this.getSellInAdjustRate();
  }

  getQualityAdjustRate() {
    return -1;
  }

  getSellInAdjustRate() {
    return -1;
  }
}

module.exports = Normal;
