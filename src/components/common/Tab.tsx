import React from 'react'
import styled from 'styled-components'
import Icon from '~/components/common/Icon'
import { IconName } from '~/constants/icon'

type Props = {
  className?: string
  active?: boolean
  icon: IconName
}

const Tab: React.FC<Props> = ({ active = false, className, children, icon }) => (
  <Wrapper className={className} active={active}>
    <TabIcon name={icon} />
    <TabText>{children}</TabText>
  </Wrapper>
)

const Wrapper = styled.div<{ active: boolean }>`
  height: 48px;
  background-color: ${({ theme }) => theme.color.white};
  border-left: 4px solid ${({ active, theme }) => (active ? theme.color.black : theme.color.white)};
  display: flex;
  transition: border-left 0.1s;
  &:hover {
    border-left: 4px solid ${({ theme }) => theme.color.black};
  }
`

const TabIcon = styled(Icon)`
  margin: auto 12px;
`

const TabText = styled.div`
  margin: auto 0;
`

export default Tab
