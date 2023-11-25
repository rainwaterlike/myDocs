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
