'use client'

import React, { Dispatch } from 'react'
import { useMultiComplete } from 'multicomplete'

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

export const MultiCompleteBasic = <T, >({
                                          getKey,
                                          onChangeValues,
                                          renderItem,
                                          values,
                                          options: allOptions,
                                          ...props
                                        }: ComboboxProps<T>) => {
  const {
    options,
    isExpanded,
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
    <div {...getWrapperProps()}
         className='w-full bg-transparent border-2 box-border border-gray-500 rounded flex flex-wrap py-2 px-2 items-center focus-within:outline focus-within:outline-blue-400 gap-1 relative'>
      {values.map((value) => {
        const isActive = isValueActive(value)
        return (
          <span
            key={getKey(value)}
            data-active={isActive}
            className='rounded-full bg-gray-100 px-3 h-10 flex items-center gap-2 data-[active=true]:bg-gray-300'
          >
            {renderItem(value)}
            <button {...getDeleteButtonProps(value)} className='border-0 px-1 py-0.5'>×</button>
          </span>
        )
      })}
      <div className='flex grow shrink-0 basis-[20px]'>
        <input {...props} {...getInputProps()} className='grow bg-transparent focus:outline-0 h-10'
               placeholder='Search' />
        <button {...getPopoverButtonProps()} aria-label='Open Popover' className='p-0.5 block text-gray-400 stroke-2'>
          {isExpanded ? (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'
                 className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'
                 className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          )}
        </button>
      </div>
      {isExpanded && options.length > 0 && (
        <div {...getPopoverProps()}
             className='absolute top-full -mt-px bg-white border-2 border-gray-500 -left-[2px] -right-[2px] box-border rounded-b max-h-[200px] overflow-y-auto'>
          <ul>
            {options.map((option, optionIndex) =>
              (
                <li
                  data-active={isOptionActive(optionIndex)}
                  key={getKey(option)}
                  {...getOptionProps(option, optionIndex)}
                  className='px-2 py-2 data-[active=true]:bg-gray-200 cursor-pointer'
                >
                  {renderItem(option)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
