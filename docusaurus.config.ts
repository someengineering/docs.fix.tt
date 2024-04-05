import type { Options as StoredDataOptions } from '@1password/docusaurus-plugin-stored-data';
import type { Options as PwaOptions } from '@docusaurus/plugin-pwa';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import path from 'path';
import { themes as prismThemes } from 'prism-react-renderer';
import remarkKroki from 'remark-kroki-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isBuildFast = isDev || !!process.env.BUILD_FAST;
const isProd =
  !isDev && !!process.env.NETLIFY && process.env.CONTEXT !== 'deploy-preview';

const config: Config = {
  title: 'Fix Documentation',
  url: 'https://docs.fix.security',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
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
          src: 'https://docs.fix.security/js/script.js',
          defer: true,
          'data-domain': 'docs.fix.security',
        },
      ]
    : [],
  markdown: {
    mermaid: true,
    preprocessor: ({ fileContent }) => {
      return fileContent
        .replace(
          /(skinparam (stereotype[A-Z]BackgroundColor|Note\w+Color)) #[a-f1-9]{6}\n/g,
          '',
        )
        .replace(/(skinparam Arrow\w*Color) #[a-f1-9]{6}/g, '$1 #111827')
        .replace(
          /(skinparam (ClassBackgroundColor)) #[a-f1-9]{6}/g,
          '$1 #eef7ff',
        )
        .replace(/(skinparam ClassBorderColor) #[a-f1-9]{6}/g, '$1 #3d58d3')
        .replace(
          /(skinparam Class(Attribute)?FontColor) #[a-f1-9]{6}/g,
          '$1 #000000',
        )
        .replace(
          /skinparam ClassFontName \w+/g,
          'skinparam ClassFontName monospace',
        );
    },
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);

      result.frontMatter.pagination_prev = null;
      result.frontMatter.pagination_next = null;

      return result;
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/someengineering/docs.fix.security/edit/main/docs/',
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
            './src/css/docsearch.css',
          ],
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
        },
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
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/android-chrome-192x192.png',
          },
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/android-chrome-512x512.png',
          },
          { tagName: 'meta', name: 'theme-color', content: '#3d58d3' },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#3d58d3',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/apple-touch-icon.png',
          },
        ],
      } satisfies PwaOptions,
    ],
    [
      '@1password/docusaurus-plugin-stored-data',
      {
        data: {
          [`aws-FixOrgList`]: path.resolve(
            __dirname,
            'iam/aws',
            'FixOrgList.json',
          ),
          [`aws-FixCollect`]: path.resolve(
            __dirname,
            'iam/aws',
            'FixCollect.json',
          ),
          // [`gcp-fix_access`]: path.resolve(
          //   __dirname,
          //   'iam/gcp',
          //   'fix_access.json',
          // ),
        },
      } satisfies StoredDataOptions,
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
        {
          label: 'Discord',
          href: 'https://discord.gg/fixsecurity',
          position: 'right',
          className: 'social discord',
          'aria-label': 'Discord',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://some.engineering" target="_blank" rel="noopener noreferrer">Some Engineering Inc</a>.`,
    },
    algolia: {
      appId: 'ONFTY8JVDC',
      apiKey: '8c93b28638bd2d1c73b4fa3f9276ebde',
      indexName: 'fix',
    },
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
