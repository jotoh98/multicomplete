import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export type UseMultiCompleteOptions<T, TElement> = {
  values: T[]
  options: T[]
  getKey: (v: T) => string
  onChangeValues: (value: T[]) => void
  renderItem: (v: T) => string
  id: string
  onChange?: (e: React.ChangeEvent<TElement>) => void
  onClick?: (e: React.MouseEvent<TElement>) => void
}

type HtmlElementWithValue = HTMLElement & { value: string }

export const useMultiComplete = <TValue, TElement extends HtmlElementWithValue>(
  props: UseMultiCompleteOptions<TValue, TElement>
) => {
  const {
    values,
    getKey,
    onChangeValues,
    options: allOptions,
    renderItem,
    id: htmlId,
    onChange,
    onClick,
  } = props
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<TElement>(null)
  const [activeValueIndex, setActiveValueIndex] = useState(-1)
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1)
  const [query, setQuery] = useState('')

  const valueKeys = useMemo(() => values.map(getKey), [values, getKey])

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        wrapperRef.current !== e.currentTarget &&
        !wrapperRef.current?.contains(e.target as Node)
      ) {
        setIsExpanded(false)
        setQuery('')
      }
      setActiveOptionIndex(-1)
      setActiveValueIndex(-1)
    }

    window.addEventListener('click', listener)

    return () => window.removeEventListener('click', listener)
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
      const filtered = values.filter((v) => getKey(v) !== getKey(item))
      onChangeValues(filtered)
    },
    [values, onChangeValues, getKey]
  )

  const onAdd = useCallback(
    (item: TValue) => {
      const filtered = values.filter((v) => getKey(v) !== getKey(item))
      onChangeValues([...filtered, item])
    },
    [values, onChangeValues, getKey]
  )

  const optionsWithoutValues = allOptions.filter(
    (o) => !valueKeys.includes(getKey(o))
  )

  const filteredOptions = !query
    ? optionsWithoutValues
    : optionsWithoutValues.filter((o) =>
        renderItem(o).toLowerCase().includes(query.toLowerCase())
      )

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

  const [isExpanded, setIsExpanded] = useState(false)

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
        if (!isExpanded) {
          setIsExpanded(true)
        } else {
          nextOptionActive()
        }
        break
      case 'ArrowUp':
        if (!isExpanded) {
          setIsExpanded(true)
        } else {
          previousOptionActive()
        }
        break
      case 'Enter':
      case 'Space':
        if (activeOptionIndex > -1 && isExpanded) {
          onAdd(filteredOptions[activeOptionIndex])
          setIsExpanded(false)
          setQuery('')
          setActiveOptionIndex(-1)
        }
        break
      case 'Escape':
        if (isExpanded) {
          e.preventDefault()
          e.stopPropagation()
        }
        setIsExpanded(false)
        break
      case 'Home':
        if (isExpanded) {
          e.preventDefault()
          e.stopPropagation()
        }
        setActiveOptionIndex(0)
        break
      case 'End':
        if (isExpanded) {
          e.preventDefault()
          e.stopPropagation()
        }
        setActiveOptionIndex(filteredOptions.length - 1)
        break
    }
  }

  const onClickOnWrapper = () => {
    setActiveValueIndex(-1)
    setIsExpanded((v) => !v)
    inputRef.current?.focus()
  }

  const getWrapperProps = () => ({
    ref: wrapperRef,
    onKeyDown,
    onClick: onClickOnWrapper,
  })

  const isValueActive = (value: TValue) => values[activeValueIndex] === value
  const isOptionActive = (index: number) => activeOptionIndex === index

  const getDeleteButtonProps = (value: TValue) => ({
    type: 'button' as const,
    tabIndex: -1,
    onClick: () => onDelete(value),
  })

  const popoverId = `${htmlId}-combobox`

  const getInputProps = () => ({
    value: query,
    ref: inputRef,
    role: 'combobox',
    autoComplete: 'none',
    autoCapitalize: 'none',
    spellCheck: false,
    'aria-expanded': isExpanded,
    'aria-autocomplete': 'list' as const,
    'aria-controls': popoverId,
    type: 'text',
    'aria-activedescendant':
      activeOptionIndex >= 0 ? getOptionId(activeOptionIndex) : undefined,
    onClick: (e: React.MouseEvent<TElement>) => {
      setActiveValueIndex(-1)
      onClick?.(e)
    },
    onChange: (e: React.ChangeEvent<TElement>) => {
      if (e.target.value.length > 0) {
        setIsExpanded(true)
      }
      setActiveOptionIndex(-1)
      setQuery(e.target.value)
      return onChange?.(e)
    },
  })

  const getPopoverButtonProps = () => ({
    tabIndex: -1,
    type: 'button' as const,
    'aria-controls': popoverId,
    'aria-expanded': isExpanded,
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
  })
  return {
    options: filteredOptions,
    isExpanded: isExpanded,
    getWrapperProps,
    isValueActive,
    isOptionActive,
    getDeleteButtonProps,
    getInputProps,
    getPopoverButtonProps,
    getPopoverProps,
    getOptionProps,
  }
}
