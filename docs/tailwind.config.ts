import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        return: 'rgb(20 184 166)',
        option: 'rgb(192 132 252)',
        generics: 'rgb(217 119 6)',
        keyword: 'rgb(37 99 235)',
        comment: 'rgb(156 163 175)',
      },
    },
  },
  plugins: [],
}
export default config
