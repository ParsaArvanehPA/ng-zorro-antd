/* eslint-disable */
// eslint-disable
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzDirectionVHType } from 'ng-zorro-antd/core/types';
import { NzAnchorComponent } from './anchor.component';
import { NzAnchorModule } from './anchor.module';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const throttleTime = 51;

const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of();
    }
  }
};

describe('anchor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let page: PageObject;
  let srv: NzScrollService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzAnchorModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }, RouterTestingModule],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
    page = new PageObject();
    router = TestBed.get(Router);
    spyOn(context, '_scroll');
    spyOn(context, '_change');
    srv = TestBed.inject(NzScrollService);
  });
  afterEach(() => context.comp.ngOnDestroy());

  describe('[default]', () => {
    it(`should scolling to target via click a link`, () => {
      spyOn(srv, 'scrollTo').and.callFake((_containerEl, _targetTopValue = 0, options = {}) => {
        if (options.callback) {
          options.callback();
        }
      });
      expect(context._scroll).not.toHaveBeenCalled();
      page.to('#何时使用');
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should hava remove listen when the component is destroyed', () => {
      expect(context.comp['destroy$']!.isStopped).toBeFalsy();
      context.comp.ngOnDestroy();
      fixture.detectChanges();
      expect(context.comp['destroy$']!.isStopped).toBeTruthy();
    });

    it('should actived when scrolling to the anchor', (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        const inkNode = page.getEl('.ant-anchor-ink-ball');
        expect(+inkNode.style.top!.replace('px', '')).toBeGreaterThan(0);
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });

    it('should actived when scrolling to the anchor - horizontal', (done: () => void) => {
      context.nzDirection = 'horizontal';
      fixture.detectChanges();
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        const inkNode = page.getEl('.ant-anchor-ink-ball');
        expect(+inkNode.style.left!.replace('px', '')).not.toBeNull();
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });

    it('should clean actived when leave all anchor', fakeAsync(() => {
      spyOn(context.comp, 'clearActive' as any);
      page.scrollTo();
      tick(throttleTime);
      fixture.detectChanges();
      expect(context.comp['clearActive']).not.toHaveBeenCalled();
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
      tick(throttleTime);
      fixture.detectChanges();
      expect(context.comp['clearActive']!).toHaveBeenCalled();
    }));

    it(`won't scolling when is not exists link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page!.to('#invalid');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`won't scolling when is invalid link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.to('invalidLink');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`supports complete href link (e.g. http://www.example.com/#id)`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.getEl('.mock-complete').click();
      fixture.detectChanges();
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`should priorities most recently`, (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo('#parallel1');
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });

    it('should call updateUrlFragment method when an anchor link is clicked', () => {
      spyOn(context.comp, 'updateUrlFragment');
      const linkList = dl.queryAll(By.css('.ant-anchor-link-title'));
      (linkList[0].nativeElement as HTMLLinkElement).click();
      fixture.detectChanges();
      expect(context.comp.updateUrlFragment).toHaveBeenCalled();
    });

    it('should update fragment part of url when anchor link is clicked', fakeAsync(() => {
      fixture['ngZone']!.run(() => {
        router.initialNavigation();
        router.navigateByUrl('/');

        const linkList = dl.queryAll(By.css('.ant-anchor-link-title'));
        (linkList[1].nativeElement as HTMLLinkElement).click();
        fixture.detectChanges();
      });
      tick();

      expect(router.url).toBe(`/#basic`);
    }));
  });

  describe('property', () => {
    describe('[nzAffix]', () => {
      it(`is [true]`, () => {
        const linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
      });
      it(`is [false]`, () => {
        let linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
        context.nzAffix = false;
        fixture.detectChanges();
        linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(0);
      });
    });

    describe('[nzOffsetTop]', () => {
      it('should be using "calc" method calculate max-height', () => {
        const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
        expect(wrapperEl.styles['max-height']).toContain('calc(');
      });
    });

    describe('[nzCurrentAnchor]', () => {
      it('customize the anchor highlight', () => {
        context.nzCurrentAnchor = '#basic';
        fixture.detectChanges();
        const linkList = dl.queryAll(By.css('.ant-anchor-link'));
        expect(linkList.length).toBeGreaterThan(0);
        const activeLink = linkList.find(n => (n.nativeElement as HTMLDivElement).getAttribute('nzhref') === '#basic')!;
        expect(activeLink).toBeTruthy();
        expect((activeLink.nativeElement as HTMLDivElement).classList).toContain('ant-anchor-link-active');
      });
    });

    describe('[nzShowInkInFixed]', () => {
      beforeEach(() => {
        context.nzAffix = false;
        fixture.detectChanges();
      });
      it('should be show ink when [false]', () => {
        context.nzShowInkInFixed = false;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.ant-anchor-fixed')) == null).toBe(false);
      });
      it('should be hide ink when [true]', () => {
        context.nzShowInkInFixed = true;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.ant-anchor-fixed')) == null).toBe(true);
      });
    });

    describe('[nzContainer]', () => {
      it('with window', () => {
        spyOn(window, 'addEventListener');
        context.nzContainer = window;
        fixture.detectChanges();
        expect(window.addEventListener).toHaveBeenCalled();
      });
      it('with string', () => {
        spyOn(context, '_click');
        const el = document.querySelector('#target')!;
        spyOn(el, 'addEventListener');
        context.nzContainer = '#target';
        fixture.detectChanges();
        expect(el.addEventListener).toHaveBeenCalled();
        page.to('#basic-target');
        expect(context._click).toHaveBeenCalled();
      });
    });

    describe('(nzChange)', () => {
      it('should emit nzChange when click a link', fakeAsync(() => {
        spyOn(srv, 'scrollTo').and.callFake((_containerEl, _targetTopValue = 0, options = {}) => {
          if (options.callback) {
            options.callback();
          }
        });
        expect(context._change).not.toHaveBeenCalled();
        page.to('#basic-target');
        expect(context._change).toHaveBeenCalled();
      }));
      it('should emit nzChange when scrolling to the anchor', (done: () => void) => {
        spyOn(context, '_change');
        expect(context._change).not.toHaveBeenCalled();
        page.scrollTo();
        setTimeout(() => {
          const inkNode = page.getEl('.ant-anchor-ink-ball');
          expect(+inkNode.style.top!.replace('px', '')).toBeGreaterThan(0);
          expect(context._change).toHaveBeenCalled();
          done();
        }, throttleTime * 20);
      });
    });

    it('(nzClick)', () => {
      spyOn(context, '_click');
      expect(context._click).not.toHaveBeenCalled();
      const linkList = dl.queryAll(By.css('.ant-anchor-link-title'));
      expect(linkList.length).toBeGreaterThan(0);
      (linkList[0].nativeElement as HTMLLinkElement).click();
      fixture.detectChanges();
      expect(context._click).toHaveBeenCalled();
    });
  });

  describe('link', () => {
    it(`should show custom template of [nzTemplate]`, () => {
      expect(dl.query(By.css('.nzTemplate-title')) != null).toBe(true);
    });
    it(`should show custom template of [nzTitle]`, () => {
      expect(dl.query(By.css('.nzTitle-title')) != null).toBe(true);
    });
  });

  describe('direction', () => {
    it(`should have vertical direction by default`, () => {
      const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
      expect(wrapperEl.nativeElement.classList).not.toContain('ant-anchor-wrapper-horizontal');
    });

    it(`should have correct class name in horizontal mode`, () => {
      context.nzDirection = 'horizontal';
      fixture.detectChanges();
      const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
      expect(wrapperEl.nativeElement.classList).toContain('ant-anchor-wrapper-horizontal');
    });
  });

  describe('**boundary**', () => {
    it('#getOffsetTop', (done: () => void) => {
      const el1 = document.getElementById('何时使用')!;
      spyOn(el1, 'getClientRects').and.returnValue([] as any);
      const el2 = document.getElementById('parallel1')!;
      spyOn(el2, 'getBoundingClientRect').and.returnValue({
        top: 0
      } as any);
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });
  });

  class PageObject {
    getEl(cls: string): HTMLElement {
      const el = dl.query(By.css(cls));
      expect(el).not.toBeNull();
      return el.nativeElement as HTMLElement;
    }
    to(href: string = '#basic'): this {
      this.getEl(`nz-affix [href="${href}"]`).click();
      fixture.detectChanges();
      return this;
    }
    scrollTo(href: string = '#basic'): this {
      const toNode = dl.query(By.css(href));
      (toNode.nativeElement as HTMLElement).scrollIntoView();
      fixture.detectChanges();
      return this;
    }
  }
});

