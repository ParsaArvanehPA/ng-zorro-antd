import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-group',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzGridModule,
    NzInputNumberModule,
    NzSelectModule,
    NzSpaceModule
  ],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number-group nz-row [nzGutter]="8" nzSize="large" *nzSpaceItem>
        <div nz-col nzSpan="8">
          <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: 100%"></nz-input-number>
        </div>
        <div nz-col nzSpan="8">
          <nz-input-number [ngModel]="56789" [nzStep]="1" style="width: 100%"></nz-input-number>
        </div>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: 33%"></nz-input-number>
        <nz-input-number [ngModel]="56789" [nzStep]="1" style="width: 33%"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: calc(100% - 200px)"></nz-input-number>
        <button nz-button nzType="primary">Submit</button>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: calc(100% - 200px)"></nz-input-number>
        <button nz-button>
          <span nz-icon nzType="copy" nzTheme="outline"></span>
        </button>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-select ngModel="Zhejiang">
          <nz-option nzValue="Zhejiang" nzLabel="Zhejiang"></nz-option>
          <nz-option nzValue="Jiangsu" nzLabel="Jiangsu"></nz-option>
        </nz-select>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: 50%"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: 50%"></nz-input-number>
        <nz-date-picker></nz-date-picker>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number [ngModel]="1234" [nzStep]="1" style="width: 30%"></nz-input-number>
        <nz-range-picker></nz-range-picker>
      </nz-input-number-group>
    </nz-space>
  `
})
export class NzDemoInputNumberGroupComponent {}
