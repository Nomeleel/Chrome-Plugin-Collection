/// 这里暂时使用Hard Code的方式, 最终会以json文件的形式保存，并且提供入口使其可以替换该文件，实现自定义功能。

export let snippetMap = new Map<string, Array<string> | string>([
  ['text', 'Text']
]);
