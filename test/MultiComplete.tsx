import { useMultiComplete, UseMultiCompleteOptions } from '../src'
import { useState } from 'react'

type Item = { label: string; value: string }
export const MultiComplete = (props: UseMultiCompleteOptions<Item>) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    options,
    getWrapperProps,
    activeValueIndex,
    activeOptionIndex,
    getDeleteButtonProps,
    getInputProps,
    getPopoverButtonProps,
    getPopoverProps,
    getOptionProps,
  } = useMultiComplete({
    ...props,
    isOpen,
    onOpenChange: setIsOpen,
  })

  return (
    <div {...getWrapperProps()} data-testid="wrapper">
      {props.values.map((value, index) => {
        return (
          <span
            key={value.value}
            data-testid={value.value}
            data-active={activeValueIndex === index}
          >
            {value.label}
            <button {...getDeleteButtonProps(value)}>×</button>
          </span>
        )
      })}
      <div>
        <input {...getInputProps()} />
        <button {...getPopoverButtonProps()} aria-label="Open Popover">
          Open
        </button>
      </div>
      {isOpen && (
        <div {...getPopoverProps()} data-testid="popover">
          <ul>
            {options.map((option, optionIndex) => (
              <li
                key={option.value}
                {...getOptionProps(option, optionIndex)}
                data-active={activeOptionIndex === optionIndex}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
