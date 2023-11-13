import { renderHook } from '@testing-library/react'
import { useMultiComplete, UseMultiCompleteOptions } from '../src'
import { expect } from 'vitest'

describe('useMultiComplete hook tests', () => {
  it('should have initial a11y props', () => {
    const result = renderHook((p) => useMultiComplete(p), {
      initialProps: {
        values: ['a'],
        onChange: () => {},
        options: ['a', 'b', 'c', 'd'],
        id: 'test-multicomplete',
      } satisfies UseMultiCompleteOptions<string>,
    })

    const currentResult = result.result.current
    expect(currentResult.options).toEqual(['b', 'c', 'd'])
    expect(currentResult.activeOptionIndex).toEqual(-1)
    expect(currentResult.activeValueIndex).toEqual(-1)
    const inputProps = currentResult.getInputProps()
    expect(inputProps).toEqual(
      expect.objectContaining({
        value: '',
        role: 'combobox',
        autoComplete: 'none',
        autoCapitalize: 'none',
        spellCheck: false,
        'aria-expanded': false,
        'aria-autocomplete': 'list' as const,
        'aria-controls': 'test-multicomplete-combobox',
        type: 'text',
        'aria-activedescendant': undefined,
      })
    )

    const popoverButtonProps = currentResult.getPopoverButtonProps()

    expect(popoverButtonProps).toEqual(
      expect.objectContaining({
        tabIndex: -1,
        type: 'button' as const,
        'aria-controls': 'test-multicomplete-combobox',
        'aria-expanded': false,
      })
    )

    const popoverProps = currentResult.getPopoverProps()
    expect(popoverProps).toEqual(
      expect.objectContaining({
        role: 'listbox',
        id: 'test-multicomplete-combobox',
      })
    )

    const optionProps = currentResult.getOptionProps('b', 0)
    expect(optionProps).toEqual(
      expect.objectContaining({
        role: 'option',
        id: 'test-multicomplete-option-0',
      })
    )
  })
})
