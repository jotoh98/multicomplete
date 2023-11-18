import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

export default {
  logo: (
    <span>
      use<b>Multi</b>Complete
    </span>
  ),
  project: {
    link: 'https://github.com/jotoh98/multicomplete',
  },
  docsRepositoryBase: 'https://github.com/jotoh98/multicomplete/docs',
  footer: {
    text: 'multicomplete',
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – multicomplete',
      }
    }
  },
} satisfies DocsThemeConfig
