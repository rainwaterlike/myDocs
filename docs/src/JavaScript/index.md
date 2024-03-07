# 学习笔记

## 数组

### 把开始时间和结束时间拼装为数组 

```js
const validDateRange = [validBeginTime, validEndTime]
```

### 把时间段数组拆分为开始时间和结束时间(解构)

```js
const [validBeginTime, validEndTime] = validDateRange ?? []
```

### 去重

Set里面的值是唯一的，然后使用拓展运算符展开

```js
const arr = [...new Set(sysNameArr)];
```

### 使用map重新组装数据

#### 重新给key值

```js
couponMemberList = couponMemberList?.map((item: any) => ({
    memberId: item.id,
}));
```

#### 只要部分属性

可以使用解构取出想要的属性

```js
let list = [{
    id: 1,
    name: '张三',
    age: 15
}]

list = list?.map(({
    id,
    name
}) => ({
    return {
        id,
        name
    }
}));

console.log(list) //[{ id:1, name:'张三' }]
```

### 使用filter筛选数组内符合要求的数据

```js
arr = arr.filter((item) => {
    return item.orgCategory === "1";
})
```

### 对象数组根据属性分组方法

```js
function test() {
    var list = [{
            "name": "John",
            "Average": 15,
            "High": 10,
            "DtmStamp": 1358226000000
        },
        {
            "name": "Jane",
            "Average": 16,
            "High": 92,
            "DtmStamp": 1358226000000
        },
        {
            "name": "Jane",
            "Average": 17,
            "High": 45,
            "DtmStamp": 1358226000000
        }
    ];

    var sorted = this.groupBy(list, function(item) {
        return [item.name + item.High];
    });
    console.log(sorted);
}
test();

function groupBy(array, f) {
    debugger;
    var groups = {};
    array.forEach(function(o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
        return groups[group];
    });
}
```

### 数组转对象
把数组转换为对象，key为itemName，值为title
```js
const itemTitle = [
  {
    title: '案件名称',
    itemName: 'caseName'
  },
  {
    title: '案件类型',
    itemName: 'caseType'
  },
  {
    title: '案件性质',
    itemName: 'caseNature'
  }
]
```

可以使用reduce方法将数组转换为对象：

```js
const itemObject = itemTitle.reduce((obj, item) => {
  obj[item.itemName] = item.title;
  return obj;
}, {});
console.log(itemObject);
```

## 对象

### 解构

```js
const { validDateRange } = values;
```

### 把拼装好的数据覆盖并合并

```js
const data = {
    id: 1,
    name: '张三',
    age: 15,
    children: [
        '888', '999'
    ]
}

const children = ['111', '222']

const obj = {
    ...data, //展开对象
    //如果key相同，下面的会覆盖上面的
    children
};
```

### 往对象里添加key和value

先声明一个对象，中括号内填写key，等号右边填入value

```js
obj["id"] = '001';
```

### 循环对象进行列表渲染

```js
 const obj = {
     id: 111,
     name: '张三',
     age: 12,
 }; 
 <Descriptions title = "User Info" > {
      Object.keys(obj).map(key =>
          ( < Descriptions.Item label = {
                  obj[key]
              }
              key = {
                  key
              } > {
                  obj[key]
              } 
              </Descriptions.Item>
          ))
  } 
  </Descriptions>
```

## 可选链 ?.

undefined时不报错，避免写一堆的if判断

```js
if (res?.data?.content) {
    //true 代表content能获取到
}
```

## 逻辑或运算符 || 

短路运算符,可以给一个默认值

```js 
function greet(name) {
  return "Hello, " + (name || "Guest") + "!";
}

console.log(greet("Alice")); // 输出 "Hello, Alice!"
console.log(greet()); // 输出 "Hello, Guest!"，因为没有提供参数
```

逻辑或运算符 `||` 有明显弊端，它会覆盖所有的假值，如（0, '', false）

```js 
let defaultHeight = 0;
let height = defaultHeight || 10;
console.log(height); // 10
```
## 空位合并操作符 ??
对假值的处理更加的全面，当且仅当表达式左侧为 undefined 或 null，就返回其右侧默认值

