type NumberKey<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

type BinarySearchPrimitiveConfig = {
  source: number[];
  target: number;
};

type BinarySearchObjectConfig<T extends Object> = {
  source: T[];
  target: number;
  key: NumberKey<T>;
};

type BinarySearchConfig<T extends Object> = BinarySearchPrimitiveConfig | BinarySearchObjectConfig<T>;

export class BinarySearch<T extends Object> {
  constructor (private readonly _cfg: BinarySearchConfig<T>) { }

  search(): number {
    return 'key' in this._cfg ? this._searchObject() : this._searchPrimitive();
  }

  private _searchPrimitive(): number {
    const { source, target } = <BinarySearchPrimitiveConfig>this._cfg;
    const ascending = source[0] < source[source.length - 1];
    let guess = Math.ceil(source.length / 2);

    if (source[guess] === target) return guess;

    let left = 0, right = source.length - 1;
    while (left <= right) {
      if (source[guess] < target) ascending ? left = guess + 1 : right = guess - 1;
      else ascending ? right = guess - 1 : left = guess + 1;

      guess = Math.ceil((left + right) / 2);
      if (source[guess] === target) return guess;
    }

    return -1;
  }

  private _searchObject(): number {
    const { source, target, key } = <BinarySearchObjectConfig<T>>this._cfg;
    const first = source[0][key], last = source[source.length - 1][key];
    if (!first || !last) throw new Error('Invalid key');

    const ascending = first < last;
    let guess = Math.ceil(source.length / 2);

    if (source[guess][key] === target) return guess;

    let left = 0, right = source.length - 1;
    while (left <= right) {
      const found = source[guess][key];
      if (!found || typeof found !== 'number') throw new Error('Invalid key');

      if (found < target) ascending ? left = guess + 1 : right = guess - 1;
      else ascending ? right = guess - 1 : left = guess + 1;

      guess = Math.ceil((left + right) / 2);
      if (source[guess][key] === target) return guess;
    }

    return -1;
  }
}