@Component({
  template: `
    <nz-anchor
      [nzAffix]="nzAffix"
      [nzBounds]="nzBounds"
      [nzShowInkInFixed]="nzShowInkInFixed"
      [nzOffsetTop]="nzOffsetTop"
      [nzTargetOffset]="nzTargetOffset"
      [nzContainer]="nzContainer"
      [nzCurrentAnchor]="nzCurrentAnchor"
      [nzDirection]="nzDirection"
      [nzReplace]="replace"
      (nzClick)="_click($event)"
      (nzScroll)="_scroll($event)"
      (nzChange)="_change($event)"
    >
      <nz-link nzHref="#何时使用" nzTitle="何时使用"></nz-link>
      <nz-link nzHref="#basic" nzTitle="Basic demo"></nz-link>
      <nz-link nzHref="#API-AnchorLink">
        <ng-template #nzTemplate>
          <span class="nzTemplate-title">tpl</span>
        </ng-template>
      </nz-link>
      <nz-link nzHref="#API" nzTitle="API">
        <nz-link nzHref="#API-Anchor" nzTitle="nz-anchor"></nz-link>
        <nz-link nzHref="#API-AnchorLink" [nzTitle]="title">
          <ng-template #title>
            <span class="nzTitle-title">tpl-title</span>
          </ng-template>
        </nz-link>
      </nz-link>
      <nz-link nzHref="#invalid" nzTitle="invalid"></nz-link>
      <nz-link nzHref="invalidLink" nzTitle="invalidLink"></nz-link>
      <nz-link nzHref="http://www.example.com/#id" nzTitle="complete" class="mock-complete"></nz-link>
      <nz-link nzHref="#parallel1" nzTitle="parallel1"></nz-link>
      <nz-link nzHref="#parallel2" nzTitle="parallel2"></nz-link>
      <nz-link nzHref="#basic-target" nzTitle="basic-target"></nz-link>
    </nz-anchor>
    <h2 id="何时使用"></h2>
    <div style="height: 1000px"></div>
    <h2 id="basic"></h2>
    <div style="height: 100px"></div>
    <h2 id="API"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-Anchor"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-AnchorLink"></h2>
    <table>
      <tr>
        <td><h2 id="parallel1">parallel1</h2></td>
        <td><h2 id="parallel2">parallel2</h2></td>
      </tr>
    </table>

    <div style="height: 1000px"></div>
    <div id="target">
      <div style="height: 1000px"></div>
      <h2 id="basic-target"></h2>
    </div>
  `,
  styles: `
    @import '../style/testing.less';
    @import './style/patch.less';
  `
})
export class TestComponent {
  @ViewChild(NzAnchorComponent, { static: false }) comp!: NzAnchorComponent;
  nzAffix = true;
  nzBounds = 5;
  nzOffsetTop = 0;
  nzTargetOffset?: number;
  nzShowInkInFixed = false;
  nzContainer: any = null;
  nzCurrentAnchor?: string;
  nzDirection: NzDirectionVHType = 'vertical';
  replace = false;
  _click() {}
  _change() {}
  _scroll() {}
}
