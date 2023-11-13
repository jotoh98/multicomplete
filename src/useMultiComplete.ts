import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { UseMultiCompleteOptions } from './UseMultiCompleteOptions.ts'

const createDefaultQueryOptionFilter =
  <T>() =>
  (option: T, query: string) =>
    String(option).toLowerCase().includes(query.toLowerCase())

type HtmlElementWithValue = HTMLElement & { value: string }

export const useMultiComplete = <
  TValue,
  TElement extends HtmlElementWithValue = HTMLInputElement,
>(
  props: UseMultiCompleteOptions<TValue>
) => {
  const {
    values,
    onChange,
    options: allOptions,
    id: htmlId,
    isEqual = (a, b) => a === b,
    filterValues = true,
    queryOptionFilter = createDefaultQueryOptionFilter<TValue>(),
    isOpen = false,
    onOpenChange,
  } = props
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<TElement>(null)
  const [activeValueIndex, setActiveValueIndex] = useState(-1)
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        wrapperRef.current !== e.currentTarget &&
        !wrapperRef.current?.contains(e.target as Node)
      ) {
        onOpenChange?.(false)
        setQuery('')
      }
      setActiveOptionIndex(-1)
      setActiveValueIndex(-1)
    }

    window.addEventListener('click', listener)

    return () => window.removeEventListener('click', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const previousValueActive = () =>
    setActiveValueIndex((v) => {
      switch (v) {
        case -1:
          return values.length - 1
        case 0:
          return 0
        default:
          return v - 1
      }
    })

  const nextValueActive = () => {
    setActiveValueIndex((v) => (v < 0 || v === values.length - 1 ? -1 : v + 1))
  }

  useLayoutEffect(() => {
    if (activeOptionIndex >= 0)
      popoverRef.current
        ?.querySelectorAll('[role="option"]')
        .item(activeOptionIndex)
        ?.scrollIntoView({
          block: 'nearest',
        })
  }, [activeOptionIndex])

  const onDelete = useCallback(
    (item: TValue) => {
      const filtered = values.filter((v) => !isEqual(v, item))
      onChange(filtered)
    },
    [values, onChange, isEqual]
  )

  const onAdd = useCallback(
    (item: TValue) => {
      const filtered = values.filter((v) => !isEqual(v, item))
      onChange([...filtered, item])
    },
    [values, onChange, isEqual]
  )

  const optionsWithoutValues = filterValues
    ? allOptions.filter((o) => !values.find((v) => isEqual(v, o)))
    : allOptions

  const filteredOptions = !query
    ? optionsWithoutValues
    : optionsWithoutValues.filter((o) => queryOptionFilter(o, query))

  const nextOptionActive = () =>
    setActiveOptionIndex((v) => {
      switch (v) {
        case -1:
        case filteredOptions.length - 1:
          return 0
        default:
          return v + 1
      }
    })

  const previousOptionActive = () => {
    setActiveOptionIndex((v) => {
      return v < 1 ? filteredOptions.length - 1 : v - 1
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (!inputRef.current?.value) {
          wrapperRef.current?.focus()
          previousValueActive()
        }
        break
      case 'ArrowRight':
        if (!inputRef.current?.value) {
          wrapperRef.current?.focus()
          nextValueActive()
        }
        break
      case 'Backspace':
        if (!inputRef.current?.value && values.length) {
          onDelete(
            values[activeValueIndex > 0 ? activeValueIndex : values.length - 1]
          )
          setActiveValueIndex(-1)
        }
        break
      case 'ArrowDown':
        if (!isOpen) {
          onOpenChange?.(true)
        } else {
          nextOptionActive()
        }
        break
      case 'ArrowUp':
        if (!isOpen) {
          onOpenChange?.(true)
        } else {
          previousOptionActive()
        }
        break
      case 'Enter':
      case 'Space':
        if (activeOptionIndex > -1 && isOpen) {
          onAdd(filteredOptions[activeOptionIndex])
          onOpenChange?.(false)
          setQuery('')
          setActiveOptionIndex(-1)
        }
        break
      case 'Escape':
        if (isOpen) {
          e.preventDefault()
          e.stopPropagation()
        }
        onOpenChange?.(false)
        break
      case 'Home':
        if (isOpen) {
          e.preventDefault()
          e.stopPropagation()
        }
        setActiveOptionIndex(0)
        break
      case 'End':
        if (isOpen) {
          e.preventDefault()
          e.stopPropagation()
        }
        setActiveOptionIndex(filteredOptions.length - 1)
        break
    }
  }

  const onClickOnWrapper = () => {
    setActiveValueIndex(-1)
    onOpenChange?.(!isOpen)
    inputRef.current?.focus()
  }

  const getWrapperProps = () => ({
    ref: wrapperRef,
    onKeyDown,
    onClick: onClickOnWrapper,
  })

  const getDeleteButtonProps = (value: TValue) => ({
    type: 'button' as const,
    tabIndex: -1,
    onClick: () => onDelete(value),
  })

  const popoverId = `${htmlId}-combobox`

  const getInputProps = (
    options?: Partial<{
      onChange: (e: React.ChangeEvent<TElement>) => void
      onClick: (e: React.MouseEvent<TElement>) => void
    }>
  ) => ({
    value: query,
    ref: inputRef,
    role: 'combobox',
    autoComplete: 'none',
    autoCapitalize: 'none',
    spellCheck: false,
    'aria-expanded': isOpen,
    'aria-autocomplete': 'list' as const,
    'aria-controls': popoverId,
    type: 'text',
    'aria-activedescendant':
      activeOptionIndex >= 0 ? getOptionId(activeOptionIndex) : undefined,
    onClick: (e: React.MouseEvent<TElement>) => {
      setActiveValueIndex(-1)
      options?.onClick?.(e)
    },
    onChange: (e: React.ChangeEvent<TElement>) => {
      if (e.target.value.length > 0) {
        onOpenChange?.(true)
      }
      setActiveOptionIndex(-1)
      setQuery(e.target.value)
      options?.onChange?.(e)
    },
  })

  const getPopoverButtonProps = () => ({
    tabIndex: -1,
    type: 'button' as const,
    'aria-controls': popoverId,
    'aria-expanded': isOpen,
  })

  const getPopoverProps = () => ({
    role: 'listbox',
    id: popoverId,
    ref: popoverRef,
  })

  const getOptionId = (optionIndex: number) => `${htmlId}-option-${optionIndex}`

  const getOptionProps = (option: TValue, optionIndex: number) => ({
    role: 'option',
    onClick: () => {
      onAdd(option)
    },
    onPointerEnter: () => {
      setActiveOptionIndex(optionIndex)
    },
    id: getOptionId(optionIndex),
    'aria-selected': filterValues
      ? false
      : values.find((v) => isEqual(v, option)) !== undefined,
  })
  return {
    options: filteredOptions,
    getWrapperProps,
    activeOptionIndex,
    activeValueIndex,
    getDeleteButtonProps,
    getInputProps,
    getPopoverButtonProps,
    getPopoverProps,
    getOptionProps,
  }
}
