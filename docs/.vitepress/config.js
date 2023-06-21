import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Text Toolkit",
  description: "A collection of plugins for EditorJS",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'lke6qpq4v2yAc5ez9ztO0Rc0FmiTpSuCcyu1AK9x4sM'
      }
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    siteTitle: "Text Toolkit",
    editLink: {
      pattern: 'https://github.com/anthonygacis/psgc-js/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: 'Home', link: '/' }
    ],

    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2021-present Anthony S. Gacis'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Demo', link: '/introduction/demo' },
          { text: 'Installation', link: '/introduction/installation' },
        ]
      },
      {
        text: 'Block Tools',
        items: [
          { text: 'Paragraph', link: '/block-tools/paragraph' },
        ]
      },
      {
        text: 'Inline Tools',
        items: [
          { text: 'Using Geographic Level', link: '/usage/using-geographic-level' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anthonygacis/psgc-js' }
    ]
  }
})
