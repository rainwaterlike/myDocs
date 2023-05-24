## 使用扩展运算符...编译报错
因为babel配置不支持该语法。

在项目根目录下创建一个名为.babelre的文件，并在其中添加以下内容:
```js
{
    "presets":[
        "@babel/preset-env",
        "@vue/cli-plugin-babel/preset"
    ],
    "plugins": ["@babel/plugin-proposal-object-rest-spread"]
}
```
这将使用 '@babel/plugin-proposal-object-rest-spread' 插件来支持扩展运算符。请确保您已经安装了该插件，您可以通过以下命令进行安装:

```shell
npm install--save-dev @babel/plugin-proposal-object-rest-spreadnpm
```
安装后重新运行工程

如果是第三方库的props不支持扩展运算符，可以尝试以下写法
```vue
<template>
  <my-component v-bind="propsObject"></my-component>
</template>

<script>
export default {
  data() {
    return {
      propsObject: {
        prop1: 'value1',
        prop2: 'value2',
        // ...
      }
    }
  }
}
</script>
```

## 父子组件v-model通讯
父组件
```vue
<template>
  <MyInput v-model="inputVal"></MyInput>
</template>

<script lang="ts" setup>
  import MyInput from './MyInput.vue';
</script>
```
子组件

这里的defineProps可以是任意名称，defineEmits是固定名称 `update:modelValue`，不然数据会回传不到父组件
```vue
<template>
    {{ `子组件：${value}` }}
    <input type="text" v-model="value" @input="change">
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

const change = (e: Event) => {
    emit('update:modelValue', `${(e.target as HTMLInputElement).value}`)
}
</script>

```