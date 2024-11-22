import { DynamicArray } from './dynamic-array';

import * as testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('DynamicArray - `Add` & `RemoveAt`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that the addition of the elements to the array is faster than the removal of the elements.
     * This is because the add function has a complexity of O(n) while the removeAt function has a complexity of O(n^3).
     */
    it(`should create dynamic array with elements and empty again for ${key}`, () => {
      const dynamicArray = new DynamicArray<null | number | string>();
      const startTimeAdd = window.performance.now();
      value.forEach((element) => dynamicArray.add(element));
      const endTimeAdd = window.performance.now();
      const durationAdd = endTimeAdd - startTimeAdd;
      console.log(`Duration add ${key}: ${durationAdd} ms`);

      expect(dynamicArray.length).toBe(value.length);

      const startTimeRemove = window.performance.now();
      while (dynamicArray.length) {
        dynamicArray.removeAt(0);
      }
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${key}: ${durationRemove} ms`);

      expect(dynamicArray.length).toBe(0);
    });
  });
});

describe('DynamicArray - `Set` & `RemoveByElement`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that setting the elements in the array takes around the same amount of time as removing the elements.
     * This is because both the set and removeByElement functions have a complexity of O(n^3).
     */
    it(`should create dynamic array and set and remove elements for ${key}`, () => {
      const dynamicArray = new DynamicArray<null | number | string>();
      const startTimeSet = window.performance.now();
      value.forEach((element) => dynamicArray.set(0, element));
      const endTimeSet = window.performance.now();
      const durationSet = endTimeSet - startTimeSet;
      console.log(`Duration set ${key}: ${durationSet} ms`);

      expect(dynamicArray.length).toBe(value.length);

      const startTimeRemove = window.performance.now();
      while (dynamicArray.length) {
        dynamicArray.removeByElement(dynamicArray.get(0));
      }
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove ${key}: ${durationRemove} ms`);

      expect(dynamicArray.length).toBe(0);
    });
  });
});
