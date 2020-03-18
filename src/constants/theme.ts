export const theme = {
  color: {
    black: '#222',
    white: '#fff',
    gray: '#eee'
  }
} as const

type AppTheme = typeof theme

export type Color = keyof AppTheme['color']

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends AppTheme {}
}
