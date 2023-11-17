'use client'

import { MultiCompleteBasic } from '@/components/MultiCompleteBasic'
import { useEffect, useState } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])
  const [values, setValues] = useState<typeof options>([])

  if (!isVisible) return null
  return (
    <MultiCompleteBasic
      id="basic-example"
      values={values}
      onChange={setValues}
      options={options}
    />
  )
}
