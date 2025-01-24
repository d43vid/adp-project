import { AvlSearchTree } from './avl-search-tree';
import testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('AvlSearchTree - `FindMin`, `Insert` & `Remove`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should create AVL search tree with elements and remove them again for ${key}`, () => {
      const numbers = value.filter((e): e is number => typeof e === 'number');
      if (numbers.length === 0) return;

      const avlSearchTree = new AvlSearchTree();
      const startTimeInsert = window.performance.now();
      numbers.forEach((element) => avlSearchTree.insert(element));
      const endTimeInsert = window.performance.now();
      const durationInsert = endTimeInsert - startTimeInsert;
      console.log(`Duration insert ${key}: ${durationInsert} ms`);

      expect(avlSearchTree.findMin()?.value).toBe(Math.min(...numbers));

      const startTimeRemove = window.performance.now();
      numbers.forEach((element) => avlSearchTree.remove(element));
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${key}: ${durationRemove} ms`);

      expect(avlSearchTree['_root']).toBeNull();
    });
  });
});

describe('AvlSearchTree - test complexity', () => {
  const sizes = [100, 1000, 10000];

  sizes.forEach((size) => {
    /**
     * Expected is that the complexity of both the insert and remove functions is O(log n).
     * This is because the AVL recursively balances the tree after each insert or remove operation.
     * Both the insert, remove and balance operations are O(log n) operations, resulting in a time complexity
     * of O(log n) for both the insert and remove functions.
     */
    it(`should create AVL search tree with ${size} elements`, () => {
      const numbers = Array.from({ length: size }, () => Math.floor(Math.random() * size));
      const avlSearchTree = new AvlSearchTree();

      const startTimeInsert = window.performance.now();
      numbers.forEach((element) => avlSearchTree.insert(element));
      const endTimeInsert = window.performance.now();
      const durationInsert = endTimeInsert - startTimeInsert;
      console.log(`Duration insert ${size}: ${durationInsert} ms`);

      const startTimeRemove = window.performance.now();
      numbers.forEach((element) => avlSearchTree.remove(element));
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${size}: ${durationRemove} ms`);

      expect(avlSearchTree['_root']).toBeNull();
    });
  });
});
