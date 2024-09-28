/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzDirectionVHType } from 'ng-zorro-antd/core/types';

export type NzLayout = NzDirectionVHType;
export type NzCollapsable =
  | {
      start?: boolean;
      end?: boolean;
    }
  | boolean;
