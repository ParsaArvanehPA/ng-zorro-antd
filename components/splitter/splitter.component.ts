/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkDragMove } from '@angular/cdk/drag-drop';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import { NzSplitterBarComponent } from 'ng-zorro-antd/splitter/splitter-bar.component';
import { NzSplitterPanelDirective } from 'ng-zorro-antd/splitter/splitter-panel.directive';
import { NzLayout } from 'ng-zorro-antd/splitter/typings';

@Component({
  selector: 'nz-splitter',
  exportAs: 'nz-splitter',
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgTemplateOutlet, NzSplitterBarComponent, NgStyle],
  host: {
    class: 'ant-splitter',
    '[class.ant-splitter-vertical]': `nzLayout === 'vertical'`,
    '[class.ant-splitter-horizontal]': `nzLayout === 'horizontal'`
  },
  template: `
    @for (template of templates; track template) {
      <div class="ant-splitter-panel" [ngStyle]="{ 'flex-basis': this.panels.toArray()[$index].flexBasis }">
        <ng-container [ngTemplateOutlet]="template"></ng-container>
      </div>

      @if (!$last && templates.length > 1) {
        <nz-splitter-bar (dragEvent)="splitterBarDragHandler($event, $index)"></nz-splitter-bar>
      }
    }
  `
})
export class NzSplitterComponent implements AfterViewInit, OnDestroy {
  @Input() nzLayout: NzLayout = 'horizontal';
  @Output() readonly nzOnResizeStart = new EventEmitter<void>();
  @Output() readonly nzOnResize = new EventEmitter<void>();
  @Output() readonly nzOnResizeEnd = new EventEmitter<void>();

  @ContentChildren(NzSplitterPanelDirective, { read: TemplateRef }) templates!: QueryList<TemplateRef<void>>;
  @ContentChildren(NzSplitterPanelDirective, { read: NzSplitterPanelDirective })
  panels!: QueryList<NzSplitterPanelDirective>;

  private observer!: ResizeObserver;

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.calculatePanelsFlexBasis();
    this.reCalculatePanelsFlexBasisOnParentSizeChange();
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.unobserve(this.elementRef.nativeElement);
      this.observer.disconnect();
    }
  }

  public splitterBarDragHandler(mouseEvent: CdkDragMove, index: number): void {
    console.log(mouseEvent, index);
  }

  private reCalculatePanelsFlexBasisOnParentSizeChange(): void {
    this.observer = new ResizeObserver(() => {
      this.calculatePanelsFlexBasis();
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private calculatePanelsFlexBasis(): void {
    this.panels.forEach(panel => panel.calculateFlexBasis(this.elementRef.nativeElement));
  }
}
