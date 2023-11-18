<h1 align='center' style='font-weight: 500'>use<b style='font-weight: 900'>Multi</b>Complete</h1>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/multicomplete">
    <img alt="" src="https://badgen.net/npm/v/multicomplete">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=multicomplete">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/multicomplete">
  </a>
  <a aria-label="License" href="https://github.com/jotoh98/multicomplete/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/multicomplete">
  </a>
</p>

<p align='center'>The react hook to create <i>multi selection</i> autocomplete components.</p>

<p align='center'>
<a href='https://multicomplete.vercel.app'>Website</a>
-
<a href='https://multicomplete.vercel.app/docs'>Docs</a>
-
<a href='https://multicomplete.vercel.app/examples'>Examples</a>
</p>

```sh
pnpm add multicomplete
```

## Features

- 📦 Tiny - 1.5kb gzipped
- 🎨 Customizable - style it to your needs
- ♿ Accessible - fully wai-aria compliant
- 📖 Typescript - written in typescript
- 📱 Mobile - works on mobile devices
- 🌙 Themeable - use your own theme
- 📚 Examples - examples for different scenarios

## Usage

Import the hook and use it in your component.

```tsx
import { useMultiComplete } from 'multicomplete'

const handlers = useMultiComplete({
  options,
  values,
  onChange,
  id,
  isOpen,
  onOpenChange,
})
```

## Helpers

There are helpers to make working with complex data values easier.

```tsx
import {
  createSubstringFilter,
  createEqualityFunction
} from 'multicomplete'

type Item = {
  id: string
  name: string
}

const isEqual = createEqualityFunction<Item, string>(v => v.id)
// a.k.a. a.id === b.id

const filter = createSubstringFilter<Item>(v => v.name)
// a.k.a. value.name.toLowerCase().includes(query.toLowerCase())
```