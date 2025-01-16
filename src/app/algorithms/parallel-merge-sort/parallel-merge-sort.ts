type ArrayValue = null | number | string;

export function parallelMergeSort(array: ArrayValue[]): ArrayValue[] {
  if (array.length <= 1) return array;

  const cleanArray = array.filter((item) => item !== null);
  const numberOfNull = array.length - cleanArray.length;

  const middle = Math.floor(cleanArray.length / 2);
  const left = cleanArray.slice(0, middle);
  const right = cleanArray.slice(middle);

  return merge(parallelMergeSort(left), parallelMergeSort(right)).concat(Array(numberOfNull).fill(null));
}

function merge(left: ArrayValue[], right: ArrayValue[]): ArrayValue[] {
  let result: ArrayValue[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex]! <= right[rightIndex]!) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
