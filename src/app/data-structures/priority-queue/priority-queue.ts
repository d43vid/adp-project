class PriorityQueueElement<T> {
  constructor (public value: T, public priority: number) { }
}

export class PriorityQueue<T> {
  private _queue: PriorityQueueElement<T>[] = [];

  add(element: T, priority: number): void {
    this._queue.push(new PriorityQueueElement(element, priority));
    this._queue.sort((a, b) => b.priority - a.priority);
  }

  peek(): T | undefined {
    if (!this._queue.length) return;

    return this._queue[0].value;
  }

  poll(): T | undefined {
    if (!this._queue.length) return;

    const element = this._queue[0].value;
    this._queue = this._queue.slice(1);
    return element;
  }
}
