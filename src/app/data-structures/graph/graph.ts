export class Graph {
  private _edges: [number, number][] = [];
  private _adjacencyList: number[][] = [];

  addEdge(from: number, to: number) {
    this._edges.push([from, to]);
    this._adjacencyList[from] = this._adjacencyList[from] || [];
    this._adjacencyList[from].push(to);
  }

  removeEdge(from: number, to: number) {
    this._edges = this._edges.filter(([f, t]) => f !== from || t !== to);
    this._adjacencyList[from] = this._adjacencyList[from].filter((t) => t !== to);
  }

  addVertex(connections: number[] = []) {
    this._adjacencyList.push(connections);
  }

  removeVertex(vertex: number) {
    this._adjacencyList = this._adjacencyList.filter((_, i) => i !== vertex);
    this._edges = this._edges.filter(([f, t]) => f !== vertex && t !== vertex);
    this._adjacencyList.forEach((connections, i) => {
      this._adjacencyList[i] = connections.filter((v) => v !== vertex);
    });
    this._adjacencyList = this._adjacencyList.filter((connections) => connections.length > 0);
  }

  verticesLength(): number {
    return this._adjacencyList.length;
  }

  edgesLength(): number {
    return this._edges.length;
  }
}
