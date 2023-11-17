const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  syntaxHighlighting: true,
  defaultShowCopyCode: true,
})

module.exports = withNextra()
