import React from 'react'
import { NextPage, GetServerSideSessionProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Button from '~/components/common/Button'
import Head from '~/components/common/Head'
import Layout from '~/components/common/Layout'
import Thumbnail from '~/components/common/Thumbnail'
import PlaylistThumbnail from '~/components/PlaylistThumbnail'
import { Playlist, PlaylistService } from '~/domains/playlist'
import { User, UserService } from '~/domains/user'
import { useCurrentUser } from '~/hooks/useCurrentUser'

type Props = {
  user?: User
  playlists: Playlist[]
}

const UsersShow: NextPage<Props> = ({ user, playlists }) => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const isMe = user?.id === currentUser?.id

  const goToProfileEditPage = async () => {
    router.push('/settings/profile')
  }

  return (
    <>
      <Head title={user?.name} />
      <Wrapper currentUser={currentUser}>
        <Hero />
        <UserSection>
          <UserContainer>
            <UserThumbnail src={user?.imageUrl} circle />
            <UserInfo>
              <FlexBox>
                <UserName>{user?.name}</UserName>
                {isMe ? (
                  <ActionButton onClick={goToProfileEditPage}>プロフィールを編集</ActionButton>
                ) : (
                  <ActionButton>フォロー</ActionButton>
                )}
              </FlexBox>
              <Biography>{user?.biography}</Biography>
            </UserInfo>
          </UserContainer>
        </UserSection>
        <PlaylistSection>
          <PlaylistBox>
            {playlists.map(playlist => (
              <PlaylistThumbnail key={playlist.id} playlist={playlist} />
            ))}
          </PlaylistBox>
        </PlaylistSection>
      </Wrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideSessionProps = async ({ query, req }) => {
  const id: string = query.id
  const userService = new UserService()
  const user = await userService.find({ id })

  const currentUser = req?.session?.passport?.user
  if (!currentUser) return { props: { user, playlists: [] } }

  let type: User['type'] = 'spotify'

  if (currentUser && 'provider' in currentUser) {
    type = 'spotify'
  } else {
    type = 'apple'
  }

  const playlistService = new PlaylistService({
    headers: {
      Authorization: currentUser.accessToken
    }
  })
  const playlists = await playlistService.findAll({ type, userId: user?.id || '' })

  return { props: { user, playlists } }
}

const Wrapper = styled(Layout)`
  background-color: ${({ theme }) => theme.color.white};
`

const Hero = styled.div`
  width: 100%;
  height: 20vh;
  background-color: ${({ theme }) => theme.color.lightGray};
`

const UserSection = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin-bottom: 64px;
`

const UserContainer = styled.div`
  width: 1240px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0 auto;
  position: relative;
`

const UserThumbnail = styled(Thumbnail)`
  width: 150px;
  height: 150px;
  border: 6px solid ${({ theme }) => theme.color.white};
  position: absolute;
  top: -32px;
  left: 0;
`

const UserInfo = styled.div`
  width: calc(100% - 174px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-left: 174px;
  padding: 16px;
`

const FlexBox = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const UserName = styled.div`
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  margin-right: 24px;
`

const ActionButton = styled(Button)`
  min-width: 165px;
  height: 48px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.color.black};
  padding: 8px 24px;
  transition: all 0.15s;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.black};
  }
`

const Biography = styled.div`
  width: 100%;
  line-height: 24px;
  margin: auto 0;
`

const PlaylistSection = styled.section`
  max-width: 1240px;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0 auto;
  position: relative;
`

const PlaylistBox = styled.div`
  display: grid;
  column-gap: 24px;
  row-gap: 24px;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fill, 200px);
`

export default UsersShow
