/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { booleanAttribute, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NzToCssUnitPipe } from 'ng-zorro-antd/pipes';

import { NzCollapsable, NzLayout } from './typings';

@Directive({
  selector: 'ng-template[nz-splitter-panel]',
  exportAs: 'nzSplitterPanel',
  standalone: true,
  providers: [NzToCssUnitPipe]
})
export class NzSplitterPanelDirective implements OnChanges {
  @Input() nzDefaultSize?: number | string = undefined;
  @Input() nzMin?: number | string = undefined;
  @Input() nzMax?: number | string = undefined;
  @Input() nzSize?: number | string = undefined;
  @Input({ transform: booleanAttribute }) nzCollapsible: NzCollapsable = false;
  @Input({ transform: booleanAttribute }) nzResizable: boolean = false;
  @Input() parentLayout: NzLayout = 'horizontal';

  public flexBasis!: string;

  public constructor(private readonly nzToCssUnitPipe: NzToCssUnitPipe) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const { nzDefaultSize, nzSize } = changes;

    if (nzDefaultSize && nzDefaultSize.firstChange) {
      this.nzSize = this.nzToCssUnitPipe.transform(nzDefaultSize.currentValue);
    }

    if (nzSize && nzSize.firstChange) {
      this.nzSize = this.nzToCssUnitPipe.transform(nzSize.currentValue);
    }
  }

  public calculateFlexBasis(parent: HTMLElement): void {
    if (!this.nzSize!.toString().includes('%')) {
      this.flexBasis = this.nzSize!.toString();
      return;
    }

    let parentSize;

    if (this.parentLayout === 'horizontal') {
      parentSize = parent.offsetWidth;
    } else {
      parentSize = parent.offsetHeight;
    }
    this.flexBasis = `${parentSize * (parseFloat(<string>this.nzSize!) / 100)}px`;
  }
}
