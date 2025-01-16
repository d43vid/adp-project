type HashEntry<T> = { key: string, value: T; };

export class HashTable<T> {
  private _table: { [hash: string]: HashEntry<T>[]; } = {};

  insert(key: string, value: T): void {
    const hash = this._hash(key);
    if (!this._table[hash]) {
      this._table[hash] = [];
    }

    this._table[hash].push({ key, value });
  }

  get(key: string): T | undefined {
    const hash = this._hash(key);
    if (!this._table[hash]) return undefined;

    return this._table[hash].find((entry) => entry.key === key)?.value;
  }

  delete(key: string): void {
    const hash = this._hash(key);
    if (!this._table[hash]) return;

    this._table[hash] = this._table[hash].filter((entry) => entry.key !== key);
  }

  update(key: string, value: T): void {
    const hash = this._hash(key);
    if (!this._table[hash]) return this.insert(key, value);

    const entries = this._table[hash];
    const index = entries.findIndex((entry) => entry.key === key);
    if (index === -1) return this.insert(key, value);

    entries[index].value = value;
  }

  private _hash(key: string): string {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }

    return (hash >>> 0).toString(36).padStart(7, '0');
  }
}
