import { useMultiComplete } from '../../src'

type Result = ReturnType<typeof useMultiComplete>
type Options = Parameters<typeof useMultiComplete>[0]

export type ReturnInsights = {
  [K in keyof Result]: string
}

export type OptionInsights = {
  [K in keyof Options]: string
}

type IsOptional<T> = T extends undefined ? true : never

export type OptionsTable = {
  [K in keyof Options]: {
    type: React.ReactNode
    description: React.ReactNode
    section: React.ReactNode
  } & (true extends IsOptional<Options[K]>
    ? { optional: true; default: string }
    : Record<string, never>)
}
