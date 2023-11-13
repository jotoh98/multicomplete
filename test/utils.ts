import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }

export const OPTIONS = [
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Svelte',
    value: 'svelte',
  },
  {
    label: 'Angular',
    value: 'angular',
  },
  {
    label: 'Ember',
    value: 'ember',
  },
  {
    label: 'Preact',
    value: 'preact',
  },
  {
    label: 'Alpine',
    value: 'alpine',
  },
  {
    label: 'Solid',
    value: 'solid',
  },
  {
    label: 'Rome',
    value: 'rome',
  },
  {
    label: 'Astro',
    value: 'astro',
  },
]
export const assertOptionActive = (index: number) => {
  const activeDescendant = screen
    .getByRole('combobox')
    .getAttribute('aria-activedescendant')
  expect(activeDescendant).toBe(`frameworks-option-${index}`)
  expect(getOptionElement(index)).toHaveAttribute('data-active', 'true')
}

export const assertValueActive = (index: number) =>
  expect(
    screen.getByTestId('wrapper').children[index].getAttribute('data-active')
  ).toBe('true')

export const getOptionElement = (index: number) =>
  screen.getByRole('listbox').querySelector(`#frameworks-option-${index}`)!

export const assertListboxExpanded = () => {
  expect(screen.getByRole('listbox')).toBeVisible()
  expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe(
    'true'
  )
}
