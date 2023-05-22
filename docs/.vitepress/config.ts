
import { defineConfig } from 'vitepress'

export default defineConfig({
    head: [
        [
            'meta',
            {
                name: 'viewport',
                content:
                    'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
            },
        ],
        ['meta', { name: 'keywords', content: '学习笔记' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    title: '学习笔记',
    base: '/docs/',
    lang: 'zh-CN',
    // description: '',
    lastUpdated: true,
    cleanUrls: true,
    /* markdown 配置 */
    markdown: {
        lineNumbers: true
    },
    titleTemplate: false,
    themeConfig: {
        /* 右侧大纲配置 */
        outline: {
            level: 'deep', //展开二级目录
            label: '本页目录'
        },
        sidebar: {
            '/': [
                {
                    text: 'TypeScript',
                    link: '/src/TypeScript/index',
                    items: [
                        { text: '类', link: '/src/TypeScript/01_类' },
                        { text: '数组', link: '/src/TypeScript/02_数组' },
                        { text: '枚举', link: '/src/TypeScript/03_枚举' },
                        { text: 'object', link: '/src/TypeScript/04_object' },
                        { text: '联合类型/类型断言', link: '/src/TypeScript/05_联合类型_类型断言' },
                        { text: '类类型', link: '/src/TypeScript/06_类类型' },
                        { text: '接口', link: '/src/TypeScript/07_接口' },
                        { text: '函数类型', link: '/src/TypeScript/08_函数类型' },
                        { text: '继承', link: '/src/TypeScript/09_继承' },
                        { text: '泛型', link: '/src/TypeScript/010_泛型' },
                    ],
                },
                {
                    text: 'css',
                    link: '/src/css/index',
                },
                {
                    text: 'JavaScript',
                    link: '/src/JavaScript/',
                },
                {
                    text: 'vue',
                    link: '/src/vue/index',
                }, 
                {
                    text: 'React',
                    link: '/src/React/',
                },
            ],
        },
        //   nav: [
        //     { text: '首页', link: '/' },
        //     { text: '分类', link: '/tags' },
        //   ],
        darkModeSwitchLabel: '外观',
        returnToTopLabel: '返回顶部',
        lastUpdatedText: '上次更新',
        socialLinks: [{ icon: 'github', link: 'https://github.com/rainwaterlike' }],
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        // footer: {
        //     message: '如有转载或 CV 的请标注本站原文地址',
        //     copyright: 'Copyright © 2019-present maomao'
        // },
    },
})