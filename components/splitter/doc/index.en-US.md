---
category: Components
type: Layout
cols: 5
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
tag: 18.1.1
---

Split panels to isolate

## When To Use

Can be used to separate areas horizontally or vertically. When you need to freely drag and adjust the size of each area. When you need to specify the maximum and minimum width and height of an area.

### Import Module

```ts
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
```

## API

### [nz-flex]:standalone

| Property       | Description                                                                | Type                                                                                          | Default    |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| `[nzVertical]` | Is direction of the flex vertical, use `flex-direction: column`            | `boolean`                                                                                     | `false`    |
| `[nzJustify]`  | Sets the alignment of elements in the direction of the main axis           | reference [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) | `'normal'` |
| `[nzAlign]`    | Sets the alignment of elements in the direction of the cross axis          | reference [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)         | `'normal'` |
| `[nzGap]`      | Sets the gap between items                                                 | `'small' \| 'middle' \| 'large' \| number \| string`                                          | `0`        |
| `[nzWrap]`     | Set whether the element is displayed in a single line or in multiple lines | reference [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)             | `'nowrap'` |
| `[nzFlex]`     | Flex CSS shorthand properties                                              | reference [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)                       | `'unset'`  |