```js
// 空位合并操作符不会覆盖假值
let defaultVal = 0;
let value = defaultVal ?? 10;
console.log(value); // 0

// undefined 或 null 的场景
let x = null;
let y = x ?? 10;
console.log(y); // 10

```

## 逻辑与运算符 &&

将两个表达式组合在一起，只有当两个表达式的值都为 true 时，整个表达式才会返回 true。

```jsx
<>
  isShow && <div>显示</div>
</>
```

## 逻辑非运算符 !

对一个表达式取反，即如果表达式的值为 false，则返回 true；如果表达式的值为 true，则返回 false。

```js
if(!isShow){
  ...
}
```


## localStorage

### 设置localStorage

```js
localStorage.setItem(
    'userUseColor' + utils.cookies.get("uuid"), JSON.stringify(data)
);
```

### 获取localStorage

```js
localStorage.getItem('userUseColor' + utils.cookies.get("uuid"))
```

### 删除localStorage

```js
localStorage.removeItem('userUseColor' + utils.cookies.get("uuid"))
```

## 颜色

### 获取亮色

```js
getBrightColor(color, range) {
    let newColor = '#';
    for (let i = 0; i < 3; i++) {
        const hxStr = color.substr(i * 2 + 1, 2);
        let val = parseInt(hxStr, 16);
        val += range;
        if (val < 0) val = 0;
        else if (val > 255) val = 255;
        newColor += val.toString(16).padStart(2, '0')
    }
    return newColor;
}
```

### 获取浅色

```js
// 得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
getLightColor(color, level) {
    //var r = /^\#?[0-9A-F]{6}$/;
    //if (!r.test(color)) return window.alert("减淡颜色值出错:"+color);
    var rgbc = this.hexToRgb(color);
    for (var i = 0; i < 3; i++) rgbc[i] =
        Math.floor((255 - rgbc[i]) * level + rgbc[i]);
    return this.rgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
//测试
this.getBrightColor(value, 40)
```

### 获取深色

```js
//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
getDarkColor(color, level) {
    //var r =/^\#?[0-9A-F]{6}$/;
    //if (!r.test(color)) return window.alert("加深颜色值出错:"+color);
    var rgbc = this.hexToRgb(color);
    //floor 向下取整
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return this.rgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
//测试
this.getDarkColor(value, '0.15')
```

### RGB颜色转Hex颜色

```js
//RGB颜色转Hex颜色
rgbToHex(a, b, c) {
    //var r = /^\d{1,3}$/;
    //if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert("RGB颜色转Hex颜色出错:"+a+' '+b+' '+c);
    var hexs = [a.toString(16), b.toString(16), c.toString(16)];
    for (var i = 0; i < 3; i++)
        if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
    return "#" + hexs.join("");
}
```

### hex颜色转rgb颜色

```js
//hex颜色转rgb颜色
hexToRgb(str) {
    //var r = /^\#?[0-9A-F]{6}$/;
    //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
    //if (!r.test(str)) return window.alert("输入错误的hex:"+str);
    //replace替换查找的到的字符串
    str = str.replace("#", "");
    //match得到查询数组
    var hxs = str.match(/../g);
    //alert('bf:'+hxs)
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
    //alert(parseInt(80, 16))
    //console.log(hxs);
    return hxs;
}
```

### 判断颜色深浅

判断深色的阈值
大于210为浅色，浅色就把字体颜色设为黑色，不然会看不清楚

210是自己调试出来的值

```js
const grayLevel = arr[0] * 0.299 + arr[1] * 0.587 + arr[2] * 0.114;
if (grayLevel >= 210) {
    ...
}
```

## requestAnimationFrame

requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

### 优点

在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

