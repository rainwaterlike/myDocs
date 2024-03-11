# 学习ts

[文档](https://24kcs.github.io/vue3_study/chapter2/1_type.html#类型断言)

[视频](https://www.zhihu.com/education/video-course/1487063043724566528)

## ts提示不存在某个属性
使用类型断言
```ts
export const useToggleShowBack = (to:RouteLocationNormalized) => {
    const store = useStore()
    //第一种写法
    store.isShowBack = (to.matched[0].props.default as any).showBack
    //第二种写法
    tore.isShowBack = (<any>to.matched[0].props.default).showBack
}
```