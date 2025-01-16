import { PriorityQueue } from './priority-queue';
import testData from '../test-resources/dataset_sorteren.json';

type SortingTestData = { [key: string]: Array<null | number | string>; };

describe('PriorityQueue - `Add`, `Peek` & `Poll`', () => {
  const sortingTestData = testData as SortingTestData;

  Object.entries(sortingTestData).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that the addition of the elements to the priority queue is slower than the removal of the elements. This is because the add function has a complexity of O(n^2 log n) while the poll function has a complexity of O(n^2). For adding element in a loop, the initial loop is O(n) plus the sorting of the queue which is O(n log n). Adding this up results in O(n^2 log n). For polling elements in a loop, the initial loop is O(n) plus the removal of the element from the queue which is O(n). Adding this up results in O(n^2).
     */
    it(`should create priority queue with elements and empty again for ${key}`, () => {
      const priorityQueue = new PriorityQueue<null | number | string>();
      const startTimeAdd = window.performance.now();
      value.forEach((element, index) => priorityQueue.add(element, index));
      const endTimeAdd = window.performance.now();
      const durationAdd = endTimeAdd - startTimeAdd;
      console.log(`Duration add ${key}: ${durationAdd} ms`);

      expect(priorityQueue.peek()).toBe(value[value.length - 1]);

      const startTimePoll = window.performance.now();
      while (priorityQueue.peek() !== undefined) {
        priorityQueue.poll();
      }
      const endTimePoll = window.performance.now();
      const durationPoll = endTimePoll - startTimePoll;
      console.log(`Duration poll ${key}: ${durationPoll} ms`);

      expect(priorityQueue['_queue'].length).toBe(0);
      expect(priorityQueue.peek()).toBeUndefined();
    });
  });
});
