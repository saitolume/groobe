export const theme = {
  color: {
    black: '#222',
    white: '#fff',
    darkWhite: '#f9f9f9',
    gray: '#777',
    lightGray: '#ddd',
    hoverd: '#efefefef',
    success: '#388e3c'
  }
} as const

type AppTheme = typeof theme

export type Color = keyof AppTheme['color']

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends AppTheme {}
}