[参考文档](https://juejin.cn/post/6844904098991439886)

### 可能存在的问题

代码复杂后时间戳差异和帧速率不再稳定，有时发生得太早/太晚，导致帧速率不一致。如果requestAnimationFrame一直被延迟调用，我会假设由于JavaScript的单线程性质，驻留在animate（）函数中的复杂代码执行所需的时间太长，因此导致requestAnimationFrame调用延迟。

[参考文档](https://qa.1r1g.com/sf/ask/4037712031/)

### 实战示例

使用requestAnimationFrame做一个小人挥手的动画

```ts

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
//当前图片路径
const littleBoyImgSrc = ref('');
//小人动画图片base64数组
const littleBoyBase64List: string[] = [];
//最后切换图片时间
let lastRunTime = 0;
/**
 * @description:小人动画播放
 * @return {*}
 */
const run = (): void => {
  let _index = 0;
  const _run = () => {
    const now = new Date().getTime();
    //切换图片的间隔时间
    const intervalTime = 120;
    //超过间隔时间才进行切换图片
    if (now - lastRunTime > intervalTime) {
      // 下标到了最后一张图片时还原下标，实现循环切换图片
      if (_index > littleBoyBase64List.length - 1) {
        _index = 0;
      }
      //修改图片路径地址
      littleBoyImgSrc.value = littleBoyBase64List[_index];
      _index++;
      //记录时间，用于计算间隔时间
      lastRunTime = now;
    }
    //requestAnimationFrame:H5逐帧渲染动画Api
    window.requestAnimationFrame(_run);
  };
  _run();
};
//图片转base64
const getImageToBase64 = (imgUrl: any): void => {
  const canvas = document.createElement('canvas');
  canvas.width = imgUrl.width;
  canvas.height = imgUrl.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(imgUrl, 0, 0, imgUrl.width, imgUrl.height);
  const ext = imgUrl.src
    .substring(imgUrl.src.lastIndexOf('.') + 1)
    .toLowerCase();
  const dataURL = canvas.toDataURL('image/' + ext);
  //转为base64再存入数组内
  littleBoyBase64List.push(dataURL);
};
//加载动画图片数组，先转为base64再存入数组内，减少服务器开销
for (let index = 1; index < 19; index++) {
  const image = new Image();
  image.src = new URL(
    `../../../assets/img/littleBoy/${index}.png`,
    import.meta.url
  ).href;
  image.onload = function () {
    getImageToBase64(image);
  };
}
onMounted(() => {
  run();
});
</script>
```

## 获取验证码

```vue-html
  <el-input

      type="text"
      v-model="loginPhone.phoneNum"
      placeholder="手机号"
      minlength="11"
      maxlength="11"
      show-word-limit
      clearable
      style="margin-bottom: 7px"

  ></el-input>
  <el-input

      type="text"
      v-model="loginPhone.verificationCode"
      placeholder="验证码"
      maxlength="10"
      clearable

  >

    <template #append>
      <el-link
          :underline="false"
          @click="getVerificationCode"
          :disabled="loginPhone.isGetVerificationCode"
      >
        {{
          loginPhone.isGetVerificationCode
              ? loginPhone.verificationCodeTime + '秒后重新获取'
              : '获取验证码'
        }}
      </el-link>
    </template>

  </el-input>

```
```js
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
// import wxlogin from 'vue-wxlogin';

//当前点击标签页
const currentActiveName = ref('idCard');
//点击标签页时修改当前标签页名称
const handleClick = (tab: string): void => {
  currentActiveName.value = tab;
};

//手机登录
const loginPhone = reactive({
  //电话号码
  phoneNum: '',
  //验证码
  verificationCode: '',
  //是否正在获取验证码
  isGetVerificationCode: false,
  //是否开启登录按钮
  isLoginDisabled: true,
  //获取验证码倒计时
  verificationCodeTime: 0
});

//获取验证码
const getVerificationCode = (): void => {
  if (loginPhone.phoneNum.length !== 11) {
    ElMessage({
      showClose: true,
      message: '请输入正确的手机号',
      type: 'error'
    });
    return;
  }
  //切换状态为正在获取验证码
  loginPhone.isGetVerificationCode = true;
  //设置倒计时时间
  loginPhone.verificationCodeTime = 2;
  //定时器，每秒刷新倒计时
  const setTimeoutS = setInterval(() => {
    loginPhone.verificationCodeTime--;
    if (loginPhone.verificationCodeTime <= 0) {
      //倒计时到了清除计时器并切换状态
      clearInterval(setTimeoutS);
      loginPhone.isGetVerificationCode = false;
    }
  }, 1000);
};
// 验证码没有内容时禁用登录按钮
watch(
  () => loginPhone.verificationCode,
  (newValue, oldValue) => {
    if (newValue) {
      loginPhone.isLoginDisabled = !newValue;
    } else {
      loginPhone.isLoginDisabled = true;
    }
  }
);
</script>
```
## 列表点击按钮进行上下滚动
```js
// 滚动效果
easeInQuad(curtime, begin, end, duration) {
  let x = curtime / duration; //x值
  let y = x * x; //y值
  return begin + (end - begin) * y; //套入最初的公式
},
easeOutQuad(curtime, begin, end, duration) {
  let x = curtime / duration;         //x值
  let y = -x * x + 2 * x;  //y值
  return begin + (end - begin) * y;        //套入最初的公式
},
easeInoutQuad(curtime, begin, end, duration) {
  if (curtime < duration / 2) { 
     //前半段时间,改变量和时间都除以2
    return this.easeInQuad(curtime,begin, (begin + end) / 2, duration / 2);
  } else {
    //注意时间要减去前半段时间
    let curtime1 = curtime - duration / 2; 
    //初始量要加上前半段已经完成的
    let begin1 = (begin + end) / 2;
    //改变量和时间都除以2
    return this.easeOutQuad(curtime1, begin1, end, duration / 2);
  }
},
/**
 * 点击上下按钮进行滚动
 * @param action 类型，往上或者往下
 * @param elementId div的id和ref
 */
handleClickScroll(action, elementId) {
  let menuScroll = document.getElementById(elementId)
  const {clientHeight, scrollHeight} = this.$refs[elementId]
  // 每次滚动距离，等于div的高度
  let dis = 400;
  // 滚动时长
  let duration = 500;
  // 初始距离
  let preX = 0;
  let startTime = new Date().getTime();
  let func = () => {
    let nowTime = new Date().getTime();
    let t = nowTime - startTime;
    // 当时长大于500时，停止滚动
    if (t > duration) {
      return;
    }
    let s = this.easeInoutQuad(t, 0, dis, duration);
    // console.log('s', s)
    // 每次滚动距离
    let x = s - preX;
    preX = s;
    if (action === 'up') {
      //上面没有内容了就禁用向上的按钮
      if (menuScroll.scrollTop === 0) {
        if (elementId === 'identifyItem') {
          this.identifyUpDisabled = true
        } else {
          this.aimUpDisabled = true
        }
      } else {
        //解锁向下的按钮
        if (elementId === 'identifyItem') {
          this.identifyDownDisabled = false
        } else {
          this.aimDownDisabled = false
        }
        // 向上滚动
        menuScroll.scrollTop -= x
      }
    } else if (action === 'down') {
      //下面没有内容了就禁用向下的按钮
      if (menuScroll.scrollTop + clientHeight >= scrollHeight) {
        if (elementId === 'identifyItem') {
          this.identifyDownDisabled = true
        } else {
          this.aimDownDisabled = true
        }
        return;
      } else {
        //解锁向上的按钮
        if (elementId === 'identifyItem') {
          this.identifyUpDisabled = false
        } else {
          this.aimUpDisabled = false
        }
        // 向下滚动
        menuScroll.scrollTop += x
      }

    }
    // 请求滚动
    requestAnimationFrame(func)
  }
  requestAnimationFrame(func)
},
/**
 * 鼠标滑轮滚动
 */
scroll(e) {
  const {id, scrollTop, clientHeight, scrollHeight} = e.target
  //上面没有内容了就禁用向上的按钮
  if (scrollTop === 0) {
    if (id === 'identifyItem') {
      this.identifyUpDisabled = true
    } else {
      this.aimUpDisabled = true
    }
  } else{
    //解锁向上的按钮
    if (id === 'identifyItem') {
      this.identifyUpDisabled = false
    } else {
      this.aimUpDisabled = false
    }
  }

  //下面没有内容了就禁用向下的按钮
  if (scrollTop + clientHeight >= scrollHeight) {
    if (id === 'identifyItem') {
      this.identifyDownDisabled = true
    } else {
      this.aimDownDisabled = true
    }
  } else  {
    //解锁向下的按钮
    if (id === 'identifyItem') {
      this.identifyDownDisabled = false
    } else {
      this.aimDownDisabled = false
    }
  }
},
updateButtonDisable(ref) {
  const {clientHeight, scrollHeight} = this.$refs[ref]
  if (ref === 'identifyItem') {
    const isDisable = clientHeight === scrollHeight ? true : false
    this.identifyUpDisabled = isDisable
    this.identifyDownDisabled = isDisable
  } else {
    const isDisable = clientHeight === scrollHeight ? true : false
    this.aimUpDisabled = isDisable
    this.aimDownDisabled = isDisable
  }
}
```
## 动态计算标题图片高度
```js
mounted() {
  const that = this;
  window.onresize = () => {
    /*
     * 动态计算标题图片高度，以免浏览器放大缩小导致图片变形。
     * 18是图片的宽除以高得出的值
     */
    that.titleImgHeight.height = document.body.clientWidth / 18 + "px";
  };
}
```

## 避免冗长/丑陋的if/else语句

### 1.字符串拼接
```js
function setAccType(accType) {
    if (accType == "PLATINUM") {
        return "Platinum Customer";
    } else if (accType == "GOLD") {
        return "Gold Customer";
    } else if (accType == "SILVER") {
        return "Silver Customer";
    }
}
```

像这种条件和返回值有非常强的相关性的语句，通常我们就可以通过下面这种非常简洁的方式来处理，让多行秒变一行：

```js
function setAccType(accType){
    return accType[0] + accType.slice(1).toLowerCase() + ' Customer';
    // or
    return `${accType[0] + accType.slice(1).toLowerCase()} Customer`;
}
```

### 2.switch/case 语句也是比较常用的技巧，来看下面这个例子：
```js
if (status === 200) {
  handleSuccess()
} else if (status === 401) {
  handleUnauthorized()
} else if (status === 404) {
  handleNotFound()
} else {
  handleUnknownError()
}
```
像这样的，我们就可以通过 switch/case 来进行处理：
```js
switch (status) {  
    case 200:  
        handleSuccess()  
        break  
    case 401:  
        handleUnauthorized()  
        break  
    case 404:  
        handleNotFound()  
        break  
    default:  
        handleUnknownError()  
        break  
}
```
虽然多了几行代码，但避免了一次又一次的重复的全等检查，而且整体上更精简、直观。

### 3. 使用对象映射
```js
const statusColors = {
    success: 'green',
    warning: 'yellow',
    info: 'blue',
    error: 'red'
};

function getStatusColor(status) {
    return statusColors[status] || '';
}
```

### 4.使用include
```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件1: fruit 必须非空
  if (fruit) {
    // 条件2: 必须是红色的水果
    if (redFruits.includes(fruit)) {
      console.log('red');

      // 条件3: 必须大于10个
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

test(null); // error: No fruits
test('apple'); // red
test('apple', 20); // red, big quantity
```

通过倒置条件和提前返回减少嵌套

```js
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); 
  if (!redFruits.includes(fruit)) return; 

  console.log('red');

  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

## 树形数据，输入节点名称，返回完整路径
```js
function findPath(data, target) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === target) {
                return data[i].name.split('-').reverse().join('-');
            } else if (data[i].children) {
                let result = findPath(data[i].children, target);
                if (result) {
                    return data[i].name + '-' + result;
                }
            }
        }
        return null;
    }


    const treeData = [
        {
            name: '贵州',
            children: [
                {
                    name: '贵阳',
                    children: [{
                        name: '张三'
                    }]
                },
                {
                    name: '遵义',
                    children: [{
                        name: '李四'
                    }]
                }
            ]
        }
    ];
    console.log('222', findPath(treeData, '张三')) 
    console.log('333', findPath(treeData, '李四')) 
