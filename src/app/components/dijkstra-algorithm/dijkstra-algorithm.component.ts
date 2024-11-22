import { Component, OnInit } from '@angular/core';
import { CodePreviewComponent } from '../../core/code-preview/code-preview.component';
import { CommonModule } from '@angular/common';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { NodeComponent } from './node/node.component';
import { Coordinates, DijkstraNode } from '../../algorithms/dijkstra/dijkstra-node';
import { DijkstraAlgorithm } from '../../algorithms/dijkstra/dijkstra-algorithm';

type LegendEntry = {
  color: string;
  description: string;
};

@Component({
  selector: 'adp-dijkstra-algorithm',
  standalone: true,
  imports: [CodePreviewComponent, CommonModule, HighlightPlusModule, NodeComponent],
  templateUrl: './dijkstra-algorithm.component.html',
  styleUrl: './dijkstra-algorithm.component.scss'
})
export class DijkstraAlgorithmComponent implements OnInit {
  readonly dijkstraNodeFilePath = 'assets/algorithms/dijkstra/dijkstra-node.ts';
  readonly dijkstraAlgorithmFilePath = 'assets/algorithms/dijkstra/dijkstra-algorithm.ts';

  readonly rows = 5;
  readonly cols = 10;

  nodes: Array<DijkstraNode[]> = [];

  legendEntries: LegendEntry[] = [
    { color: '#bf1363', description: 'Wall' },
    { color: 'green', description: 'Start point' },
    { color: 'yellow', description: 'End point' },
    { color: '#00bedabf', description: 'Node checked by algorithm' },
    { color: '#005180', description: 'Node in path' }
  ];

  private _dijkstraAlgorithm!: DijkstraAlgorithm;

  ngOnInit(): void {
    this._setNodes();

    this._dijkstraAlgorithm = new DijkstraAlgorithm(this.nodes.flatMap((row) => row));
  }

  assignState(event: MouseEvent, row: number, column: number): void {
    if (event.shiftKey) this._setStartPoint(row, column);
    else if (event.ctrlKey) this._setEndpoint(row, column);
    else this._setObstructed(row, column);
  }

  runDijkstra(): void {
    const startNode = this.nodes.flatMap((row) => row).find((node) => node.isStartPoint);
    const endNode = this.nodes.flatMap((row) => row).find((node) => node.isEndPoint);
    if (!startNode || !endNode) return;

    const path = this._dijkstraAlgorithm.calculatePath(startNode, endNode);

    for (const node of path) {
      node.inPath = true;
    }
  }

  reset(): void {
    this.nodes.flat().forEach((node) => node.reset());
  }

  private _setNodes(): void {
    for (let r = 0; r < this.rows; r++) {
      const cols: Array<DijkstraNode> = [];
      for (let c = 0; c < this.cols; c++) {
        cols.push(new DijkstraNode(new Coordinates(r, c)));
      }
      this.nodes.push(cols);
    }
  }

  private _setStartPoint(row: number, column: number): void {
    const existingStartPoint = this.nodes.flat().find((node) => node.isStartPoint);
    if (existingStartPoint) {
      existingStartPoint.isStartPoint = false;
      if (existingStartPoint.coordinate.equals(new Coordinates(row, column))) return;

      this.nodes[row][column].isStartPoint = true;
    }
    else this.nodes[row][column].isStartPoint = !this.nodes[row][column].isStartPoint;
  }

  private _setEndpoint(row: number, column: number): void {
    const existingEndPoint = this.nodes.flat().find((node) => node.isEndPoint);
    if (existingEndPoint) {
      existingEndPoint.isEndPoint = false;
      if (existingEndPoint.coordinate.equals(new Coordinates(row, column))) return;

      this.nodes[row][column].isEndPoint = true;
    }
    else this.nodes[row][column].isEndPoint = !this.nodes[row][column].isEndPoint;
  }

  private _setObstructed(row: number, column: number): void {
    const clickedNode = this.nodes[row][column];
    if (clickedNode.isStartPoint || clickedNode.isEndPoint) return;

    this.nodes[row][column].obstructed = !this.nodes[row][column].obstructed;
  }
}
