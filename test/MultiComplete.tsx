import React, { Dispatch } from 'react'
import { useMultiComplete } from '../src'

export type ComboboxProps<T> = {
  values: T[]
  onChangeValues: Dispatch<T[]>
  renderItem: (v: T) => string
  getKey: (v: T) => string
  options: T[]
  id: string
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'role' | 'type' | 'className' | 'id'
>

export const MultiComplete = <T,>({
  getKey,
  onChangeValues,
  renderItem,
  values,
  options: allOptions,
  ...props
}: ComboboxProps<T>) => {
  const {
    options,
    isExpanded: expanded,
    getWrapperProps,
    isValueActive,
    isOptionActive,
    getDeleteButtonProps,
    getInputProps,
    getPopoverButtonProps,
    getPopoverProps,
    getOptionProps,
  } = useMultiComplete<T, HTMLInputElement>({
    values,
    getKey,
    onChangeValues,
    options: allOptions,
    renderItem,
    ...props,
  })

  return (
    <div {...getWrapperProps()} data-testid="wrapper">
      {values.map((value) => {
        const isActive = isValueActive(value)
        return (
          <span
            key={getKey(value)}
            data-testid={getKey(value)}
            data-active={isActive}
          >
            {renderItem(value)}
            <button {...getDeleteButtonProps(value)}>×</button>
          </span>
        )
      })}
      <div>
        <input {...props} {...getInputProps()} />
        <button {...getPopoverButtonProps()} aria-label="Open Popover">
          Open
        </button>
      </div>
      {expanded && (
        <div {...getPopoverProps()} data-testid="popover">
          <ul>
            {options.map((option, optionIndex) => {
              const isActive = isOptionActive(optionIndex)
              return (
                <li
                  data-active={isActive}
                  key={getKey(option)}
                  {...getOptionProps(option, optionIndex)}
                >
                  {renderItem(option)}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
