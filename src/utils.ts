export const createSubstringFilter =
  <T>(toString: (option: T) => string) =>
  (option: T, query: string) =>
    toString(option).toLowerCase().includes(query.toLowerCase())

export const createEqualityFunction =
  <T, R>(mapper: (option: T) => R) =>
  (a: T, b: T) =>
    mapper(a) === mapper(b)
