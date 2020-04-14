import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Tab from '~/components/common/Tab'
import { IconName } from '~/constants/icon'

const tabList: Array<{ icon: IconName; href: string; text: string }> = [
  { icon: 'user', href: '/settings/profile', text: 'プロフィール' },
  { icon: 'link', href: '/settings/service', text: 'サービス連携' },
  { icon: 'mute', href: '/settings/mute', text: 'ミュート' },
  { icon: 'bell', href: '/settings/notification', text: '通知' }
]

type Props = {
  className?: string
}

const Settings: React.FC<Props> = ({ className }) => {
  const { pathname } = useRouter()

  return (
    <Wrapper className={className}>
      {tabList.map(({ icon, href, text }, index) => (
        <Link key={index} href={href}>
          <a>
            <StyledTab icon={icon} active={pathname === href}>
              {text}
            </StyledTab>
          </a>
        </Link>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 220px;
  background-color: ${({ theme }) => theme.color.darkWhite};
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }
`

const StyledTab = styled(Tab)`
  margin-bottom: 8px;
`

export default Settings
