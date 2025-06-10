import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import pkg from './package.json';
const { license, author, config } = pkg;

export default defineConfig({
  base: '/language/',
  root: path.join(__dirname, 'docs'),
  title: 'LangBook',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  head: [],
  markdown: {
    defaultWrapCode: true,
    showLineNumbers: true,
    checkDeadLinks: true, // 检查死链，发现就抛出错误
  },
  route: {
    // These files will be excluded from the routing (support glob pattern)
    // exclude: [],
    include: ['docs/**/*.md'],
    cleanUrls: true,
  },
  // 构建配置项
  builderConfig: {
    resolve: {
      alias: {
        // '@common': './src/common',
      },
    },
  },
  search: {
    // codeBlocks: true,
  },
  themeConfig: {
    footer: {
      message: `<p>Released under the ${license} License.</p>
      <p>Copyright © 2020-${new Date().getFullYear()}-${author.name}</p>`,
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/spaceychen/language',
      },
    ],
    lastUpdated: true,
  },
});
