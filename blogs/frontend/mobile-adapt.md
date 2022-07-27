---
title: 移动端网页样式适配方案
sidebar: 'auto'
categories:
 - frontend
tags:
 - CSS
---

## 1. 前置知识-像素
### 1.1 设备像素和分辨率
<p style="text-align: justify">&emsp;&emsp;在计算机中，图像是由多个点组合而成的，每个点只负责显示一种颜色，而这当中的「一点」，通常指一个<b>DP（Device Pixel，物理像素）</b>。例如常见的分辨率有 1366 * 768，即该显示器横向有 1366 个像素，纵向有 768 个像素。需要注意的是，每个设备的一个物理像素的大小可能不同。</p>

### 1.2 图片分辨率
<p style="text-align: justify">&emsp;&emsp;分辨率可以表示清晰度吗？答案是否定的，设想上述的 1366 * 768 的分辨率的设备，对于 13 英寸（33.02 cm）的屏幕来说是十分清晰的，而对于电影院的荧幕则可能像马赛克。这时需要引入另一个单位 <b>PPI（Pixel Per Inch，每英寸像素数）</b>来解释， 这表示像素密度，通常作为图片分辨率的单位，可以衡量图片的清晰度。上述屏幕的 PPI 的计算方式如下：</p>

$$PPI=\frac{\sqrt{1366^2 + 768^2}}{13}=120.54$$

### 1.3 显示分辨率
<p style="text-align: justify">&emsp;&emsp;如果你有使用计算机的经验，那很有可能有过手动调整显示分辨率的经历。修改分辨率又是怎么一回事呢？假设设备的分辨率为 1366 * 768，你把它调为 800 * 600，操作系统会通过抖动算法将多个物理像素输出为 1 个<b>逻辑像素</b>，也就是说，在调低分辨率后，1 个逻辑像素只显示一种颜色，但它可能由多个物理像素组成。</p>

### 1.4 设备独立像素与 CSS 像素
<p style="text-align: justify">&emsp;&emsp;CSS 样式代码中最常见的单位「px」通常就是指<b>DIP（Device Independent Pixel，设备独立像素）</b>，又称为<b>逻辑像素</b>。</p>
<p style="text-align: justify">&emsp;&emsp;为什么会有这个单位呢？在没出现视网膜屏幕前，其实并没有设备像素和设备独立像素的区分，因为他们都是一样的。但是当出现了视网膜，甚至更高 PPI 值的屏幕后，屏幕上分布的像素点越来越多，如果用 CSS 的 1 px 来表示设备上的一个物理像素点，并且在低 PPI 屏上正常显示，那么在高 PPI 屏上就会十分小。为了解决这个问题，就区分出两个概念了。</p>

&emsp;&emsp;浏览器的缩放百分比和 DIP 与 CSS 像素之间的关系如下：
$$
BrowserScale=\frac{DIP}{CSSPixel}
$$

<p style="text-align: justify">&emsp;&emsp;当浏览器的缩放为 100% 时，1 个设备独立像素就等于 1 个 CSS 像素。至于要以多少个设备像素组成一个设备独立像素，需要引入下面的概念来解释。</p>

### 1.5 设备像素比
<p style="text-align: justify">&emsp;&emsp;
<b>DPR（Device Pixel Ratio，设备像素比）</b>是物理像素与设备独立像素之比，表示一个独立像素由多少个物理像素显示。DPR 并不是由开发者确定的，而是由屏幕厂商决定的，这是为了让以「px」为单位的软件图像（例如 CSS 中的 px）在不同设备有更相似的实际大小。
</p>

## 2. 视窗
<p style="text-align: justify">&emsp;&emsp;
在移动端的网页应用中，经常能看到以下 `meta` 标签：
</p>

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

<p style="text-align: justify">&emsp;&emsp;
这是用于控制视窗表现的代码，上面代码表示视窗宽度与设备一致，即不会出现横向滚动条，并且初始缩放为 100%，用户无法调整缩放。这样设置的好处是，布局在不同设备中更加稳定，样式更容易被开发者掌控。
</p>

