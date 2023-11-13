import {
  act,
  assertListboxExpanded,
  assertOptionActive,
  assertValueActive,
  getOptionElement,
  OPTIONS,
  render,
  screen,
  userEvent,
  within,
} from './utils.ts'
import { MultiComplete } from './MultiComplete.tsx'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/react'

const renderMultiComplete = (values = OPTIONS.slice(0, 3)) => {
  const changeSpy = vi.fn()
  render(
    <MultiComplete
      values={values}
      onChange={changeSpy}
      isEqual={(a, b) => a.value === b.value}
      options={OPTIONS}
      id="frameworks"
      filterValues
      queryOptionFilter={(option, query) =>
        option.value.toLowerCase().includes(query.toLowerCase())
      }
    />
  )
  return changeSpy
}

describe('multi complete component', () => {
  describe('initial state', () => {
    it('should render chosen values on init', () => {
      renderMultiComplete()

      for (const option of OPTIONS.slice(0, 3)) {
        expect(screen.getByTestId(option.value)).toHaveTextContent(option.label)
        expect(
          within(screen.getByTestId(option.value)).getByRole('button')
        ).toBeVisible()
      }
    })
    it('should not display popover initially', () => {
      renderMultiComplete()

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe(
        'false'
      )
    })
  })

  describe('should open popover', () => {
    beforeEach(() => {
      renderMultiComplete()
    })

    afterEach(() => {
      assertListboxExpanded()
      vi.resetAllMocks()
    })

    it('when input is focused', () => {
      act(() => screen.getByRole('combobox').click())
    })

    it('when popover button is clicked', () => {
      act(() => screen.getByRole('button', { name: 'Open Popover' }).click())
    })

    it('when arrow down is pressed in wrapper', () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
    })

    it('when arrow up is pressed in wrapper', () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' })
      )
    })
  })

  describe('should close popover', () => {
    beforeEach(() => {
      renderMultiComplete()
      act(() => screen.getByRole('combobox').click())
    })

    afterEach(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe(
        'false'
      )
    })

    it('when pressing escape', () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })
      )
    })

    it('when clicking outside', () => {
      act(() => fireEvent.click(document.body))
    })
  })

  describe('should remove value', () => {
    it('when delete button is clicked', () => {
      const changeSpy = renderMultiComplete()

      act(() =>
        screen.getByTestId(OPTIONS[0].value).querySelector('button')!.click()
      )
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS.slice(1, 3))
    })
    it('when backspace is clicked in empty input', () => {
      const changeSpy = renderMultiComplete()

      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' })
      )
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS.slice(0, 2))
    })
    it('when active value is deleted with backspace', () => {
      const changeSpy = renderMultiComplete()

      act(() =>
        fireEvent.keyDown(screen.getByTestId('wrapper'), { key: 'ArrowLeft' })
      )
      act(() =>
        fireEvent.keyDown(screen.getByTestId('wrapper'), { key: 'ArrowLeft' })
      )
      act(() =>
        fireEvent.keyDown(screen.getByTestId('wrapper'), { key: 'Backspace' })
      )
      expect(changeSpy).toHaveBeenCalledWith([OPTIONS[0], OPTIONS[2]])
    })
  })

  describe('should set active option', () => {
    const mocked = vi.mocked(Element.prototype.scrollIntoView)

    beforeEach(async () => {
      renderMultiComplete()

      act(() => screen.getByRole('combobox').click())
      await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible())
      vi.resetAllMocks()
      mocked.mockReset()
    })

    it('when arrow down key is pressed', async () => {
      await act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      assertOptionActive(0)

      await act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      assertOptionActive(1)

      expect(mocked).toHaveBeenCalledTimes(2)
    })

    it('when arrow up key is pressed', async () => {
      await act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' })
      )
      assertOptionActive(6)

      await act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' })
      )
      assertOptionActive(5)
      expect(mocked).toHaveBeenCalledTimes(2)
    })

    it('when option is hovered', async () => {
      await act(() => userEvent.hover(getOptionElement(3)))
      assertOptionActive(3)

      await act(() => userEvent.hover(getOptionElement(5)))
      assertOptionActive(5)
      expect(mocked).toHaveBeenCalledTimes(2)
    })

    it('looping forwards/arrow down', () => {
      for (let i = 0; i <= 6; i++) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
        )
        assertOptionActive(i)
      }
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      assertOptionActive(0)
      expect(mocked).toHaveBeenCalledTimes(8)
    })

    it('looping backwards/arrow up', () => {
      for (let i = 6; i >= 0; i--) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' })
        )
        assertOptionActive(i)
      }
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' })
      )
      assertOptionActive(6)
    })

    it('pressing home and end to jump to the end', async () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      assertOptionActive(1)
      act(() => fireEvent.keyDown(screen.getByRole('combobox'), { key: 'End' }))
      assertOptionActive(6)
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Home' })
      )
      assertOptionActive(0)
    })
  })

  describe('should add value', () => {
    let changeSpy: typeof vi.fn

    beforeEach(async () => {
      changeSpy = renderMultiComplete()

      act(() => screen.getByRole('combobox').click())
      await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible())
    })

    it('when option is clicked', async () => {
      await act(() => userEvent.click(getOptionElement(0)))
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS.slice(0, 4))
    })

    it('when enter is pressed on active option', () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      )
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })
      )
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS.slice(0, 4))
    })
  })

  describe('should set active value', () => {
    beforeEach(() => {
      renderMultiComplete()
    })

    it('when arrow left is pressed', () => {
      for (let i = 2; i >= 0; i--) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowLeft' })
        )
        assertValueActive(i)
      }

      for (let i = 2; i >= 0; i--) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowLeft' })
        )
        assertValueActive(0) // first value is active, focus stuck there
      }
    })

    it('when arrow right is pressed', () => {
      for (let i = 2; i >= 0; i--) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowLeft' })
        )
        assertValueActive(i)
      }

      for (let i = 1; i < 3; i++) {
        act(() =>
          fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowRight' })
        )
        assertValueActive(i)
      }
    })

    it('when arrow right is pressed on last value go to input', () => {
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowLeft' })
      )
      assertValueActive(2)
      act(() =>
        fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowRight' })
      )
      // no value is active
      expect(
        screen
          .queryByTestId('wrapper')!
          .querySelectorAll('[data-active="true"]')
      ).toHaveLength(0)
    })
  })

  describe('should filter values', () => {
    beforeEach(async () => {
      renderMultiComplete([])

      act(() => screen.getByRole('combobox').click())
      await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible())
    })

    it('when typing in input', async () => {
      await act(() => userEvent.type(screen.getByRole('combobox'), 'vue'))
      assertListboxExpanded()
      expect(screen.getAllByRole('option')).toHaveLength(1)
      expect(screen.getAllByRole('option')[0]).toHaveTextContent('Vue')
    })

    it('when matching multiple', async () => {
      await act(() => userEvent.type(screen.getByRole('combobox'), 'react'))
      assertListboxExpanded()
      expect(screen.getAllByRole('option')).toHaveLength(2)
      expect(screen.getAllByRole('option')[0]).toHaveTextContent('React')
      expect(screen.getAllByRole('option')[1]).toHaveTextContent('Preact')
    })

    it('when typing in input with case sensitivity', async () => {
      await act(() => userEvent.type(screen.getByRole('combobox'), 'VUE'))
      assertListboxExpanded()
      expect(screen.getAllByRole('option')).toHaveLength(1)
      expect(screen.getAllByRole('option')[0]).toHaveTextContent('Vue')
    })

    it('when typing something not in the options', async () => {
      await act(() => userEvent.type(screen.getByRole('combobox'), 'Tiramisu'))
      assertListboxExpanded()
      expect(screen.queryByRole('option')).not.toBeInTheDocument()
    })
  })

  it('should focus input when clicking on wrapper', () => {
    renderMultiComplete()

    act(() => screen.getByTestId('wrapper').click())
    expect(screen.getByRole('combobox')).toHaveFocus()
  })
})
