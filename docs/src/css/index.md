## 文字间隔
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