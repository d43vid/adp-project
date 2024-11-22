import { Component, Input, output } from '@angular/core';
import { DijkstraNode } from '../../../algorithms/dijkstra/dijkstra-node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'adp-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss'
})
export class NodeComponent {
  @Input({ required: true }) node!: DijkstraNode;

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
