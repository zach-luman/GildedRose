const Item = require('../src/item');
const Items = require('../src/items');

describe('Item', () => {
  let items;

  function createItems({ name, sellIn = 10, quality = 10 }) {
    return new Items(
      [
        new Item(name, sellIn, quality),
      ]
    );
  }

  function getItem() {
    return items.items[0];
  }

  beforeEach(() => {
    items = createItems({ name: 'foo', quality: 1, sellIn: 0 });
  });

  it('reduces sellIn by 1 each day', () => {
    const previousSellIn = getItem().sellIn;
    items.updateQuality();
    expect(getItem().sellIn).toEqual(previousSellIn - 1);
  });

  it('reduces quality by 1 each day', () => {
    const previousQuality = getItem().quality;
    items.updateQuality();
    expect(getItem().quality).toEqual(previousQuality - 1);
  });

  describe('if quality is 0', () => {
    beforeEach(() => {
      items = createItems({ name: 'foo', quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      items.updateQuality();
      expect(getItem().quality).toEqual(0);
    });
  });

  describe('if sellIn date has passed', () => {
    beforeEach(() => {
      items = createItems({ name: 'foo', quality: 2, sellIn: 0 });
    });

    it('reduces quality by 2 each day', () => {
      const previousQuality = getItem().quality;
      items.updateQuality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });
  });

  describe('Aged Brie Item', () => {
    const name = 'Aged Brie';

    beforeEach(() => {
      items = createItems({ name, quality: 1, sellIn: 1 });
    });

    it('increases in quality by 1 each day', () => {
      const previousQuality = getItem().quality;
      items.updateQuality();
      expect(getItem().quality).toEqual(previousQuality + 1);
    });

    describe('if sellIn date has passed', () => {
      const sellIn = 0;

      beforeEach(() => {
        items = createItems({ name, quality: 1, sellIn });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        items.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });
    });

    describe('if quality is 50', () => {
      beforeEach(() => {
        items = createItems({ name, quality: 50, sellIn: 10 });
      });

      it('does not increase in quality', () => {
        items.updateQuality();
        expect(getItem().quality).toEqual(50);
      });
    });
  });

  describe('Backstage passes Item', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    describe('if sellIn is greater than 10', () => {
      const sellIn = 11;

      beforeEach(() => {
        items = createItems({ name, sellIn });
      });

      it('increases in quality by 1 each day', () => {
        const previousQuality = getItem().quality;
        items.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 1);
      });
    });

    describe('if sellIn is euqal to or lower than 10', () => {
      const sellIn = 10;

      beforeEach(() => {
        items = createItems({ name, sellIn });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        items.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });
    });

    describe('if sellIn is euqal to or lower than 5', () => {
      const sellIn = 5;

      beforeEach(() => {
        items = createItems({ name, sellIn });
      });

      it('increases in quality by 3 each day', () => {
        const previousQuality = getItem().quality;
        items.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 3);
      });
    });

    describe('if sellIn is equal to or lower than 0', () => {
      const sellIn = 0;

      beforeEach(() => {
        items = createItems({ name, sellIn });
      });

      it('has 0 quality', () => {
        items.updateQuality();
        expect(getItem().quality).toEqual(0);
      });
    });
  });

  describe('Sulfuras Item', () => {
    beforeEach(() => {
      items = createItems({ name: 'Sulfuras, Hand of Ragnaros', quality: 10, sellIn: 10 });
    });

    it('does not decrease in quality', () => {
      const previousQuality = getItem().quality;
      items.updateQuality();
      expect(getItem().quality).toEqual(previousQuality);
    });

    it('does not reduce sellIn date', () => {
      const previousSellIn = getItem().sellIn;
      items.updateQuality();
      expect(getItem().sellIn).toEqual(previousSellIn);
    });
  });

  describe('Conjured Item', () => {
    beforeEach(() => {
      items = new Items([
        new Item('Item', 10, 10),
        new Item(`Conjured item`, 10, 10),
      ]);
    });

    it('degrades in quality twice as fast as normal items', () => {
      items.updateQuality();
      const regularDifferenceInQuality = 10 - getItem().quality;
      const conjuredDifferenceInQuality = 10 - items.items[1].quality;
      expect(conjuredDifferenceInQuality).toEqual(2 * regularDifferenceInQuality);
    });
  });
});
