import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: '🈶casual title🈚️',
  description: 'Just playing around',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    author: 'hht',
    docsRepo: 'https://github.com/heteng99/VuepressNote',
    docsBranch: 'master',
    docsDir: 'example',
    lastUpdatedText: '',
    // series 为原 sidebar
    // series: {
    //   '/docs/theme-reco/': [
    //     {
    //       text: 'module one',
    //       children: ['home', 'theme']
    //     },
    //     {
    //       text: 'module two',
    //       children: ['api', 'plugin']
    //     }
    //   ]
    // },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Categories', link: '/categories/reco/1/' },
      { text: 'Tags', link: '/tags/tag1/1/' },
      // { text: 'Docs',
      //   children: [
      //     { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
      //     { text: 'vuepress-theme-reco', link: '/blogs/other/guide' }
      //   ]
      // },
    ],
  }),
  // debug: true,
})
