type Comparator<T> = (curr: T, index: number, prev: T | undefined, next: T | undefined) => boolean;

export class DoublyLinkedListNode<T> {
  public value: T;
  public next: DoublyLinkedListNode<T> | undefined;
  public previous: DoublyLinkedListNode<T> | undefined;

  constructor (value: T, next?: DoublyLinkedListNode<T>, previous?: DoublyLinkedListNode<T>) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

export class DoublyLinkedList<T> {
  private _head: DoublyLinkedListNode<T> | undefined;
  private _tail: DoublyLinkedListNode<T> | undefined;
  private _size = 0;

  get size(): number {
    return this._size;
  }

  add(value: T): void {
    const newNode = new DoublyLinkedListNode(value);

    if (this._size === 0) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      if (!this._tail) return;

      this._tail.next = newNode;
      newNode.previous = this._tail;
      this._tail = newNode;
    }

    this._size++;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) throw new RangeError('Index out of bounds');

    let found: DoublyLinkedListNode<T> | undefined = undefined;

    if (index < this._size / 2) {
      found = this._head;
      for (let i = 0; i < index; i++) {
        if (found) {
          found = found.next;
        }
      }
    } else {
      found = this._tail;
      for (let i = this._size - 1; i > index; i--) {
        if (found) {
          found = found.previous;
        }
      }
    }

    return found?.value;
  }

  set(index: number, value: T): void {
    if (index < 0 || (index > 0 && index >= this._size)) throw new RangeError('Index out of bounds');

    if (index === 0 && !this._head && !this._tail) {
      this.add(value);
      return;
    }

    let found: DoublyLinkedListNode<T> | undefined = undefined;

    if (index < this._size / 2) {
      found = this._head;
      for (let i = 0; i < index; i++) {
        if (found) {
          found = found.next;
        }
      }
    } else {
      found = this._tail;
      for (let i = this._size - 1; i > index; i--) {
        if (found) {
          found = found.previous;
        }
      }
    }

    if (found) {
      const node = new DoublyLinkedListNode(value, found, found.previous);
      if (found.previous) found.previous.next = node;
      found.previous = node;
    }

    this._size++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) throw new RangeError('Index out of bounds');

    let found: DoublyLinkedListNode<T> | undefined = undefined;

    if (index < this._size / 2) {
      found = this._head;
      for (let i = 0; i < index; i++) {
        if (found) {
          found = found.next;
        }
      }
    } else {
      found = this._tail;
      for (let i = this._size - 1; i > index; i--) {
        if (found) {
          found = found.previous;
        }
      }
    }

    if (found) {
      if (found.previous) found.previous.next = found.next;
      if (found.next) found.next.previous = found.previous;
      this._size--;
    }

    return found?.value;
  }

  removeByElement(element: T, comparator?: Comparator<T>): T | undefined {
    const index = this.indexOf(element, comparator);
    if (index === -1) return;

    return this.removeAt(index);
  }

  indexOf(element: T, comparator?: Comparator<T>): number {
    let found: DoublyLinkedListNode<T> | undefined = this._head;
    let index = 0;

    while (found) {
      if (comparator) {
        if (comparator(found.value, index, found.previous?.value, found.next?.value)) return index;
      } else {
        if (found.value === element) return index;
      }

      found = found.next;
      index++;
    }

    return -1;
  }
}
