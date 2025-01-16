import { Deque } from './deque';
import * as testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

/**
 * Expected is that the addition of the elements to the deque is faster than the removal of the elements.
 * This is because the insert functions have a complexity of O(n) while the delete functions have a complexity of O(n^2).
 */
describe('Deque - `InsertLeft`, `InsertRight`, `DeleteLeft` & `DeleteRight`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should create deque with elements and empty again for ${key}`, () => {
      const deque = new Deque<null | number | string>();
      const startTimeInsert = window.performance.now();
      value.forEach((element, index) => {
        index % 2 === 0 ? deque.insertLeft(element) : deque.insertRight(element);
      });
      const endTimeInsert = window.performance.now();
      const durationInsert = endTimeInsert - startTimeInsert;
      console.log(`Duration insert ${key}: ${durationInsert} ms`);

      expect(deque.size).toBe(value.length);

      const startTimeDelete = window.performance.now();
      for (let i = 0; i < value.length; i++) {
        i % 2 === 0 ? deque.deleteLeft() : deque.deleteRight();
      }
      const endTimeDelete = window.performance.now();
      const durationDelete = endTimeDelete - startTimeDelete;
      console.log(`Duration delete ${key}: ${durationDelete} ms`);

      expect(deque.size).toBe(0);
    });
  });
});
