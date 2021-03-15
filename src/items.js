const ItemTypesFactory = require('./item-types-factory');

class Items {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items
      .map(ItemTypesFactory.createItemType)
      .forEach(itemType => itemType.adjustItem());

    return this.items;
  }
}

module.exports = Items;
