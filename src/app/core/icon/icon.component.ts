import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'adp-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @ViewChild(forwardRef(() => 'svg'), { read: ElementRef }) svg?: ElementRef<SVGGraphicsElement>;
  @ViewChild(forwardRef(() => 'icon'), { read: ElementRef }) iconSVG?: ElementRef<SVGGraphicsElement>;

  @Input({ required: true }) set icon(name: string) {
    this.href = `../../../assets/icons/${name}.svg#${name}`;
  }

  protected href!: string;

  constructor () {
    window.addEventListener('load', this._resizeSVGToContents);
    window.addEventListener('resize', this._resizeSVGToContents);
  }

  ngAfterViewInit(): void {
    this._resizeSVGToContents();
  }

  private _resizeSVGToContents = (): void => {
    if (this.svg && this.iconSVG) {
      const boundingBox = this.iconSVG.nativeElement.getBBox();
      const svg = this.svg.nativeElement;

      svg.style.width = `${Math.max(24, boundingBox.width)}px`;
      svg.style.height = `${Math.max(24, boundingBox.height)}px`;
    }
  };
}
