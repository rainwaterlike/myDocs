module.exports = {
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
    titleTemplate:false,
    themeConfig: {
      search: true,
      sidebar: {
        '/': [
          {
            text: 'JavaScript',
            link: '/src/JavaScript/',
            // children: [
            //   { text: '介绍', link: '/components/js' },
            // ],
          },
          {
            text: 'React',
            link: '/src/React/',
            // children: [
            //   { text: '介绍', link: '/components/js' },
            // ],
          },
        ],
      },
      author: 'gxj',
    //   nav: [
    //     { text: '首页', link: '/' },
    //     { text: '分类', link: '/tags' },
    //   ],
    },
    dest: 'public',
  };
  