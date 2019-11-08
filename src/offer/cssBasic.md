# CSS基础

* [CSS选择器的优先级是怎样的？✨](#css选择器的优先级是怎样的？✨)
* [link和@import的区别？](#link和@import的区别？)
* [有哪些方式（CSS）可以隐藏页面元素？](#有哪些方式（CSS）可以隐藏页面元素？)
* [em\px\rem区别？](#em\px\rem区别？)
* [块级元素水平居中的方法？](#块级元素水平居中的方法？)
* [CSS有几种定位方式？](#css有几种定位方式？)
* [如何理解z-index？✨](#如何理解z-index？✨)
* [如何理解层叠上下文？✨](#如何理解层叠上下文？✨)
* [清除浮动有哪些方法？](#清除浮动有哪些方法？)
* [你对css-sprites的理解](#你对css-sprites的理解，好处是什么？)
* [你对媒体查询的理解？](#你对媒体查询的理解？)
* [你对盒模型的理解？✨](#你对盒模型的理解✨)
* [标准盒模型和怪异盒模型有什么区别？✨](#标准盒模型和怪异盒模型有什么区别？✨)
* [谈谈对BFC(Block Formatting Context)的理解？ ✨](#谈谈对bfc的理解✨)
* [为什么有时候人们用translate来改变位置而不是定位？](#为什么有时候人们用translate来改变位置而不是定位？)
* [伪类和伪元素的区别是什么？](#伪类和伪元素的区别是什么？)
* [你对flex的理解？✨](#你对flex的理解？✨)
* [关于CSS的动画与过渡问题](#关于css的动画与过渡问题)

本章是CSS考点的非重难点，因此我们采用简略回答的方式进行撰写，所以不会有太多详细的解释。

> 我们约定，每个问题后我们标记『✨』的为高频面试题

## CSS选择器的优先级是怎样的？✨

CSS选择器的优先级是：内联 > ID选择器 > 类选择器 > 标签选择器

到具体的计算层面，优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

* A 的值等于 1 的前提是存在内联样式, 否则 A = 0;
* B 的值等于 ID选择器 出现的次数;
* C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
* D 的值等于 标签选择器 和 伪元素 出现的总次数 。

就比如下面的选择器，它不存在内联样式，所以A=0,不存在id选择器B=0,存在一个类选择器C=1,存在三个标签选择器D=3，那么最终计算结果为: {0, 0, 1 ,3}

```css
ul ol li .red {
    ...
}
```

按照这个结算方式，下面的计算结果为: {0, 1, 0, 0}

```css
#red {

}
```

我们的比较优先级的方式是从A到D去比较值的大小，A、B、C、D权重从左到右，依次减小。判断优先级时，从左到右，一一比较，直到比较出最大值，即可停止。

比如第二个例子的B与第一个例子的B相比，1>0,接下来就不需要比较了，第二个选择器的优先级更高。

## link和@import的区别？

* link属于XHTML标签，而@import是CSS提供的。
* 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
* import只在IE 5以上才能识别，而link是XHTML标签，无兼容问题。
* link方式的样式权重高于@import的权重。
* 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

## 有哪些方式（CSS）可以隐藏页面元素？

* `opacity:0`：本质上是将元素的透明度将为0，就看起来隐藏了，但是依然占据空间且可以交互
* `visibility:hidden`: 与上一个方法类似的效果，占据空间，但是不可以交互了
* `overflow:hidden`: 这个只隐藏元素溢出的部分，但是占据空间且不可交互
* `display:none`: 这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
* `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
* `transform: scale(0,0)`: 平面变换，将元素缩放为0，但是依然占据空间，但不可交互

> 还有一些靠绝对定位把元素移到可视区域外，或者用clip-path进行裁剪的操作过于Hack，就不提了。

## em\px\rem区别？

* px：绝对单位，页面按精确像素展示。
* em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。
* rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持

## 块级元素水平居中的方法？

> 如果使用Hack的话，水平居中的方法非常多，我们只介绍主流的，奇葩的见拓展阅读

`margin:0 auto`方法

```css
  .center{
      height: 200px;
      width:200px;
      margin:0 auto;
      border:1px solid red;
  }
  <div class="center">水平居中</div>
```

flex布局，目前主流方法

```css
  .center{
      display:flex;
      justify-content:center;
  }
  <div class="center">
      <div class="flex-div">1</div>
      <div class="flex-div">2</div>
  </div>
```

table方法

```css
  .center{
      display:table;
      margin:0 auto;
      border:1px solid red;
  }
  <div class="center">水平居中</div>
```

还有一些通过position+(margin|transform)等方法的不一样列举了，非重点没必要。

> 拓展阅读: [16种方法实现水平居中垂直居中](https://louiszhai.github.io/2016/03/12/css-center/)

## CSS有几种定位方式？

* static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。

* relative：相对定位，此时的『相对』是相对于正常文档流的位置。

* absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。

* fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。

* sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

> 文字描述很难理解，可以直接看代码
<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="css,result" data-user="xiaomuzhu" data-slug-hash="bPVNxj" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="bPVNxj">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/bPVNxj/">
  bPVNxj</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

## 如何理解z-index？✨

CSS 中的z-index属性控制重叠元素的垂直叠加顺序，默认元素的z-index为0，我们可以修改z-index来控制元素的图层位置，而且z-index只能影响设置了position值的元素。

我们可以把视图上的元素认为是一摞书的层叠，而人眼是俯视的视角，设置z-index的位置，就如同设置某一本书在这摞书中的位置。

* 顶部: 最接近观察者
* ...
 * 3 层
 * 2 层
 * 1 层
 * 0 层 默认层
 * -1 层
 * -2 层
 * -3 层
* ...
* 底层: 距离观察者最远

![2019-06-14-02-19-16]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/282998fe2501b87e23af0fba61d9077e.png)

> 可以结合这个例子理解z-index

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="css,result" data-user="xiaomuzhu" data-slug-hash="xowqjG" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="xowqjG">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/xowqjG/">
  xowqjG</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

## 如何理解层叠上下文？✨

### 是什么？

层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

### 如何产生？

触发一下条件则会产生层叠上下文：

* 根元素 (HTML),
* z-index 值不为 "auto"的 绝对/相对定位，
* 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
* opacity 属性值小于 1 的元素（参考 the specification for opacity），
* transform 属性值不为 "none"的元素，
* mix-blend-mode 属性值不为 "normal"的元素，
* filter值不为“none”的元素，
* perspective值不为“none”的元素，
* isolation 属性被设置为 "isolate"的元素，
* position: fixed
* 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
* -webkit-overflow-scrolling 属性被设置 "touch"的元素

> 拓展阅读：[层叠上下文-张鑫旭](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

## 清除浮动有哪些方法？

* 空div方法：`<div style="clear:both;"></div>`
* Clearfix 方法：上文使用.clearfix类已经提到
* overflow: auto或overflow: hidden方法，使用BFC

> 在flex已经成为布局主流之后，浮动这种东西越来越少见了，毕竟它的副作用太大

## 你对css sprites的理解，好处是什么？

### 是什么 ？

雪碧图也叫CSS精灵， 是一CSS图像合成技术，开发人员往往将小图标合并在一起之后的图片称作雪碧图。

### 如何操作？

使用工具（PS之类的）将多张图片打包成一张雪碧图，并为其生成合适的 CSS。
每张图片都有相应的 CSS 类，该类定义了background-image、background-position和background-size属性。
使用图片时，将相应的类添加到你的元素中。

### 好处：

* 减少加载多张图片的 HTTP 请求数（一张雪碧图只需要一个请求）
* 提前加载资源

### 不足：

* CSS Sprite维护成本较高，如果页面背景有少许改动，一般就要改这张合并的图片
* 加载速度优势在http2开启后荡然无存，HTTP2多路复用，多张图片也可以重复利用一个连接通道搞定

## 你对媒体查询的理解？

### 是什么

媒体查询由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。媒体查询，添加自CSS3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身,非常适合web网页应对不同型号的设备而做出对应的响应适配。

### 如何使用？

媒体查询包含一个可选的媒体类型和，满足CSS3规范的条件下，包含零个或多个表达式，这些表达式描述了媒体特征，最终会被解析为true或false。如果媒体查询中指定的媒体类型匹配展示文档所使用的设备类型，并且所有的表达式的值都是true，那么该媒体查询的结果为true.那么媒体查询内的样式将会生效。

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```

> 拓展阅读：[深入理解CSS Media媒体查询](https://www.cnblogs.com/xiaohuochai/p/5848612.html)

## 你对盒模型的理解✨

### 是什么？

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

![2019-06-14-04-15-49]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/14650bf5fbb24066cea1dc1714d52a5b.png)

盒模型由content（内容）、padding（内边距）、border（边框）、margin（外边距）组成。

## 标准盒模型和怪异盒模型有什么区别？✨

在W3C标准下，我们定义元素的width值即为盒模型中的content的宽度值，height值即为盒模型中的content的高度值。

因此，标准盒模型下：
> 元素的宽度 = margin-left + border-left + padding-left + width + padding-right + border-right + margin-right

![2019-06-14-04-25-26]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/232580766e15853d521a4c0bf6a5c794.png)

而IE怪异盒模型（IE8以下）width的宽度并不是content的宽度，而是border-left + padding-left + content的宽度值 + padding-right + border-right之和，height同理。

在怪异盒模型下：

> 元素占据的宽度 = margin-left + width + margin-right

![2019-06-14-04-25-04]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/e427c6d19ea6be1359bd0177d7a5b7a3.png)

虽然现代浏览器默认使用W3C的标准盒模型，但是在不少情况下怪异盒模型更好用，于是W3C在css3中加入`box-sizing`。

```css
box-sizing: content-box // 标准盒模型
box-sizing: border-box // 怪异盒模型
box-sizing: padding-box // 火狐的私有模型，没人用
```

> 此演示来源于拓展阅读文章

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="js,result" data-user="xiaomuzhu" data-slug-hash="LKpyzz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LKpyzz">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/LKpyzz/">
  LKpyzz</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

> 拓展阅读：[深入理解盒模型](https://www.cnblogs.com/xiaohuochai/p/5202597.html)

## 谈谈对BFC的理解✨

### 是什么？

书面解释：BFC(Block Formatting Context)这几个英文拆解

* Block: Block在这里可以理解为Block-level Box,指的是块级盒子的标准

* Formatting context：块级上下文格式化，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

BFC是指**一个独立的渲染区域，只有Block-level Box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干**.

它的作用是在**一块独立的区域，让处于BFC内部的元素与外部的元素互相隔离**.

### 如何形成？

BFC触发条件:

* 根元素，即HTML元素
* position: fixed/absolute
* float 不为none
* overflow不为visible
* display的值为inline-block、table-cell、table-caption

### 作用是什么？

#### 防止margin发生重叠

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="html,result" data-user="xiaomuzhu" data-slug-hash="NZGjYQ" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="NZGjYQ">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/NZGjYQ/">
  NZGjYQ</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

#### 两栏布局，防止文字环绕等

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="css,result" data-user="xiaomuzhu" data-slug-hash="XLmRPM" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XLmRPM">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/XLmRPM/">
  XLmRPM</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

#### 防止元素塌陷

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="js,result" data-user="xiaomuzhu" data-slug-hash="VJvbEd" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="VJvbEd">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/VJvbEd/">
  VJvbEd</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

> 拓展阅读：[深入理解BFC](https://www.cnblogs.com/xiaohuochai/p/5248536.html)

## 为什么有时候人们用translate来改变位置而不是定位？

translate()是transform的一个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。

而translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发生这种情况。

> 拓展阅读:[CSS3 3D transform变换-张鑫旭](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

## 伪类和伪元素的区别是什么？

### 是什么？

 伪类（pseudo-class） 是一个以冒号(:)作为前缀，被添加到一个选择器末尾的关键字，当你希望样式在特定状态下才被呈现到指定的元素时，你可以往元素的选择器后面加上对应的伪类。
 
 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

### 区别

其实上文已经表达清楚两者区别了，伪类是通过在元素选择器上加入伪类改变元素状态，而伪元素通过对元素的操作进行对元素的改变。

我们通过`p::before`对这段文本添加了额外的元素，通过 `p:first-child`改变了文本的样式。

<p class="codepen" data-height="300" data-theme-id="33015" data-default-tab="css,result" data-user="xiaomuzhu" data-slug-hash="qzOXxO" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="qzOXxO">
  <span>See the Pen <a href="https://codepen.io/xiaomuzhu/pen/qzOXxO/">
  qzOXxO</a> by Iwobi (<a href="https://codepen.io/xiaomuzhu">@xiaomuzhu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<!-- <script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

> 拓展阅读：[伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

## 你对flex的理解？✨

web应用有不同设备尺寸和分辨率，这时需要响应式界面设计来满足复杂的布局需求，Flex弹性盒模型的优势在于开发人员只是声明布局应该具有的行为，而不需要给出具体的实现方式，浏览器负责完成实际布局，当布局涉及到不定宽度，分布对齐的场景时，就要优先考虑弹性盒布局

> 具体用法移步阮一峰的[flex语法](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)、[flex实战](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)，讲得非常通俗易懂，而且我们一两句话说不清楚。

## 关于CSS的动画与过渡问题

[深入理解CSS动画animation](https://www.cnblogs.com/xiaohuochai/p/5391663.html)

[深入理解CSS过渡transition](https://www.cnblogs.com/xiaohuochai/p/5347930.html)

---
参考资料：

1. [盒模型](https://segmentfault.com/a/1190000014801021)

---

