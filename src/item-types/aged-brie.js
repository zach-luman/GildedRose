const Normal = require('./normal');

class AgedBrie extends Normal {
  getQualityAdjustRate() {
    return 1;
  }
}

module.exports = AgedBrie;
