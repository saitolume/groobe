import React, { useState, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '~/components/common/Button'
import Icon from '~/components/common/Icon'
import Thumbnail from '~/components/common/Thumbnail'
import NavigationPopper from '~/components/Header/NavigationPopper'
import SearchBox from '~/components/Header/SearchBox'
import { CurrentUser } from '~/domains/user'

type Props = {
  currentUser?: CurrentUser
}

const Header: React.FC<Props> = ({ currentUser }) => {
  const [isPopperDisplayed, setIsPopperDisplayed] = useState(false)
  const userThumbnailRef = useRef<HTMLDivElement>(null)

  const closeNavigationPopper = (event?: MouseEvent) => {
    const isUserThumbnailClicked = userThumbnailRef.current?.contains(event?.target as Node)
    if (event && isUserThumbnailClicked) {
      event.preventDefault()
      event.stopPropagation()
    }
    setIsPopperDisplayed(false)
  }

  return (
    <Wrapper>
      <Link href="/">
        <Title>groobe</Title>
      </Link>
      <PlaylistSearchBox />
      <Navigation>
        {currentUser && (
          <>
            <SubmitButton color="gray" flat>
              <Icon name="upload" />
              <SubmitButtonText>プレイリストを投稿</SubmitButtonText>
            </SubmitButton>
            <UserThumbnail
              ref={userThumbnailRef}
              src={currentUser.imageUrl}
              onClick={() => setIsPopperDisplayed(!isPopperDisplayed)}
              circle
              hoverable
            />
            {isPopperDisplayed && (
              <NavigationPopper currentUser={currentUser} close={closeNavigationPopper} />
            )}
          </>
        )}
      </Navigation>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.color.white};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  position: relative;
`

const Title = styled.a`
  cursor: pointer;
  display: flex;
  margin: auto 0;
  font-size: 28px;
  font-weight: bold;
`

const PlaylistSearchBox = styled(SearchBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Navigation = styled.nav`
  display: flex;
`

const SubmitButton = styled(Button)`
  height: 40px;
  border-radius: 25px;
  box-sizing: border-box;
  display: flex;
  margin: auto 12px auto 0;
  padding: 0 18px;
  &:last-child {
    margin: auto 0;
  }
`

const SubmitButtonText = styled.span`
  margin: auto 0 auto 4px;
`

const UserThumbnail = styled(Thumbnail)`
  width: 40px;
  height: 40px;
  margin: auto 0;
`

export default Header
