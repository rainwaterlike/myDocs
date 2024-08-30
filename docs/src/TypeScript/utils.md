# 平常用到的工具方法

## 约束对象的key值

例如：使用 `vant` 组件库的 `van-cell` 循环进行列表渲染，需要 `title` 和 `value` 两个属性，就需要把字段的 `key` 和中文标题做一个映射

```JS
const titleMapping: {
  name: '姓名',
}
```

渲染时按照这样进行渲染

```vue
<template>
    <van-cell v-for="item in dataSource" :key="item.title" :title="item.title" :value="item.value" />
</template>
```

所以需要约束 `titleMapping` 的key值，不属于接口返回值类型里的，不允许添加到里面

```ts
export interface ResultModel {
  id?: string
  name?: string
  state?: number
}

type AllowedKeys = keyof ResultModel
/**
 *  标题映射，继承ResultModel并重写所有属性类型为string
 * 1. 把对象的key值约束在这个ResultModel 的key值内
 * 2. 如果输入不存在的key值会明确提示是哪个key值不存在于ResultModel里
 * 3. 这个对象的值不受ResultModel 的约束
 */
export type TitleMapping<T> = {
  [P in keyof T]?: T[P] extends AllowedKeys ? T[P] : string;
}
```

使用：

```ts
import type { ResultModel, TitleMapping } from '@/types/title'

const titleMapping: TitleMapping<ResultModel> = {
  name: '姓名',
  state: '状态',
}

const dataSource = ref()
function getDataSource() {
  const res = await taskDetailApi({ id: statId.value })
  const data = res.data
  dataSource.value = Object.keys(titleMapping).map((key) => {
    return {
      title: titleMapping[key],
      value: data?.[key],
    }
  })
}
```
