module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/html-self-closing': 'off',
    'arrow-parens': 'off', // 箭头函数参数括号
    'comma-dangle': 'off', // 尾逗号
    'curly': 'off', // 当一个块只包含一条语句时，省略花括号
    'space-before-function-paren': 'off', // function 括号前缺少空格
  },
}
