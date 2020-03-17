export const theme = {
  colors: {
    black: '#222'
  }
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends AppTheme {}
}
