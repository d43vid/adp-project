import { Stack } from './stack';
import * as testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('Stack - `Push` & `Pop`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that the addition of the elements to the stack is faster than the removal of the elements.
     * This is because the push function has a complexity of O(n) while the pop function has a complexity of O(n^2).
     */
    it(`should create stack with elements and empty again for ${key}`, () => {
      const stack = new Stack<null | number | string>();
      const startTimePush = window.performance.now();
      value.forEach((element) => stack.push(element));
      const endTimePush = window.performance.now();
      const durationPush = endTimePush - startTimePush;
      console.log(`Duration push ${key}: ${durationPush} ms`);

      expect(stack.size).toBe(value.length);

      const startTimePop = window.performance.now();
      while (stack.size) {
        stack.pop();
      }
      const endTimePop = window.performance.now();
      const durationPop = endTimePop - startTimePop;
      console.log(`Duration pop ${key}: ${durationPop} ms`);

      expect(stack.isEmpty()).toBeTruthy();
    });
  });
});

describe('Stack - `Top`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    it(`should create stack with elements and return the top element for ${key}`, () => {
      const stack = new Stack<null | number | string>();
      value.forEach((element) => stack.push(element));

      expect(stack.top()).toBe(value[value.length - 1]);
    });
  });
});
