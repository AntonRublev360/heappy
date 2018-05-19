# heappy
Simple Binary Heap implementation.
Supports pop, push, peek, heapify and mutateTop operations.

Heap is a data structure that holds a collection of comparable objects and allows to extract min(max) object in a time logarithmic of the
number of items in the heap.

## Installation
```
npm i --save heappy
```

## Usage
```js
import Heap from 'heappy';
// default parameters
const minHeap = new Heap([5, 19, 33, 4]);
minHeap.push(5);
minHeap.push(19);
minHeap.push(33);
minHeap.push(4);
minHeap.push(3);
minHeap.pop(); // 3
minHeap.pop(); // 4
minHeap.peek(); // 5
minHeap.mutateTop((item) => item + 10); // 15
minHeap.getSize(); // 3

// array passed as the first parameter will be heapified
const maxHeap = new Heap([5, 19, 33, 4], (e1, e2) => e1 - e2);
maxHeap.pop(); // 33
```

## Supported Heap Methods
### constructor
```js
new Heap(items?: any[], compare?: (item, nextItem) => number);
```
#### parameters
 - items: Optional. Array of items to create a heap from. Note: items array will be mutated. Consider `new Heap([...items])` if you need to avoid mutation.
 - compare: Optional. Function that compares two items and returns a number. Positive, if the first item is smaller than the second; negative, if the first item is greater than the second; zero, if items are equal.


### getSize
```js
heap.getSize(): number;
```
Returns the size of the heap.

### push
```js
heap.push(item: any);
```
Adds an item to the heap. Preserves the heap condition.
#### parameters
 - item: An item to be added to the heap.

### pop
```js
heap.pop(): any;
```
Returns the item at the top of the heap and removes it from the heap. Preserves the heap condition.

### peek
```js
heap.peek(): any;
```
Returns the item at the top of the heap. Keeps the item in the heap.

### mutateTop
```js
heap.mutateTop(mutator: (item: any) => any): any;
```
Applies the mutator to the top item from the heap and returns mutated item. Preserves heap condition.
#### parameters
 - mutator: A pure function that receives an item as a parameter and returns a new item to be placed back in the heap.

Note: same opeartion could be done by `pop`ing an item, creating a new item and `push`ing it back in the heap. However, it would require an unnecessary extra `log(N)`-operation (sink new top item after popping + float new item after pushing).