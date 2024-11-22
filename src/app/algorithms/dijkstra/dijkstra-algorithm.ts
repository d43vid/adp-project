import { DijkstraNode } from './dijkstra-node';

export class DijkstraAlgorithm {
  private readonly _nodes: DijkstraNode[];

  constructor (nodes: DijkstraNode[]) {
    this._nodes = nodes;
  }

  calculatePath(startNode: DijkstraNode, endNode: DijkstraNode): DijkstraNode[] {
    const unvisitedNodes = [...this._nodes];
    let visitedNodes: DijkstraNode[] = [];
    this._setPathBoundaries(unvisitedNodes, startNode, endNode);

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);

      const currentNode = unvisitedNodes.shift();
      if (!currentNode) break;

      currentNode.visited = true;
      visitedNodes = [...visitedNodes, currentNode];

      if (currentNode.coordinate.equals(endNode.coordinate)) break;

      this._updateNeighbours(currentNode, this._nodes);
    }

    return this._getPath(visitedNodes);
  }

  private _setPathBoundaries(unvisitedNodes: DijkstraNode[], startNode: DijkstraNode, endNode: DijkstraNode): void {
    const start = unvisitedNodes.find((node) => node.coordinate.equals(startNode.coordinate));
    const end = unvisitedNodes.find((node) => node.coordinate.equals(endNode.coordinate));

    if (!start || !end) return;

    start.distance = 0;
    start.isStartPoint = true;
    end.isEndPoint = true;
  }

  private _updateNeighbours(currentNode: DijkstraNode, nodes: DijkstraNode[]): void {
    const neighbours = this._getNeighbours(currentNode, nodes);

    for (const neighbour of neighbours) {
      neighbour.distance = currentNode.distance + 1;
      neighbour.previous = currentNode;
    }
  }

  private _getNeighbours(currentNode: DijkstraNode, nodes: DijkstraNode[]): DijkstraNode[] {
    const neighbourCoordinates = currentNode.getNeighbourCoordinates();
    const neighbours = neighbourCoordinates.map((coordinate) => nodes.find((node) => node.coordinate.equals(coordinate)));

    return neighbours.filter((node): node is DijkstraNode => !!node && !node.obstructed && !node.visited);
  }

  private _getPath(visitedNodes: DijkstraNode[]): DijkstraNode[] {
    let path: DijkstraNode[] = [];
    let last = visitedNodes.pop();

    while (last) {
      path = [last, ...path];
      last = last.previous;
    }

    return path;
  }
}
