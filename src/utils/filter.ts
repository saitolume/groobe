// TODO: Partial<T> の中で undeined な プロパティのみを取り除いた型を作る
export const filterNonUndefinedParams = <T extends object>(params: Partial<T>): object => {
  return (Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => (value !== undefined ? [key, value] : undefined))
      .filter((value): value is [string, string] => value !== undefined)
  ) as unknown) as { [K in keyof T]: Required<T[K]> } // これは嘘
}
