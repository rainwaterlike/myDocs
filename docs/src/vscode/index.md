## vscode返回上一次编辑的地方
alt+←

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