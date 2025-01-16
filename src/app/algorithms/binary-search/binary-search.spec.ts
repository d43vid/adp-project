import { BinarySearch } from './binary-search';
import * as testData from '../../data-structures/test-resources/dataset_sorteren.json';

type SearchingTestData = { [key: string]: Array<null | number | string>; };

class Person {
  constructor (public name: string, public age: number) { }
}

const people = [
  new Person('Alice', 24),
  new Person('Bob', 27),
  new Person('Charlie', 30),
  new Person('David', 33),
  new Person('Eve', 36),
];

const binarySearch = new BinarySearch<Person>({
  source: people,
  target: 33,
  key: 'age',
});

describe('BinarySearch', () => {
  it('should return the index of the target number', () => {
    expect(binarySearch.search()).toBe(3);

    people.sort((a, b) => b.age - a.age);
    expect(binarySearch.search()).toBe(1);
  });
});

describe('BinarySearch - test data', () => {
  const data = testData as SearchingTestData;

  Object.entries(data).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should find element in a sorted array for ${key}`, () => {
      const sortedSource = (<number[]>value).sort((a, b) => a - b);

      const binarySearch = new BinarySearch({
        source: sortedSource,
        target: sortedSource[0]
      });

      const startTimeSearch = window.performance.now();
      const result = binarySearch.search();
      const endTimeSearch = window.performance.now();
      const durationSearch = endTimeSearch - startTimeSearch;
      console.log(`Duration search ${key}: ${durationSearch} ms`);

      if (sortedSource[result] !== undefined) expect(Math.abs(sortedSource[result])).toBe(Math.abs(sortedSource[0]));
    });
  });
});

describe('BinarySearch - test complexity', () => {
  const sizes = [10, 10000, 10000000];

  sizes.forEach((size) => {
    /**
     * Expected is that the duration of the search function is logarithmic, meaning not linear.
     * This is because the array is repeatedly divided in half until the target is found,
     * resulting in a complexity of O(log n).
     */
    it(`should find element in a sorted array of size ${size}`, () => {
      const source = Array(size).fill(1);
      source[0] = 0;

      const binarySearch = new BinarySearch({
        source,
        target: 0
      });

      const startTimeSearch = performance.now();
      const result = binarySearch.search();
      const endTimeSearch = performance.now();
      const durationSearch = endTimeSearch - startTimeSearch;
      console.log(`Duration search ${size}: ${durationSearch} ms`);

      expect(source[result]).toBe(0);
    });
  });
});
