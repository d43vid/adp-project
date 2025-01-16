type AvlNode = {
  value: number;
  left: AvlNode | null;
  right: AvlNode | null;
  height: number;
};

export class AvlSearchTree {
  private _root: AvlNode | null = null;

  find(value: number): AvlNode | null {
    return this._findNode(this._root, value);
  }

  findMin(): AvlNode | null {
    if (!this._root) return null;
    return this._findMinNode(this._root);
  }

  findMax(): AvlNode | null {
    if (!this._root) return null;
    return this._findMaxNode(this._root);
  }

  insert(value: number): void {
    this._root = this._insertNode(this._root, value);
  }

  remove(value: number): void {
    this._root = this._removeNode(this._root, value);
  }

  private _height(node: AvlNode | null): number {
    return node ? node.height : -1;
  }

  private _updateHeight(node: AvlNode): void {
    node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
  }

  private _rotateRight(y: AvlNode): AvlNode {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    this._updateHeight(y);
    this._updateHeight(x);
    return x;
  }

  private _rotateLeft(x: AvlNode): AvlNode {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    this._updateHeight(x);
    this._updateHeight(y);
    return y;
  }

  private _balance(node: AvlNode): AvlNode {
    if (this._height(node.left) - this._height(node.right) > 1) {
      if (this._height(node.left!.left) >= this._height(node.left!.right)) {
        node = this._rotateRight(node);
      } else {
        node.left = this._rotateLeft(node.left!);
        node = this._rotateRight(node);
      }
    } else if (this._height(node.right) - this._height(node.left) > 1) {
      if (this._height(node.right!.right) >= this._height(node.right!.left)) {
        node = this._rotateLeft(node);
      } else {
        node.right = this._rotateRight(node.right!);
        node = this._rotateLeft(node);
      }
    }
    this._updateHeight(node);
    return node;
  }

  private _insertNode(node: AvlNode | null, value: number): AvlNode {
    if (!node) {
      return { value, left: null, right: null, height: 0 };
    }
    if (value < node.value) {
      node.left = this._insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertNode(node.right, value);
    } else {
      return node;
    }
    return this._balance(node);
  }

  private _findMinNode(node: AvlNode): AvlNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  private _findMaxNode(node: AvlNode): AvlNode {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  private _findNode(node: AvlNode | null, value: number): AvlNode | null {
    if (!node) return null;
    if (value < node.value) {
      return this._findNode(node.left, value);
    } else if (value > node.value) {
      return this._findNode(node.right, value);
    } else {
      return node;
    }
  }

  private _removeNode(node: AvlNode | null, value: number): AvlNode | null {
    if (!node) return null;
    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const minRight = this._findMinNode(node.right);
      node.value = minRight.value;
      node.right = this._removeNode(node.right, minRight.value);
    }
    return this._balance(node);
  }
}
