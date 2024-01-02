// @see: https://stylelint.io

module.exports = {
  root: true,
  // 继承某些已有的规则
  extends: [
    "stylelint-config-standard", // 提供了一般的 CSS 样式规范\包含了常见的规则，例如缩进、空格、颜色值等。
    "stylelint-config-standard-scss", // 扩展了 "stylelint-config-standard"，提供了对 SCSS 的支持。 确保在使用SCSS时也保持一致的代码风格。
    "stylelint-config-html/vue", //针对 HTML 和 Vue 文件的样式规范。 配置用于HTML和Vue文件的规则，以确保这些文件中的样式也符合规范。
    "stylelint-config-recommended-vue/scss" //  扩展了 "stylelint-config-html/vue"，并提供了在.vue文件中对 SCSS 的支持。 确保在Vue组件和SCSS文件中都遵循了推荐的最佳实践。
    // "stylelint-config-recess-order" // 配置 stylelint css 属性书写顺序插件, 通过强制规定属性声明的顺序，提高了代码的可读性和一致性。
  ],
  overrides: [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "function-url-quotes": "always", // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    "rule-empty-line-before": "never", // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行)"
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
    "scss/at-import-partial-extension": null, // 解决不能使用 @import 引入 scss 文件
    "property-no-unknown": null, // 禁止未知的属性
    "no-empty-source": null, // 禁止空源码
    "selector-class-pattern": null, // 强制选择器类名的格式
    "value-no-vendor-prefix": null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    "no-descending-specificity": null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    "value-keyword-case": null, // 解决在 scss 中使用 v-bind 大写单词报错   设置为 "lower"，表示强制使用小写。
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"]
      }
    ]
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"]
};
