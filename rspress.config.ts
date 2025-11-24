import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { license, author,repository } from './package.json';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/language/',
  title: 'language',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  markdown: {
    showLineNumbers: true,
  },
  route: {
    // These files will be excluded from the routing (support glob pattern)
    exclude: ['docs/**/_hidden/*.md','**/*.js'],
    include: ['docs/**/*.md'],
    cleanUrls: true,
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: `${repository.github}`,
      },
    ],
    footer: {
      message: `<p>Released under the ${license} License.</p>
      <p>Copyright © 2020-${new Date().getFullYear()} - ${author.name}</p>`,
    },
    lastUpdated: true,
  },
});
