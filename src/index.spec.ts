import Heap = require('./index');

describe('Heap', () => {
  const items = [11, 3, 21, 44, 15, 1, 2, 3, 14, 7, 4, 5, 6];
  let heap;

  describe('push', () => {
    beforeEach(() => {
      heap = new Heap();
      heap.push(11);
      heap.push(3);
      heap.push(21);
      heap.push(44);
      heap.push(15);
      heap.push(1);
    });

    it('adds new element', () => {
      expect(heap.getItems()).toEqual(expect.arrayContaining([11, 1, 21, 44, 15, 3]));
    });

    it('preserves heap condition', () => {
      expect(isValidHeap(heap)).toBeTruthy();
    });
  });

  describe('heapify', () => {
    beforeEach(() => {
      heap = new Heap([...items]);
    });

    it('populates heap from array', () => {
      expect(heap.getItems()).toEqual(expect.arrayContaining(items));
    });

    it('preserves heap condition', () => {
      expect(isValidHeap(heap)).toBeTruthy();
    });
  });
  
  describe('pop', () => {
    let min;
    beforeEach(() => {
      heap = new Heap([...items]);
      min = heap.pop();
    });

    it('returns minimum element', () => {
      expect(min).toEqual(1);
    });
    
    it('removes minimum element', () => {
      expect(heap.getItems()).not.toContain(1);
    });

    it('preserves heap condition', () => {
      expect(isValidHeap(heap)).toBeTruthy();
    });
  });

  describe('peek', () => {
    let min;
    beforeEach(() => {
      heap = new Heap([...items]);
      min = heap.peek();
    });

    it('returns minimum element', () => {
      expect(min).toEqual(1);
    });
    
    it('does not change heap', () => {
      expect(heap.getItems()).toEqual(expect.arrayContaining(items));
    });
  });

  describe('mutateTop', () => {
    let mutatedItem;
    beforeEach(() => {
      heap = new Heap([...items]);
      mutatedItem = heap.mutateTop((item) => item + 8);
    });

    it('mutates element', () => {
      expect(heap.getItems()).toContain(mutatedItem);
    });

    it('returns mutated element', () => {
      expect(mutatedItem).toEqual(9);
    });

    it('preserves heap condition', () => {
      expect(isValidHeap(heap)).toBeTruthy();
    });
  });

  function isValidHeap(heap) {
    return !heap.getItems().find(failsHeapCondition);
  }
  function failsHeapCondition(item, index, array) {
    if (index === 0) {
      return false;
    }
    const parentItem = array[Math.ceil(index/2) - 1];
    return parentItem > item;
  }
});
