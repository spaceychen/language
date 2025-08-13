import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import pkg from './package.json';
const { license, author,repository } = pkg;
import pluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  base: '/language/',
  root: path.join(__dirname, 'docs'),
  title: 'language',
  icon: '/coding.png',
  logo: "/coding.png",
  head: [],
  markdown: {
    defaultWrapCode: true,
    showLineNumbers: true,
  },
  route: {
    // These files will be excluded from the routing (support glob pattern)
    // exclude: [],
    // include: ['docs/**/*.md'],
    cleanUrls: true,
  },
  // 构建配置项
  builderConfig: {
    resolve: {
      alias: {
        "@js":"./codes/js",
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
        content: `${repository.url}`,
      },
    ],
    lastUpdated: true,
  },
  plugins: [pluginMermaid()],
});
