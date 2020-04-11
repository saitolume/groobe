import React from 'react'
import styled from 'styled-components'
import Header from '~/components/Header'
import { CurrentUser } from '~/domains/user'

type Props = {
  className?: string
  currentUser?: CurrentUser
}

const Layout: React.FC<Props> = ({ children, className, currentUser }) => (
  <Wrapper>
    <Header currentUser={currentUser} />
    <Main className={className}>{children}</Main>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 64px); /* header height */
`

export default Layout
