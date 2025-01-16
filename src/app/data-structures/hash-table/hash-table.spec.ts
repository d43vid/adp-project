import { HashTable } from './hash-table';
import testData from '../test-resources/dataset_hashing.json';

type HashingTestData = { hashtabelsleutelswaardes: { [key: string]: number[]; }; };

describe('HashTable - `Insert`, `Get` & `Delete`', () => {
  const hashingTestData = testData as HashingTestData;

  Object.entries(hashingTestData.hashtabelsleutelswaardes).forEach(([key, value]) => {
    if (Object.prototype.toString.call(value) !== '[object Array]') return;

    /**
     * Expected is that the insertion of the element in the hash table is faster than the deletion of elements.
     * This is because the insertion of the element in the hash table has a complexity of O(1) while the
     * deletion of the element has a complexity of O(n), since removing the element is done with a filter
     * function on the array, which is a loop. Getting and updating an element also has a complexity of O(n)
     * since it is done with a find or findIndex function on the array, which is a loop.
     */
    it(`should insert elements in the hash table and delete them again for ${key}`, () => {
      const hashTable = new HashTable<null | number | string>();
      const startTimeInsert = window.performance.now();
      value.forEach((element) => {
        const key = _getKey(element);
        hashTable.insert(key, element);
      });
      const endTimeInsert = window.performance.now();
      const durationInsert = endTimeInsert - startTimeInsert;
      console.log(`Duration insert ${key}: ${durationInsert} ms`);

      value.forEach((element) => {
        const key = _getKey(element);
        expect(hashTable.get(key)).toBe(element);
      });

      const startTimeDelete = window.performance.now();
      value.forEach((element) => {
        const key = _getKey(element);
        hashTable.delete(key);
        expect(hashTable.get(key)).toBeUndefined();
      });
      const endTimeDelete = window.performance.now();
      const durationDelete = endTimeDelete - startTimeDelete;
      console.log(`Duration delete ${key}: ${durationDelete} ms`);
    });
  });
});

function _getKey(element: number | string | null): string {
  return element === 0 && 1 / element === -Infinity ? '-0' : String(element);
}
