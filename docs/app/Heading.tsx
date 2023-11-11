'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const Heading = () => {

  const [value, setValue] = useState('Auto')

  const [isWrong, setIsWrong] = useState(true)

  const t1Ref = useRef<unknown>(null)

  const createTimeouts = useCallback(() => {
    t1Ref.current = setTimeout(() => {
      setValue('Multi')
      setIsWrong(false)
    }, 2e3)
  }, [])

  useEffect(() => {
    createTimeouts()
    return () => {
      clearTimeout(t1Ref.current as number)
    }
    // eslint-disable-next-line
  }, [])

  const reset = (value = 'Auto') => {
    if (isWrong) return
    setValue(value)
    setIsWrong(true)
    createTimeouts()
  }
  return (
    <div role='heading' aria-level={1}
         className='text-4xl text-center font-semibold active:scale-95 transition duration-200'>
      <span>use</span>
      <span
        onClick={() => reset()}
        className={`font-black ${isWrong ? 'animate-delete underline' : ''} decoration-red-500  decoration-wavy focus:outline-0  cursor-pointer`}
      >{value}</span>
      <span>Complete</span>
    </div>
  )
}