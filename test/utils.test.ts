/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEqualityFunction, createSubstringFilter } from '../src'

describe('createSubstringFilter test', () => {
  type TestCase<T = any> = {
    name: string
    toString: (option: T) => string
    option: T
    query: string
    expected: boolean
  }

  const testCases = [
    {
      name: 'should return true if the query is a substring of the option',
      toString: (option: string) => option,
      option: 'foo',
      query: 'f',
      expected: true,
    },
    {
      name: 'should return true if the query is a case insensitive substring',
      toString: (option: string) => option,
      option: 'foo',
      query: 'F',
      expected: true,
    },
    {
      name: 'should return false if the query is not a substring of the option',
      toString: (option: string) => option,
      option: 'foo',
      query: 'b',
      expected: false,
    },
    {
      name: 'should return true if the query is a substring of the options value',
      toString: (option: { value: string }) => option.value,
      option: { value: 'foo' },
      query: 'f',
      expected: true,
    },
    {
      name: 'should return false if the query is not a substring of the options value',
      toString: (option: { value: string }) => option.value,
      option: { value: 'foo' },
      query: 'b',
      expected: false,
    },
  ] satisfies TestCase[]

  for (const testCase of testCases) {
    it(testCase.name, () => {
      const actual = createSubstringFilter(testCase.toString as never)(
        testCase.option,
        testCase.query
      )
      expect(actual).toBe(testCase.expected)
    })
  }
})

describe('createEqualityFunction tests', () => {
  type TestCase<T = any, R = any> = {
    name: string
    mapper: (option: T) => R
    a: T
    b: T
    expected: boolean
  }

  const testCases = [
    {
      name: 'should return true if the mapper returns the same value for both options',
      mapper: (option: string) => option,
      a: 'foo',
      b: 'foo',
      expected: true,
    },
    {
      name: 'should return false if the mapper returns different values for both options',
      mapper: (option: string) => option,
      a: 'foo',
      b: 'bar',
      expected: false,
    },
    {
      name: 'should return true if the mapper returns the same value for both options',
      mapper: (option: { value: string }) => option.value,
      a: { value: 'foo' },
      b: { value: 'foo' },
      expected: true,
    },
    {
      name: 'should return false if the mapper returns different values for both options',
      mapper: (option: { value: string }) => option.value,
      a: { value: 'foo' },
      b: { value: 'bar' },
      expected: false,
    },
  ] satisfies TestCase[]

  for (const testCase of testCases) {
    it(testCase.name, () => {
      const actual = createEqualityFunction(testCase.mapper as never)(
        testCase.a,
        testCase.b
      )
      expect(actual).toBe(testCase.expected)
    })
  }
})