## 3. 方案选择
### 3.1 媒体查询
&emsp;&emsp;媒体查询是基于 CSS 的属性 `@media` 来控制不同条件下应用的样式的。许多媒体功能都是范围功能，这意味着可以在它们前面加上“最小”或“最大”来表示“最小条件”或“最大条件”约束。例如，想要让 `div` 在不同设备宽度下显示不同宽度：
```css
div {
    width : 30px;
}
@media only screen and (min-width: 375px) {
  div {
    width : 90px;
  }
}
@media only screen and (min-width: 360px) {
  div {
    width : 60px;
  }
}
```
上面的代码表示：
- 在浏览器视窗宽度至少有 375 px 时，`div` 宽度为 90 px
- 在浏览器视窗宽度至少有 360 px 时，`div` 宽度为 60 px
- 其他情况 `div` 宽度为 60 px

:::tip  
「其他情况」对应的代码应该放在最上方，否则会覆盖其他情况的样式。  
:::

&emsp;&emsp;但是，实际场景中样式通常会十分复杂，增加适配一类设备相当于需要再写一套样式，而且修改样式需要跳转好几处，代价巨大。如果是适配移动端、PC 端、平板等设备的场景，它们有几乎不同的布局，写多套样式是硬性要求，那么媒体查询仍是不错的选择。

### 3.2 基于 rem 的适配方案
&emsp;&emsp;rem 是 **root element** 的缩写，是一个根元素的字体大小单位。例如设置根元素 `html` 的字体大小为 15 px，那么 1 rem 就代表了 15 px。以下的代码和<a href="#媒体查询">上面的例子</a>效果是一样的：
```scss
html {
  font-size: 15px;
}
@media only screen and (min-width: 375px) {
  html {
    font-size: 45px;
  }
}
@media only screen and (min-width: 360px) {
  html {
    font-size: 30px;
  }
}
div {
  width: 2rem;
}
```
&emsp;&emsp;相较于传统的媒体查询方案，基于「rem」单位的媒体查询方案有着易于维护、代码量更少的特点。但是，不同的设备尺寸仍然要写多个 `@media` 来适配，可以使用 JavaScript 根据设备视窗宽度来计算根元素的字体大小，达到 viewport 方案的效果，这就是 [Flexible](https://github.com/amfe/lib-flexible) 方案。

&emsp;&emsp;随着「viewport」单位得到众多浏览器的兼容，基于「rem」单位的方案逐渐被替代。

### 3.3 基于 viewport 的适配方案
&emsp;&emsp;viewport 是移动端适配的终极方案，用户的设备视窗大小是固定的，基于视窗大小的百分比控制布局元素的大小，使整体布局变得可控。实践方式是使用 viewport 单位替代「px」，单位说明如下表：

| 单位 | 说明                                            |
| ---- | ----------------------------------------------- |
| vw   | ViewportWidth，表示 `window.innerWidth` 的 1%   |
| vh   | ViewportHeight，表示 `window.innerHeight` 的 1% |
| vmin | vw 和 vh 中取最小值                             |
| vmax | vw 和 vh 中取最大值                             |

&emsp;&emsp;假设设计稿的视窗宽度为 750 px，则 1 vw 为 75 px。通常设计稿使用的单位是「px」，要应用到 viewport 方案中，需要手动计算其大小是多少 vw，例如设计稿中有个元素宽高都为 150 px，经过计算，这 150 px 是 2 vw。为了提高开发效率，这里推荐使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 插件自动转化「px」为「vw」，如此即可使用「px」单位对着设计稿开发了。

## 4. 使用 viewport 方案的场景
### 使用 postcss 自动转化「px」为「vw」
### 1 px 问题
### iOS 底部小黑条障碍问题

## 参考
[前端认知：PPI、DPI、设备像素等概念](https://juejin.cn/post/6844903922117804046)  
[2022 年移动端适配方案指南 — 全网最新最全](https://juejin.cn/post/7046169975706353701)  
[响应式设计——理解设备像素、设备独立像素和css像素](https://www.jianshu.com/p/6b1f94bfa263)
