import defaultCompare from './defaultCompare';
const TOP_INDEX = 0;
const VOID_INDEX = -1;

class Heap {
  compare: (item1: any, item2: any) => number;
  private items: any[];

  constructor(items: any[] = [], compare: (item1: any, item2: any) => number = defaultCompare) {
    this.compare = compare;
    this.items = items;
    this.heapify();
  }

  getItems() {
    return this.items;
  }

  push(item: any) {
    this.items.push(item);
    this.float();
  }

  pop() {
    this.swapItems(TOP_INDEX, this.getLastIndex());
    const result = this.items.pop();
    this.sink(TOP_INDEX);
    return result;
  }

  peek() {
    return this.items[TOP_INDEX];
  }

  mutateTop(mutator: (item: any) => any) {
    const mutatedItem = mutator(this.items[TOP_INDEX]);
    this.items[TOP_INDEX] = mutatedItem;
    this.sink(TOP_INDEX);
    return mutatedItem;
  }

  getSize() {
    return this.items.length;
  }

  private heapify() {
    for (let index = this.getLastParentIndex(); index >= TOP_INDEX; index--) {
      this.sink(index);
    }
  }

  private getLastParentIndex() {
    return this.getParentIndex(this.getLastIndex());
  }

  private float() {
    let index = this.getLastIndex();
    let parentIndex = this.getParentIndex(index);
    while (this.isInvalidHeapCondition(index, parentIndex)) {
      this.swapItems(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  private sink(startingIndex: number) {
    let index = startingIndex;
    let childIndex = this.getMinChildIndex(index);
    while (this.isInvalidHeapCondition(childIndex, index)) {
      this.swapItems(index, childIndex);
      index = childIndex;
      childIndex = this.getMinChildIndex(index);
    }
  }

  private isInvalidHeapCondition(itemIndex: number, parentIndex: number) {
    if (parentIndex === VOID_INDEX || itemIndex === VOID_INDEX) {
      return false;
    }
    const item = this.items[itemIndex];
    const parent = this.items[parentIndex];
    return this.compare(parent, item) < 0;
  }

  private getParentIndex(itemIndex: number) {
    return Math.ceil(itemIndex/2) - 1;
  }

  private getMinChildIndex(itemIndex: number) {
    const leftChildIndex = this.getLeftChildIndex(itemIndex);
    if (leftChildIndex > this.getLastIndex()) {
      return VOID_INDEX;
    }
    const rightChildIndex = leftChildIndex + 1;
    if (rightChildIndex > this.getLastIndex()) {
      return leftChildIndex;
    }
    const left = this.items[leftChildIndex];
    const right = this.items[rightChildIndex];
    return this.compare(left, right) < 0
      ? rightChildIndex
      : leftChildIndex;
  }

  private getLeftChildIndex(itemIndex: number) {
    return (itemIndex + 1) * 2 - 1;
  }

  private swapItems(index1: number, index2: number) {
    const value1 = this.items[index1];
    this.items[index1] =  this.items[index2];
    this.items[index2] =  value1;
  }

  private getLastIndex() {
    return this.items.length - 1;
  }
}

export = Heap;
