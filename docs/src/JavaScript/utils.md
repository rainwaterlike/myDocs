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
```
```js
const formData = ref(new FormData())
const json = JSON.stringify(values)
  const blob = new Blob([json], {
 	type: 'application/json',
  })
formData.value.append('feedbackVo', blob)
```


## 把文件流转换为url用于img显示
 使用`URL.createObjectURL()`方法来创建一个指向该Blob对象的URL
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
formModel.value.files.push({ url: `data:image/jpeg;base64,${base64String}`, iitemid })
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
