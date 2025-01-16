export class Deque<T> {
  private _deque: T[] = [];
  private _size = 0;

  get size(): number {
    return this._size;
  }

  insertLeft(element: T): void {
    this._deque.unshift(element);
    this._size++;
  }

  insertRight(element: T): void {
    this._deque.push(element);
    this._size++;
  }

  deleteLeft(): T | undefined {
    if (this._size === 0) return;

    const removedElement = this._deque[0];
    this._deque = this._deque.slice(1);
    this._size--;
    return removedElement;
  }

  deleteRight(): T | undefined {
    if (this._size === 0) return;

    const removedElement = this._deque[this._size - 1];
    this._deque = this._deque.slice(0, this._size - 1);
    this._size--;
    return removedElement;
  }
}
