import { Component } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSplitterComponent } from 'ng-zorro-antd/splitter';
import { NzSplitterPanelDirective } from 'ng-zorro-antd/splitter/splitter-panel.directive';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-splitter-basic',
  template: `
    <nz-splitter>
      <ng-template nz-splitter-panel [nzSize]="'40%'">
        <nz-flex nzAlign="center" nzJustify="center">
          <h5 nz-typography nzType="secondary">First</h5>
        </nz-flex>
      </ng-template>

      <ng-template nz-splitter-panel [nzSize]="'60%'">
        <nz-flex nzAlign="center" nzJustify="center">
          <h5 nz-typography nzType="secondary">Second</h5>
        </nz-flex>
      </ng-template>
    </nz-splitter>
  `,
  styles: `
    nz-splitter {
      height: 200px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    }

    nz-flex {
      height: 100%;
      padding-inline: 1rem;
    }

    h5 {
      white-space: preserve;
    }
  `,
  imports: [NzSplitterComponent, NzSplitterPanelDirective, NzFlexModule, NzTypographyModule],
  standalone: true
})
export class NzDemoSplitterBasicComponent {}
