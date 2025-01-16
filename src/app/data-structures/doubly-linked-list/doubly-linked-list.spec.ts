import { DoublyLinkedList } from './doubly-linked-list';
import * as testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('DoublyLinkedList - `Add` & `RemoveAt`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that the addition of the elements to the doubly linked list is faster than the removal of the elements.
     * This is because the add function has a complexity of O(n) while the removeAt function has a complexity of O(n^2).
     */
    it(`should create doubly linked list with elements and empty again for ${key}`, () => {
      const doublyLinkedList = new DoublyLinkedList<null | number | string>();
      const startTimeAdd = window.performance.now();
      value.forEach((element) => doublyLinkedList.add(element));
      const endTimeAdd = window.performance.now();
      const durationAdd = endTimeAdd - startTimeAdd;
      console.log(`Duration add ${key}: ${durationAdd} ms`);

      expect(doublyLinkedList.size).toBe(value.length);

      const startTimeRemove = window.performance.now();
      while (doublyLinkedList.size) {
        doublyLinkedList.removeAt(0);
      }
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${key}: ${durationRemove} ms`);

      expect(doublyLinkedList.size).toBe(0);
    });
  });
});

describe('DoublyLinkedList - `Set` & `RemoveByElement`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that setting the elements in the doubly linked list is faster than removing the elements.
     * This is because both the set has a complexity of O(n^2) and removeByElement has a complexity of O(n^3).
     */
    it(`should create doubly linked list and set and remove elements for ${key}`, () => {
      const doublyLinkedList = new DoublyLinkedList<null | number | string>();
      const startTimeSet = window.performance.now();
      value.forEach((element) => doublyLinkedList.set(0, element));
      const endTimeSet = window.performance.now();
      const durationSet = endTimeSet - startTimeSet;
      console.log(`Duration set ${key}: ${durationSet} ms`);

      expect(doublyLinkedList.size).toBe(value.length);

      const startTimeRemove = window.performance.now();
      while (doublyLinkedList.size) {
        const elementToRemove = doublyLinkedList.get(0);
        if (elementToRemove !== undefined) doublyLinkedList.removeByElement(elementToRemove);
      }
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${key}: ${durationRemove} ms`);

      expect(doublyLinkedList.size).toBe(0);
    });
  });
});
