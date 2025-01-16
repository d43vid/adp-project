import { quickSort } from './quick-sort';
import * as testData from '../../data-structures/test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('quickSort - test data', () => {
  const data = testData as SortingTestData;

  Object.entries(data).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should sort an array for ${key}`, () => {
      const unsortedArray = [...value];
      const startTimeSort = window.performance.now();
      const sortedArray = quickSort(unsortedArray);
      const endTimeSort = window.performance.now();
      const durationSort = endTimeSort - startTimeSort;
      console.log(`Duration sort ${key}: ${durationSort} ms`);

      expect(sortedArray).toEqual(_sortValue(value));
    });
  });
});

const _sortValue = (arr: (number | string | null)[]): (number | string | null)[] => {
  return arr.sort((a, b) => {
    if (a === null) return 1;
    if (b === null) return -1;
    if (typeof a === 'string' && typeof b === 'number') return -1;
    if (typeof a === 'number' && typeof b === 'string') return 1;
    if (typeof a === 'number' && a === 0 && 1 / a === -Infinity) return -1;
    if (typeof b === 'number' && b === 0 && 1 / b === -Infinity) return 1;
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

describe('quickSort - test complexity', () => {
  const sizes = [100, 1000, 10000];

  sizes.forEach((size) => {
    /**
     * Expected is that the duration of the search function increases logarithmically based on the size of
     * the input. This is because the input is divided in half each time the function is called. This results
     * in a time complexity of O(n log n).
     */
    it(`should sort an array of ${size} elements`, () => {
      const unsortedArray = Array.from({ length: size }, () => Math.floor(Math.random() * size));
      const startTimeSort = window.performance.now();
      const sortedArray = quickSort(unsortedArray);
      const endTimeSort = window.performance.now();
      const durationSort = endTimeSort - startTimeSort;
      console.log(`Duration sort ${size}: ${durationSort} ms`);

      expect(sortedArray).toEqual(_sortValue(unsortedArray));
    });
  });
});
