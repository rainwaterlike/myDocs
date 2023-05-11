# 学习笔记

## map重新组装数据

### 重新给key值

```javascript
couponMemberList = couponMemberList?.map((item: any) => ({
  memberId: item.id,
}));
```

### 只要部分属性

可以使用解构取出想要的属性

```javascript
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

## 数组解构与拼装

### 把开始时间和结束时间拼装为数组

```javascript
const validDateRange = [validBeginTime, validEndTime]
```

### 把时间段数组拆分为开始时间和结束时间

```javascript
const [validBeginTime, validEndTime] = validDateRange ?? []
```

## 对象解构

```javascript
const {
  validDateRange
} = values;
```

### 把拼装好的数据覆盖并合并

```javascript
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

## 循环对象进行列表渲染

```javascript
 const obj = {
   id: 111,
   name: '张三',
   age: 12,
 }; 
 <Descriptions title = "User Info" > 
  {
     Object.keys(obj).map(key =>
       ( <Descriptions.Item 
         label = { obj[key] }
         key = { key }
         > 
         { obj[key] } 
         </Descriptions.Item>
       ))
   } 
</Descriptions>
```
