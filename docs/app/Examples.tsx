'use client'

import { MultiCompleteBasic } from '@/app/MultiCompleteBasic'
import { useState } from 'react'

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

export const Examples = () => {
  const [values, setValues] = useState<typeof options>([])

  return (
    <MultiCompleteBasic
      id="basic-example"
      values={values}
      onChange={setValues}
      options={options}
    />
  )
}
