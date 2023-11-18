import React, { useState } from 'react'
import { useMultiComplete } from 'multicomplete'

const options = [
  'Autocomplete',
  'MultiComplete',
  'MultiSelect',
  'MultiCombobox',
  'MultiAutocomplete',
  'MultiMultiComplete',
  'MultiMultiSelect',
  'MultiMultiCombobox',
  'MultiMultiAutocomplete',
  'MultiMultiMultiComplete',
  'MultiMultiMultiSelect',
]

export const Basic = () => {
  const [values, setValues] = useState<typeof options>([])
  const [isOpen, setIsOpen] = useState(false)
  const result = useMultiComplete({
    isOpen,
    onOpenChange: setIsOpen,
    queryOptionFilter: (option, query) =>
      option.toLowerCase().includes(query.toLowerCase()),
    values,
    onChange: setValues,
    options,
    id: 'basic-example',
  })

  return (
    <div {...result.getWrapperProps()}>
      {values.map((value, index) => (
        <span key={value} data-active={result.activeValueIndex === index}>
          {value}
          <button {...result.getDeleteButtonProps(value)}>×</button>
        </span>
      ))}
      <div>
        <input {...result.getInputProps()} placeholder="Search" />
        <button {...result.getPopoverButtonProps()} aria-label="Open Popover">
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {isOpen && result.options.length > 0 && (
        <div {...result.getPopoverProps()}>
          <ul>
            {result.options.map((option, optionIndex) => (
              <li
                data-active={result.activeOptionIndex == optionIndex}
                key={option}
                {...result.getOptionProps(option, optionIndex)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
