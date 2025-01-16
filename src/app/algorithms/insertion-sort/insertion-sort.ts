export function insertionSort(array: (number | string | null)[]): (number | string | null)[] {
  const cleanArray = array.filter((item) => item !== null);
  const numberOfNull = array.length - cleanArray.length;

  for (let i = 1; i < cleanArray.length; i++) {
    const key = cleanArray[i];
    let j = i - 1;

    while (j >= 0 && cleanArray[j] > key) {
      cleanArray[j + 1] = cleanArray[j];
      j--;
    }
    cleanArray[j + 1] = key;
  }

  return (<(number | string | null)[]>cleanArray).concat(Array.from({ length: numberOfNull }, () => null));
}
