---
category: Components
subtitle: 弹性布局
type: 布局
cols: 1
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
tag: 18.1.1
---

自由切分指定区域

## 何时使用

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

### 引入模块

```ts
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
```

## API

### [nz-flex]:standalone

| 参数           | 说明                                                                                                                     | 类型                                                 | 默认值     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ---------- |
| `[nzVertical]` | 使用 `flex-direction: column`描述flex的垂直方向                                                                          | `boolean`                                            | `false`    |
| `[nzJustify]`  | 设置元素在主轴方向上的对齐方式，参照 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | `NzJustify`                                          | `'normal'` |
| `[nzAlign]`    | 设置元素在交叉轴方向上的对齐方式，参照 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)       | `NzAlign`                                            | `'normal'` |
| `[nzGap]`      | 设置项目的间隙                                                                                                           | `'small' \| 'middle' \| 'large' \| number \| string` | `0`        |
| `[nzWrap]`     | 指定 flex 元素单行显示还是多行显示，参照 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)         | `NzWrap`                                             | `'nowrap'` |
| `[nzFlex]`     | flex css简写属性，参照 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)                                     | `NzFlex`                                             | `'unset'`  |
