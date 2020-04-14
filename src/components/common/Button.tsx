import React from 'react'
import styled from 'styled-components'
import { Color } from '~/constants/theme'

type Props = {
  className?: string
  color?: Color
  dark?: boolean
  flat?: boolean
  loading?: boolean
  round?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({
  children,
  color = 'white',
  dark = false,
  flat = false,
  // loading = false,
  round = false,
  ...props
}) => (
  <StyledButton color={color} dark={dark} flat={flat} round={round} {...props}>
    {/* {loading ? <StyledSpinner color={color} bg="#388e3c" /> : children} */}
    {children}
  </StyledButton>
)

const StyledButton = styled.button<Pick<Props, 'color' | 'dark' | 'flat' | 'round'>>`
  background-color: ${({ theme, color }) => color && theme.color[color]};
  border: ${({ flat }) => (flat ? 'none' : `1px solid #dedede`)};
  border-radius: ${({ round }) => (round ? '25px' : '4px')};
  box-sizing: border-box;
  color: ${({ dark }) => (dark ? '#fff' : '#222')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  transition: filter 0.15s;
  &:hover {
    filter: ${({ disabled }) => (disabled ? '' : 'brightness(0.9)')};
  }
  &:focus {
    outline: none;
  }
`

export default Button
