export class Stack<T> {
  private _stack: T[] = [];
  private _size = 0;

  get size(): number {
    return this._size;
  }

  push(element: T): void {
    this._stack.push(element);
    this._size++;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return;

    const removedElement = this._stack[this._size - 1];
    this._stack = this._stack.slice(0, this._size - 1);
    this._size--;
    return removedElement;
  }

  top(): T | undefined {
    if (this.isEmpty()) return;

    return this._stack[this._size - 1];
  }

  isEmpty(): boolean {
    return this._size === 0;
  }
}