```

### 错误提示："getActivePinia()" was called but there was no active Pinia. Are you trying
需要在函数内部进行`useStore()`
```js
import { useStore } from '@/stores'

/**
 * 控制返回键的显示
 */
export const useToggleShowBack = (to:RouteLocationNormalized) => {
    const store = useStore()
    store.isShowBack = (to.matched[0].props.default as any).showBack
}
```
需要把`const store = useStore()` 放在函数内部

参考：https://blog.csdn.net/z750467878/article/details/132289194

## ts提示不存在某个属性
使用类型断言
```ts
export const useToggleShowBack = (to:RouteLocationNormalized) => {
    const store = useStore()
    //第一种写法
    store.isShowBack = (to.matched[0].props.default as any).showBack
//第二种写法
 (<any>to.matched[0].props.default).showBack
}
```

## 动态路由
```js
{
    path: '/taskForm/:id',
    name: 'taskForm',
    props: {
      //顶部是否显示返回按钮
      showBack: true
    },
    component: taskForm,
  }
```

## 路由跳转提示 [Vue Router warn]: Path "/taskForm" was passed with params but they will be ignored. Use a named route alongside params instead.
改为命名路由跳转
```js
router.push({
        name:'taskForm',
        params:{
            id:id
        }
    })
```

## 动态路由跳转时不传参数提示Missing required param "id"
因为id是必传的，但是跳转的时候没有传id，在path的最后添加一个`?`即可把id改为非必传
```js
  //农户信息表单
  {
    path: '/farmersInfo/farmersForm/:id?',
    name: 'farmersForm',
    props:{
      //顶部是否显示返回按钮
      showBack: true,
    },
    component: farmersForm,
  },
