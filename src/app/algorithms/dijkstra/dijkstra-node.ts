const MAX_INT = 2147483647;

export class Coordinates {
  private _x: number;
  private _y: number;

  get x(): number { return this._x; }
  get y(): number { return this._y; }

  constructor (x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  equals(toMatch: Coordinates): boolean {
    return this._x === toMatch.x && this._y === toMatch.y;
  }
}

export class DijkstraNode {
  private _distance = MAX_INT;
  private _previous: DijkstraNode | undefined = undefined;

  private _isStartPoint = false;
  private _isEndPoint = false;
  private _obstructed = false;
  private _visited = false;
  private _inPath = false;

  private readonly _coordinates: Coordinates;

  get distance(): number { return this._distance; }
  set distance(distance: number) { this._distance = distance; }

  get previous(): DijkstraNode | undefined { return this._previous; }
  set previous(previous: DijkstraNode | undefined) { this._previous = previous; }

  get isStartPoint(): boolean { return this._isStartPoint; }
  set isStartPoint(isStartPoint: boolean) { this._isStartPoint = isStartPoint; }

  get isEndPoint(): boolean { return this._isEndPoint; }
  set isEndPoint(isEndPoint: boolean) { this._isEndPoint = isEndPoint; }

  get obstructed(): boolean { return this._obstructed; }
  set obstructed(obstructed: boolean) { this._obstructed = obstructed; }

  get visited(): boolean { return this._visited; }
  set visited(visited: boolean) { this._visited = visited; }

  get inPath(): boolean { return this._inPath; }
  set inPath(inPath: boolean) { this._inPath = inPath; }

  get coordinate(): Coordinates { return this._coordinates; }

  constructor (coordinate: Coordinates) {
    this._coordinates = coordinate;
  }

  getNeighbourCoordinates(): Coordinates[] {
    return [
      new Coordinates(this._coordinates.x - 1, this._coordinates.y),
      new Coordinates(this._coordinates.x + 1, this._coordinates.y),
      new Coordinates(this._coordinates.x, this._coordinates.y - 1),
      new Coordinates(this._coordinates.x, this._coordinates.y + 1)
    ];
  }

  reset(): void {
    this._distance = MAX_INT;
    this._previous = undefined;
    this._visited = false;
    this._inPath = false;
  }
}
