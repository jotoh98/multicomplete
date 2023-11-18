import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { UseMultiCompleteOptions } from './UseMultiCompleteOptions'
import { createSubstringFilter } from './utils.ts'

type HtmlElementWithValue = HTMLElement & { value: string }

const defaultQueryOptionFilter = createSubstringFilter(String)
const defaultIsEqual = (a: unknown, b: unknown) => a === b

const CONSTANT_INPUT_ARIA_PROPS = {
  role: 'combobox' as const,
  autoComplete: 'none' as const,
  autoCapitalize: 'none' as const,
  spellCheck: false,
  'aria-autocomplete': 'list' as const,
  type: 'text' as const,
}

const CONSTANT_BUTTON_ARIA_PROPS = {
  type: 'button' as const,
  tabIndex: -1,
}

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
    isEqual = defaultIsEqual,
    filterValues = true,
    queryOptionFilter = defaultQueryOptionFilter,
    isOpen = false,
    onOpenChange,
  } = props
  const popoverId = `${htmlId}-combobox`
  const getOptionId = useCallback(
    (optionIndex: number) => `${htmlId}-option-${optionIndex}`,
    [htmlId]
  )
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

  useLayoutEffect(() => {
    if (activeOptionIndex >= 0)
      popoverRef.current
        ?.querySelectorAll('[role="option"]')
        .item(activeOptionIndex)
        ?.scrollIntoView({
          block: 'nearest',
        })
  }, [activeOptionIndex])

  const previousValueActive = useCallback(
    () =>
      setActiveValueIndex((v) => {
        switch (v) {
          case -1:
            return values.length - 1
          case 0:
            return 0
          default:
            return v - 1
        }
      }),
    [values.length]
  )

  const nextValueActive = useCallback(() => {
    setActiveValueIndex((v) => (v < 0 || v === values.length - 1 ? -1 : v + 1))
  }, [values.length])

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
      filtered.push(item)
      onChange(filtered)
    },
    [values, onChange, isEqual]
  )

  const filteredOptions = useMemo(() => {
    const optionsWithoutValues = filterValues
      ? allOptions.filter((o) => !values.find((v) => isEqual(v, o)))
      : allOptions
    return !query
      ? optionsWithoutValues
      : optionsWithoutValues.filter((o) => queryOptionFilter(o, query))
  }, [filterValues, allOptions, query, values, isEqual, queryOptionFilter])

  const nextOptionActive = useCallback(
    () =>
      setActiveOptionIndex((v) => {
        switch (v) {
          case -1:
          case filteredOptions.length - 1:
            return 0
          default:
            return v + 1
        }
      }),
    [filteredOptions.length]
  )

  const previousOptionActive = useCallback(() => {
    setActiveOptionIndex((v) => {
      return v < 1 ? filteredOptions.length - 1 : v - 1
    })
  }, [filteredOptions.length])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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
              values[
                activeValueIndex > 0 ? activeValueIndex : values.length - 1
              ]
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
    },
    [
      values,
      isOpen,
      activeOptionIndex,
      onOpenChange,
      filteredOptions,
      previousValueActive,
      nextValueActive,
      onDelete,
      activeValueIndex,
      nextOptionActive,
      previousOptionActive,
      onAdd,
    ]
  )

  const onClickOnWrapper = useCallback(() => {
    setActiveValueIndex(-1)
    onOpenChange?.(!isOpen)
    inputRef.current?.focus()
  }, [isOpen, onOpenChange])

  const getWrapperProps = useCallback(
    () => ({
      ref: wrapperRef,
      onKeyDown,
      onClick: onClickOnWrapper,
    }),
    [onKeyDown, onClickOnWrapper]
  )

  const getDeleteButtonProps = useCallback(
    (value: TValue) => ({
      ...CONSTANT_BUTTON_ARIA_PROPS,
      onClick: () => onDelete(value),
    }),
    [onDelete]
  )

  const getInputProps = useCallback(
    (
      options?: Partial<{
        onChange: (e: React.ChangeEvent<TElement>) => void
        onClick: (e: React.MouseEvent<TElement>) => void
      }>
    ) => ({
      ...CONSTANT_INPUT_ARIA_PROPS,
      ref: inputRef,
      value: query,
      'aria-expanded': isOpen,
      'aria-controls': popoverId,
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
    }),
    [
      query,
      isOpen,
      popoverId,
      activeOptionIndex,
      getOptionId,
      setActiveValueIndex,
      onOpenChange,
      setQuery,
    ]
  )

  const getPopoverButtonProps = useCallback(
    () => ({
      ...CONSTANT_BUTTON_ARIA_PROPS,
      'aria-controls': popoverId,
      'aria-expanded': isOpen,
    }),
    [isOpen, popoverId]
  )

  const getPopoverProps = useCallback(
    () => ({
      role: 'listbox',
      id: popoverId,
      ref: popoverRef,
    }),
    [popoverId]
  )

  const getOptionProps = useCallback(
    (option: TValue, optionIndex: number) => ({
      role: 'option',
      onClick: () => onAdd(option),
      onPointerEnter: () => setActiveOptionIndex(optionIndex),
      id: getOptionId(optionIndex),
      'aria-selected': filterValues
        ? false
        : values.find((v) => isEqual(v, option)) !== undefined,
    }),
    [onAdd, getOptionId, filterValues, values, isEqual, setActiveOptionIndex]
  )

  return useMemo(
    () => ({
      options: filteredOptions,
      activeOptionIndex,
      activeValueIndex,
      getWrapperProps,
      getDeleteButtonProps,
      getInputProps,
      getPopoverButtonProps,
      getPopoverProps,
      getOptionProps,
    }),
    [
      filteredOptions,
      activeOptionIndex,
      activeValueIndex,
      getWrapperProps,
      getDeleteButtonProps,
      getInputProps,
      getPopoverButtonProps,
      getPopoverProps,
      getOptionProps,
    ]
  )
}