```

## echarts 图例 legend
通过Legend可以展示不同系列数据的标识符号，如颜色、线型等。
用户可以通过点击Legend中的项来显示或隐藏相应的系列数据。

## 获取用户设备信息(userAgent)
``` js 
let deviceName = ref('')
let os = ref('')
const ua = navigator.userAgent;
const getUserAgent = () => {
    if (/iPhone/.test(ua)) {
        deviceName.value = "iPhone";
        if (/CPU iPhone OS (\d+_\d+)/.test(ua)) {
            os.value = "iOS " + RegExp.$1.replace("_", ".");
        }
    } else if (/Android/.test(ua)) {
        const systemRegex = /Android\s(\d+)/;
        const modelRegex = /(\w+)\sBuild/;

        const systemMatch = ua.match(systemRegex);
        const modelMatch = ua.match(modelRegex);

        const system = `Android ${systemMatch?.[1]}`  ||'Unknown';
        const model = modelMatch?.[1] ||'Unknown';
        deviceName.value = system;
        os.value = model;
    } else {
        deviceName.value = "Unknown";
        os.value = "Unknown";
    }

    console.log("Device Name: " + deviceName.value);
    console.log("Operating System: " + os.value);
}
```

## 高德地图使用
```js
 // AMapLoader => 加载器
    // 资源加载完成后就会触发 then
    AMapLoader.load({
        "key": "", // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0",   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
        // 初始化地图
        map = new AMap.Map('map', {
            // 配置对象 - 配置地图的风格和缩放比例，请移步 2.2
            zoom: 12,
            //定位成功后是否自动调整地图视野到定位点
            zoomToAccuracy: true,
            //是否使用高精度定位，默认:true
            enableHighAccuracy: true
        });
    }).catch(e => {
        console.log(e);
    });
