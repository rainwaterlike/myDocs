# React学习文档

## useState

当你真正需要在组件内部改变某个状态的值的时候，你才需要用到useState。 如果你只是想要组件中记住某个变量的值，或许你需要的是useRef或者useMemo，这两个会更安全。

```javascript
  const [age, setAge] = useState()

  useEffect(() => {
    //age发生改变
  }, [age])
```

## useEffect

### 什么时候需要使用？

#### 初始化页面请求数据时

虽然 App 函数进来时会执行一遍，但是 setState 后会把整个 APP 函数重新执行然后渲染，从而导致页面死循环，所以需要在 useEffect 内请求。

错误的示例：

```javascript
import React, {
  useState
} from "react";
import axios from "axios";

const [list, setList] = useState([]);
axios.get("/api/test").then((res) => {
  setList(res.data); //会导致页面陷入死循环
});

export default function APP() {
  return <div > index < /div>;
}
```

正确的示例：

```javascript
import React, {
  useState
} from "react";
import axios from "axios";

const [list, setList] = useState([]);

useEffect(() => {
      axios.get("/api/test").then((res) => {
        setList(res.data);
      }, []); //第二个参数传空数组，意思是不依赖任何属性，只执行一次

      export default function APP() {
        return <div > index < /div>;
      }
```

### 需要监听某个属性时

```javascript
useEffect(() => {
  if (props.api) {
    actionRef?.current?.reload();
  }
}, [props.api]);
```

### 清除定时器或者事件绑定

```javascript
useEffect(() => {
  window.onresize = () => {
    console.log("resize");
  };

  let timer = setIntervar(() => {
    console.log("111");
  }, 1000);

  //组件销毁时清除定时器和绑定的事件
  return () => {
    window.onresize = null;
    clearIntervar(timer);
  };
}, []);
```

### 注意事项

当依赖有更新，但值实际上没有改变时，不会进行渲染。

## useCallBack

useCallback是useMemo的另外一种封装，相当于useMemo(()=>fn, deps)。
如果你的方法需要传递给其他组件作为属性使用，或者需要被作为依赖传入其他hooks中，那么你需要用useCallback封装一下。其他情况下使用，并不能给你带来性能的减少。

防止因为组件重新渲染(例如useState的更新)，导致方法被重新创建，起到缓存作用只有第二个参数变化了，才重新声明一次
和useState一样，原理是使用了JS的闭包来实现的，让变量和方法存在内存中。

```javascript
const change = useCallBack(
  () => {
    setList([...list, text])
  },
  [text, list]
)
```

## useMemo

类似vue的计算属性。
如果你的某个状态是依赖别的状态改变而改变，那么你应该使用useMemo，而不是在useEffect中监听这个状态再setState。例如，请避免下面的写法：

```javascript
const [year, setYear] = useState()
const [age, setAge] = useState()
useEffect(() => {
  setAge(new Date().getFullYear() - year)
}, [year])
```

应该改成：

```javascript
const [year, setYear] = useState()
const age = useMemo(() => {
  return new Date().getFullYear() - year
}, [year])
```
