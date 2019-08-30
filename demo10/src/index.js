/**
 * Tree Shaking (仅支持 ES Module 模块的引入)
 * ES Module 底层为静态引入方式
 * Common Js 为动态引入方式
 * - 简单来说, 只打包 index.js 中引入部分(模块导出), 减小 main.js 体积, 达到优化效果
 * - 使用 Tree Shaking 可在 package.json 文件中配置 sideEffects
 *   例: "sideEffects": [ "*.css" ]
 *   此配置代表:如果在 index.js 有 css 文件被引入, Tree Shaking 会忽略此文件
 */

import { add } from './main';

add(1, 1);