```
```js
AMapLoader.load({
        "key": "", // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0",   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
        map = new AMap.Map("map", {
            resizeEnable: true,
        });
        AMap.plugin("AMap.Geolocation", function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                timeout: 10000, // 超过10秒后停止定位，默认：无穷大
                maximumAge: 60 * 24 * 60 * 60 * 1000, // 定位结果缓存0毫秒，默认：0
                convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true, // 显示定位按钮，默认：true
                buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(20, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
                showCircle: false, // 定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
                if (status == "complete") {
                    onComplete(result);
                } else {
                    onError(result);
                }
            });
            arr.forEach((item) => {
                let circle = new AMap.Circle({
                    center: [item.lng, item.lat],
                    radius: item.r, //签到范围半径
                    borderWeight: 1,
                    strokeOpacity: 0.2,
                    fillOpacity: 0.4,
                });
                circle.setMap(map);
                map.setFitView([circle]);
            });

            map.plugin(["AMap.CircleEditor"], function () {
                const circleEditor = new AMap.CircleEditor(map, circle);
                circleEditor.open();
            });
        });
    }).catch(e => {
        console.log(e);
    });
```

## vscode关闭no-console提示

`eslint.config.js`
```js
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {},
  {
    rules: {
      'no-console': 'off',
    },
  },
)
```

## input file上传了一次文件，第二次上传相同的文件不会触发onchage

```<input ref="fileInput" type="file" accept="image/*" @change="handleFileChange">```

这是因为浏览器默认情况下不会触发相同文件的选择事件。这是为了防止用户在意外情况下重复选择同一个文件。
如果你希望能够再次选择相同的文件并触发change事件，你可以在每次选择文件后，
将文件输入框的值设为一个空字符串，然后再次选择相同的文件。这样可以绕过浏览器的默认限制，从而触发change事件。

例如，在`handleFileChange`方法中，你可以添加以下代码：

```js
handleFileChange(event) {
  // 处理文件逻辑...

  event.target.value = ""; // 清空文件输入框的值
}
```

这样，即使选择了相同的文件，每次都会触发change事件。

## 移动端h5拨打电话

`<head>`里面加上：`<meta name="format-detection" content="telephone=yes"/> `
需要拨打电话的地方：`<a href="tel:400-0000-688">400-0000-688</a>`

## dayjs使用
```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

