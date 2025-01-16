export function quickSort(array: (number | string | null)[]): (number | string | null)[] {
  if (array.length <= 1) return array;

  const cleanArray = array.filter((item) => item !== null);
  const numberOfNull = array.length - cleanArray.length;

  const distinctMap = cleanArray.reduce((map, item) => {
    const key = item === 0 && 1 / item === -Infinity ? '-0' : String(item);
    if (map[key] === undefined) map[key] = 1;
    else map[key] += 1;

    return map;
  }, <{ [key: number | string]: number; }>{});

  const distinctValues = Object.keys(distinctMap).map((key) => isNaN(parseFloat(key)) ? key : parseFloat(key));

  const pivotIndex = _findMedianIndex(distinctValues);
  const pivot = distinctValues[pivotIndex];
  const left: (number | string | null)[] = [];
  const right: (number | string | null)[] = [];

  for (let i = 0; i < distinctValues.length; i++) {
    if (i === pivotIndex) continue;

    if (distinctValues[i] < pivot) {
      left.push(distinctValues[i]);
    } else {
      right.push(distinctValues[i]);
    }
  }

  const sortedLeft = quickSort(left);
  const sortedRight = quickSort(right);

  const reinflatedLeft = sortedLeft.flatMap((item) => Array(_getLength(item, distinctMap)).fill(item));
  const reinflatedPivot = Array(distinctMap[String(pivot)]).fill(pivot);
  const reinflatedRight = sortedRight.flatMap((item) => Array(_getLength(item, distinctMap)).fill(item));

  return reinflatedLeft.concat(reinflatedPivot, reinflatedRight, Array(numberOfNull).fill(null));
}

function _findMedianIndex(array: (number | string)[]): number {
  const evenLength = array.length % 2 === 0;
  const first = array[0];
  const middle = evenLength ? array[Math.floor(array.length / 2) - 1] : array[Math.floor(array.length / 2)];
  const last = array[array.length - 1];

  if ((first < middle && middle < last) || (first > middle && middle > last)) return evenLength ? Math.floor(array.length / 2) - 1 : Math.floor(array.length / 2);
  if ((middle < first && first < last) || (middle > first && first > last)) return 0;
  return array.length - 1;
}

function _getLength(item: number | string | null, valueMap: { [key: number | string]: number; }): number {
  const key = item === 0 && 1 / item === -Infinity ? '-0' : String(item);
  return valueMap[key];
}
