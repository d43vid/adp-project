import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { HighlightModule } from 'ngx-highlightjs';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'adp-code-preview',
  standalone: true,
  imports: [CommonModule, HighlightModule, IconComponent],
  templateUrl: './code-preview.component.html',
  styleUrl: './code-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewComponent {
  @Input({ required: true }) code!: string;

  copied = signal(false);

  constructor (private _clipboard: Clipboard) { }

  copyCode(): void {
    this._clipboard.copy(this.code);
    this.copied.set(true);

    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