dayjs('10:00:00', 'HH:mm:ss').format('HH:mm')//10:00
```

https://day.js.org/docs/zh-CN/parse/string-format

## 子组件监听props的变化

```vue
const props = defineProps<{
  value: string
}>()

const relationship = ref(props.value)
```
`props.value`并不是响应式的数据。当父组件中的`relationship`发生变化时，`props.value`并不会自动更新
因此`watch`监听不到变化。

要使子组件能够监听到`props.value`的变化，可以使用`toRef()`函数将`props.value`转换为响应式数据。修改子组件代码如下：
`const relationship = toRef(props, 'value')`

## formData多次添加了相同的键，需要全部查询出来
如果您多次向fileData的value属性中添加了相同的键（在这里是'files'），并且您想要取出这两个文件，您可以使用以下方法：
```js
for (const [key, value] of fileData.value.entries()) {  
    if (key === 'files') {  
        console.log(value); // 这里是文件对象  
    }  
}
```


## 请求接口提示"Content type 'application/octet-stream' not supported"
https://blog.csdn.net/lovezhuer1/article/details/122436791
由错误描述可知，我们这里不能传一个json字符串，而是一个二进制，
这时需要使用 Blob() 构造函数将 json 字符串转化为 Blob 对象（Blob 对象表示一个不可变、原始数据的类文件对象，
它的数据可以按文本或二进制的格式进行读取）放到 formData 中
请求头设置：
```js
headers: {
      'Content-Type': 'multipart/form-data',
    },
const formData = ref(new FormData())
const json = JSON.stringify(values)
  const blob = new Blob([json], {
 	type: 'application/json',
  })
  formData.value.append('feedbackVo', blob)
```

## dayjs计算间隔时间
```js
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

