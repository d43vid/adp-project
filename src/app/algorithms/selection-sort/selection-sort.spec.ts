import { selectionSort } from './selection-sort';
import * as testData from '../../data-structures/test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('selectionSort - test data', () => {
  const data = testData as SortingTestData;

  Object.entries(data).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should sort an array for ${key}`, () => {
      const unsortedArray = [...value];
      const startTimeSort = window.performance.now();
      const sortedArray = selectionSort(unsortedArray);
      const endTimeSort = window.performance.now();
      const durationSort = endTimeSort - startTimeSort;
      console.log(`Duration sort ${key}: ${durationSort} ms`);

      expect(sortedArray).toEqual(_sortValue(value));
    });
  });
});

describe('selectionSort - test complexity', () => {
  const sizes = [100, 1000, 10000];

  sizes.forEach((size) => {
    /**
     * Expected is that the duration of the search function increases quadratically based on the size of
     * the input. This is because for each element it has to compare and possibly shift all previous elements.
     * This results in a time complexity of O(n^2).
     */
    it(`should sort an array of ${size} elements`, () => {
      const unsortedArray = Array.from({ length: size }, () => Math.floor(Math.random() * size));
      const startTimeSort = window.performance.now();
      const sortedArray = selectionSort(unsortedArray);
      const endTimeSort = window.performance.now();
      const durationSort = endTimeSort - startTimeSort;
      console.log(`Duration sort ${size}: ${durationSort} ms`);

      expect(sortedArray).toEqual(_sortValue(unsortedArray));
    });
  });
});

const _sortValue = (arr: (number | string | null)[]): (number | string | null)[] => {
  return arr.sort((a, b) => {
    if (a === null) return 1;
    if (b === null) return -1;
    if (typeof a === 'string' && typeof b === 'number') return 1;
    if (typeof a === 'number' && typeof b === 'string') return -1;
    return a < b ? -1 : a > b ? 1 : 0;
  });
};
