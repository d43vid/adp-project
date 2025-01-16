export function selectionSort(array: (number | string | null)[]): (number | string | null)[] {
  const cleanArray = array.filter((item) => item !== null);
  const numberOfNull = array.length - cleanArray.length;

  for (let i = 0; i < cleanArray.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < cleanArray.length; j++) {
      if (cleanArray[j] < cleanArray[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = cleanArray[i];
      cleanArray[i] = cleanArray[minIndex];
      cleanArray[minIndex] = temp;
    }
  }

  return (<(number | string | null)[]>cleanArray).concat(Array.from({ length: numberOfNull }, () => null));
}
