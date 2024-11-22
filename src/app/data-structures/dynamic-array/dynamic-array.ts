type Comparator<T> = (a: T, b: T) => boolean;

export class DynamicArray<T> {
  private _array: T[] = [];
  private _capacity: number;
  private _size = 0;

  constructor (capacity: number = 4) {
    this._capacity = capacity;
    this._array = new Array(capacity);
  }

  get length(): number {
    return this._size;
  }

  add(element: T): void {
    if (this._size === this._capacity) {
      this._resize();
    }

    this._array[this._size] = element;
    this._size++;
  }

  get(index: number): T {
    if (index < 0 || index >= this._size) throw new RangeError('Index out of bounds');

    return this._array[index];
  }

  set(index: number, element: T): void {
    if (index < 0 || (index > 0 && index >= this._size)) throw new RangeError('Index out of bounds');

    this._array = [...this._array.slice(0, index), element, ...this._array.slice(index)];
    this._size++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) throw new RangeError('Index out of bounds');

    const removedElement = this._array[index];
    this._array = [...this._array.slice(0, index), ...this._array.slice(index + 1)];
    this._size--;
    return removedElement;
  }

  removeByElement(element: T, comparator?: Comparator<T>): T | undefined {
    const index = this.indexOf(element, comparator);
    if (index === -1) return;

    return this.removeAt(index);
  }

  indexOf(element: T, comparator?: Comparator<T>): number {
    if (!comparator) {
      return this._array.indexOf(element);
    }

    return this._array.findIndex((el) => comparator(el, element));
  }

  private _resize(): void {
    this._capacity *= 2;
    const newArray = new Array(this._capacity);

    for (let i = 0; i < this._size; i++) {
      newArray[i] = this._array[i];
    }

    this._array = newArray;
  }
}
