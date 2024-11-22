import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CodePreviewComponent } from '../../core/code-preview/code-preview.component';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { CommonModule } from '@angular/common';
import { DynamicArray } from '../../data-structures/dynamic-array/dynamic-array';

@Component({
  selector: 'adp-dynamic-array',
  standalone: true,
  imports: [CodePreviewComponent, CommonModule, HighlightPlusModule],
  templateUrl: './dynamic-array.component.html',
  styleUrl: './dynamic-array.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicArrayComponent implements OnInit {
  readonly dynamicArrayFilePath = 'assets/data-structures/dynamic-array/dynamic-array.ts';

  dynamicArray = new DynamicArray<number>();

  get arrayCapacity(): number {
    return this.dynamicArray['_capacity'];
  }

  ngOnInit(): void {
    this.dynamicArray.add(10);
    this.dynamicArray.add(20);
    this.dynamicArray.add(30);
  }

  addToArray(value: string): void {
    this.dynamicArray.add(parseInt(value));
  }

  removeLast(): void {
    this.dynamicArray.removeAt(this.dynamicArray.length - 1);
  }
}
