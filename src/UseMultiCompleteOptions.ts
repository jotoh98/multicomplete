export type UseMultiCompleteOptions<TValue> = {
  values: TValue[]
  options: TValue[]
  onChange: (value: TValue[]) => void
  id: string
  isEqual?: (a: TValue, b: TValue) => boolean
  queryOptionFilter?: (option: TValue, query: string) => boolean
  filterValues?: boolean
  isOpen?: boolean
  onOpenChange?: (value: boolean) => void
}
