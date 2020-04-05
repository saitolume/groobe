import React, { forwardRef } from 'react'
import MDIIcon from '@mdi/react'
import styled, { css } from 'styled-components'
import { icon, IconName } from '~/constants/icon'

type Props = {
  className?: string
  color?: string
  hoverable?: boolean
  name: IconName
  rotate?: number
  size?: number
} & React.HTMLAttributes<HTMLSpanElement>

const Icon = forwardRef<HTMLSpanElement, Props>(
  ({ className, color, name, hoverable = false, rotate = 0, size = 28, ...props }, ref) => (
    <Wrapper className={className} ref={ref} hoverable={hoverable} {...props}>
      <MDIIcon
        style={{ margin: 'auto' }}
        path={icon[name]}
        color={color}
        rotate={rotate}
        size={size / 28}
      />
    </Wrapper>
  )
)

const Wrapper = styled.span<{ hoverable: boolean }>`
  border-radius: 50%;
  display: flex;
  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      padding: 6px;
      transition: background-color 0.15s;
    `}
`

export default Icon
