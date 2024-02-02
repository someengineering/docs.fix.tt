import type { Options as PwaOptions } from '@docusaurus/plugin-pwa';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { themes as prismThemes } from 'prism-react-renderer';
import remarkKroki from 'remark-kroki-plugin';
import { EnumChangefreq } from 'sitemap';
import { openGraph } from '@site/src/utils/og';

const isDev = process.env.NODE_ENV === 'development';
const isBuildFast = isDev || !!process.env.BUILD_FAST;
const isProd =
  !isDev && !!process.env.NETLIFY && process.env.CONTEXT !== 'deploy-preview';

const config: Config = {
  title: 'Fix Documentation',
  url: 'https://docs.fix.tt',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  noIndex: !isProd,
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&display=swap',
  ],
  scripts: isProd
    ? [
        {
          src: 'https://docs.fix.tt/js/script.js',
          defer: true,
          'data-domain': 'docs.fix.tt',
        },
      ]
    : [],
  markdown: { mermaid: true },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/someengineering/docs.fix.tt/edit/main/docs/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          remarkPlugins: [
            remarkA11yEmoji,
            ...(!isBuildFast
              ? [
                  [
                    remarkKroki,
                    {
                      krokiBase: 'https://kroki.some.engineering',
                      lang: 'kroki',
                      imgRefDir: '/img/kroki',
                      imgDir: 'static/img/kroki',
                    },
                  ],
                ]
              : []),
          ],
        },
        theme: {
          customCss: [
            './src/css/styles.css',
            './src/css/navbar.css',
            './src/css/footer.css',
            './src/css/docs.css',
            './src/css/tabs.css',
            // './src/css/docsearch.css',
          ],
        },
        sitemap: { changefreq: EnumChangefreq.DAILY, priority: 0.5 },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'pwa',
      {
        debug: !isProd,
        swRegister: false,
        pwaHead: [
          { tagName: 'link', rel: 'manifest', href: 'site.webmanifest' },
          { tagName: 'link', rel: 'icon', href: 'img/icon-192.maskable.png' },
          { tagName: 'link', rel: 'icon', href: 'img/icon-512.maskable.png' },
          { tagName: 'meta', name: 'theme-color', content: '#af62f5' },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000d19',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/apple-icon-180.png',
          },
        ],
      } satisfies PwaOptions,
    ],
  ],
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    image:
      'https://og.some.engineering/api/image?theme=fix&darkMode=0&title=%20&metadata=Fix%20Documentation',
    docs: {
      sidebar: { autoCollapseCategories: true },
      versionPersistence: 'none',
    },
    metadata: [
      {
        name: 'description',
        property: 'og:description',
        content:
          'Fix is an all-in-one dashboard for security engineers. Prioritize top risks by combining user, resource, and configuration data. Plus, get actionable remediation recommendations for your DevOps team.',
      },
      { property: 'og:type', content: 'website' },
    ],
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
    navbar: {
      hideOnScroll: true,
      title: 'Fix Documentation',
      logo: { src: 'img/logo.svg', alt: '', width: 36, height: 36 },
      items: [
        {
          label: 'LinkedIn',
          href: 'https://linkedin.com/company/fix',
          position: 'right',
          className: 'social linkedin',
          'aria-label': 'LinkedIn',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/someengineering',
          position: 'right',
          className: 'social github',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://some.engineering" target="_blank" rel="noopener noreferrer">Some Engineering Inc</a>.`,
    },
    // algolia: {
    //   appId: 'DOGNENB96P',
    //   apiKey: '0e3e7cbce9da253ee147af5fe2f7d91b',
    //   indexName: 'resoto',
    //   contextualSearch: true,
    //   insights: true,
    // },
    prism: {
      theme: prismThemes.github,
    },
    magicComments: [
      {
        className: 'theme-code-block-highlighted-line',
        line: 'highlight-next-line',
        block: { start: 'highlight-start', end: 'highlight-end' },
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
