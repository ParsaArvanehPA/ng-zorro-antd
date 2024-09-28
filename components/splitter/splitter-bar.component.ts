/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nz-splitter-bar',
  exportAs: 'nz-splitter-bar',
  preserveWhitespaces: false,
  standalone: true,
  template: `
    <div
      #bar
      class="ant-splitter-bar-dragger"
      cdkDragLockAxis="x"
      cdkDrag
      (cdkDragMoved)="test($event); bar.classList.add('ant-splitter-bar-dragger-active')"
      (cdkDragEnded)="bar.classList.remove('ant-splitter-bar-dragger-active')"
    >
    </div>
  `,
  host: {
    class: 'ant-splitter-bar'
  },
  imports: [NgClass, CdkDrag]
})
export class NzSplitterBarComponent {
  @Output() readonly dragEvent = new EventEmitter<CdkDragMove>();

  test(event: CdkDragMove): void {
    console.log(event);
    console.log(event.source.getFreeDragPosition());
    this.dragEvent.emit(event);
  }
}
