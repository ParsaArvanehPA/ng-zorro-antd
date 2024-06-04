/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzPopconfirmComponent, NzPopconfirmDirective } from './popconfirm';

@NgModule({
  imports: [NzPopconfirmComponent, NzPopconfirmDirective],
  exports: [NzPopconfirmComponent, NzPopconfirmDirective]
})
export class NzPopconfirmModule {}
