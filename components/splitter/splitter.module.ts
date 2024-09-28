/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzToCssUnitPipe } from 'ng-zorro-antd/pipes';

import { NzSplitterBarComponent } from './splitter-bar.component';
import { NzSplitterPanelDirective } from './splitter-panel.directive';
import { NzSplitterComponent } from './splitter.component';

@NgModule({
  imports: [NzSplitterComponent, NzSplitterBarComponent, NzSplitterPanelDirective, NzToCssUnitPipe],
  exports: [NzSplitterComponent, NzSplitterBarComponent, NzSplitterPanelDirective, NzToCssUnitPipe]
})
export class NzSplitterModule {}
