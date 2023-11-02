## flex布局
值        |描述
----------|----------
flex-grow|一个数字，规定项目将相对于其他灵活的项目进行扩展的量。
flex-shrink|一个数字，规定项目将相对于其他灵活的项目进行收缩的量。
flex-basis|项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。
auto|与 1 1 auto 相同。
none|与 0 0 auto 相同。
initial|设置该属性为它的默认值，即为 0 1 auto。请参阅 initial。
inherit|从父元素继承该属性。请参阅 inherit。
### 文字间隔效果
```html
<span class="accountType"><span>微</span><span>信</span></span>
```
```css
.accountType {
  width: 56px;
  height: 24px;
  display: flex;
  /* 两端对齐，项目之间的间隔都相等，从而实现文字间隔 */
  justify-content: space-between;
}
```
### flex 布局中子元素设置宽度无效
父元素设置了`display: flex`所以该父元素下所有的子元素都会默认加上`flex: 0 1 auto`。

其中 `1` 就是 `flex` 中的 `flex-shrink` 属性，表示开启元素的收缩功能，所以子元素宽度才会失效。

解决方案：

方案1
flex: 0 0 auto;
width: 200px;

方案2
flex: 0 0 200px;

方案3（推荐）
flex-shrink: 0;
width: 200px;

方案4
min-width: 200px;

## calc动态计算
用 css3 的 计算属性来给高度赋值。

任何长度值都可以使用calc()函数进行计算。

```css
height: calc(100vh - 56px - 80px);
```
其中的100vh代表100%的浏览器视图高度，减去56px(头部高度)、再减去80px(底部高度)，这样就能设置内容区域的高度自适应变化了。

## /deep/ 配合子选择器使用
```css
/deep/ .caseinfoFormLabel > .ant-form-item-label{
}
```

## grid布局
使用场景:比如一个横向列表，需要间隔一样，用`flex`布局的话会选择`justify-content:space-between`的方式
这种布局在列表只有两项，就变成一头一尾的分布，而不是排在后面的布局，这个时候可以使用grid布局
```css
.box{
  display: grid;
	grid-template-columns: repeat(4, 1fr);
}
```