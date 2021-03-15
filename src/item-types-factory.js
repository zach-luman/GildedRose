const Normal = require('./item-types/normal');
const AgedBrie = require('./item-types/aged-brie');
const Sulfuras = require('./item-types/sulfuras');
const BackstagePass = require('./item-types/backstage-pass');

class ItemTypesFactory {
  static createItemType(item) {
    if (item.name.includes('Aged Brie')) {
      return new AgedBrie(item);
    } else if (item.name.includes('Sulfuras, Hand of Ragnaros')) {
      return new Sulfuras(item);
    } else if (item.name.includes('Backstage passes to a TAFKAL80ETC concert')) {
      return new BackstagePass(item);
    } else {
      return new Normal(item);
    }
  }
}

module.exports = ItemTypesFactory;