/** 计算时间间隔 */
function calculateTimeInterval(startTime: string, endTime: string) {
  if (!dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid() || !dayjs(endTime, 'YYYY-MM-DD HH:mm:ss', true).isValid())
    return `0分钟`

  const diff = dayjs(endTime).diff(dayjs(startTime))
  const duration = (dayjs as any).duration(diff)
  // 将间隔格式化为小时和分钟
  const hours = Math.floor(duration.asHours())
  const minutes = Math.floor((duration.asMinutes() % 60)) // 取余数得到分钟数
  return `${hours}小时${minutes}分钟`
}
```


## dayjs 判断日期是否为有效格式的日期
```js
import customParseFormat from 'dayjs/plugin/customParseFormat'
// 自定义格式化插件
dayjs.extend(customParseFormat)

dayjs(startTime, 'YYYY-MM-DD HH:mm:ss', true).isValid()
```

## 把文件流转换为url用于img显示
 使用URL.createObjectURL()方法来创建一个指向该Blob对象的URL
 ```js
downloadFile(paramsPm).then((res) => {
  console.log('🚀 ~ file: statistics.vue:120 ~ downloadFile ~ res:', res)
  const url = URL.createObjectURL(res)
  clockInfo.value.clockPmPhoto = url
})
```
## 文件流转base64
```js
 const base64String = btoa(
          new Uint8Array(res)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''),
        )

        // 输出Base64编码
        console.log(base64String)
        // 下面生成的base64拼接可以直接放到<img src="放在这儿直接展示"/>
        formModel.value.files.push({ url: `data:image/jpeg;base64,${base64String}`, id: item.id })
```
## style 使用v-bind绑定响应式变量
```vue
const clockAtColor = ref('')
clockAtColor.value = formModel.value.clockAt === '无' ? '#969799' : '#000'

<style scoped>
:deep(.clockAt .van-field__control){
  color:v-bind(clockAtColor)
}
</style>
```

## 将时间转换为 `刚刚`、`几秒前`、`几分钟前`、`几小时前`、`几天前`、几月前
```js
import dayjs from 'dayjs';

function timeAgo(date, format = null) {
const now = dayjs();
const ago = dayjs.unix(date);

const diff = now.diff(ago, 'second');

if (format) {
return ago.format(format);
}

const units = [
[60, '秒', 1],
[60, '分钟', 60],
[24, '小时', 3600],
[7, '天', 86400],
[30.44, '个月', 2592000], // Approximation for month length
[12, '年', 31104000] // Approximation for year length
];

for (const [interval, label, factor] of units) {
if (diff < interval) {
return Math.round(diff / factor) + label + '前';
}
}

// If the difference is greater than a year, return formatted date
return ago.format('YYYY-MM-DD');
} console.log(timeAgo(<your_timestamp>));这样是不是更优雅一些
```
## 把src/icons/svg下的所有图片名称做成一个数组
```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

let svgNameList = []
function getSvgNameList() {
/** 把src/icons/svg下的所有图片名称做成一个数组 */
  svgNameList = requireAll(req).map(item => item.default.id?.slice(5))
}
getSvgNameList()
export default svgNameList
``` 

## vscode返回上一次编辑的地方
alt+←

## 解码数组内每个对象的值

// 遍历数组并解码每个对象的属性值
const decodedArr = arr.map(item => {
  const decodedItem = {};
  for (let key in item) {
    if (typeof item[key] === 'string') {
      decodedItem[key] = decodeURIComponent(item[key]);
    } else {
      // 如果不是字符串类型，则直接复制原值
      decodedItem[key] = item[key];
    }
  }
  return decodedItem;
});

console.log(decodedArr);

## 合并两个数组
```js
function mapDataIndices(sourceArray, templateArray) {
  return templateArray.map((item,index) => ({
    ...item,
    dataIndex: sourceArray[index].data
  }));
}

// 使用函数生成新数组
const newArray = mapDataIndices(sourceArray, templateArray);

console.log(newArray);
```
## fullcalendar使用

### 安装

```sh
pnpm add 
@fullcalendar/vue3 
@fullcalendar/core 
@fullcalendar/daygrid 
@fullcalendar/interaction
```