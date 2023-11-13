'use client'

import React, { useState } from 'react'
import { useMultiComplete, UseMultiCompleteOptions } from '../../src'

export type ComboboxProps<T> = Omit<
  UseMultiCompleteOptions<T>,
  'isOpen' | 'setIsOpen' | 'isEqual' | 'queryOptionFilter'
>

export const MultiCompleteBasic = (props: ComboboxProps<string>) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    options,
    getWrapperProps,
    activeValueIndex,
    getDeleteButtonProps,
    getInputProps,
    getPopoverButtonProps,
    getPopoverProps,
    getOptionProps,
    activeOptionIndex,
  } = useMultiComplete<string, HTMLInputElement>({
    isOpen,
    onOpenChange: setIsOpen,
    queryOptionFilter: (option, query) =>
      option.toLowerCase().includes(query.toLowerCase()),
    ...props,
  })

  return (
    <div
      {...getWrapperProps()}
      className="relative box-border flex w-full flex-wrap items-center gap-1 rounded border-2 border-gray-500 bg-transparent px-2 py-2 focus-within:outline focus-within:outline-blue-400"
    >
      {props.values.map((value, index) => (
        <span
          key={value}
          data-active={activeValueIndex === index}
          className="flex h-10 items-center gap-2 rounded-full bg-gray-100 px-3 data-[active=true]:bg-gray-300"
        >
          {value}
          <button
            {...getDeleteButtonProps(value)}
            className="border-0 px-1 py-0.5"
          >
            ×
          </button>
        </span>
      ))}
      <div className="flex shrink-0 grow basis-[20px]">
        <input
          {...getInputProps()}
          className="h-10 grow bg-transparent focus:outline-0"
          placeholder="Search"
        />
        <button
          {...getPopoverButtonProps()}
          aria-label="Open Popover"
          className="block stroke-2 p-0.5 text-gray-400"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && options.length > 0 && (
        <div
          {...getPopoverProps()}
          className="absolute -left-[2px] -right-[2px] top-full z-10 -mt-px box-border max-h-[200px] overflow-y-auto rounded-b border-2 border-gray-500 bg-white"
        >
          <ul>
            {options.map((option, optionIndex) => (
              <li
                data-active={activeOptionIndex == optionIndex}
                key={option}
                {...getOptionProps(option, optionIndex)}
                className="cursor-pointer px-2 py-2 data-[active=true]:bg-gray-200"
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
