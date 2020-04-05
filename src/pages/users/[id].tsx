import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import Button from '../../components/common/Button'
import Head from '../../components/common/Head'
import Icon from '../../components/common/Icon'
import Layout from '../../components/common/Layout'
import Thumbnail from '../../components/common/Thumbnail'
import PlaylistThumbnail from '../../components/PlaylistThumbnail'
import { Playlist } from '../../domains/playlist'
import { User, UserService } from '../../domains/user'
import { axios } from '../../lib/axios'
import { useCurrentUser } from '../../hooks/useCurrentUser'

const playlists: Playlist[] = [
  {
    id: '1',
    title: '最初のプレイリスト',
    description: '',
    tracks: [],
    thumbnailUrl: '',
    userId: '1'
  },
  {
    id: '2',
    title: '次のプレイリスト',
    description: '',
    tracks: [],
    thumbnailUrl: '',
    userId: '2'
  }
]

type Props = {
  user?: User
}

const UsersShow: NextPage<Props> = ({ user }) => {
  const currentUser = useCurrentUser()

  return (
    <>
      <Head title={user?.name} />
      <Layout currentUser={currentUser}>
        <Hero />
        <Container>
          <UserThumbnail src={user?.imageUrl} circle />
          <UserInfo>
            <FlexBox>
              <UserName>{user?.name}</UserName>
              <FollowButton>フォロー</FollowButton>
            </FlexBox>
            <Biography>{user?.biography}</Biography>
          </UserInfo>
          <SubTitle>
            <Icon name="playlist" />
            プレイリスト
          </SubTitle>
          <PlaylistBox>
            {playlists.map(playlist => (
              <PlaylistThumbnail key={playlist.id} playlist={playlist} />
            ))}
          </PlaylistBox>
        </Container>
      </Layout>
    </>
  )
}

UsersShow.getInitialProps = async ({ query }) => {
  const { id } = query as { id: string }
  const userService = new UserService(axios)
  const user = await userService.find({ id })
  return { user }
}

const Hero = styled.div`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.color.gray};
`

const Container = styled.div`
  width: 1240px;
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
  width: 100%;
  height: 128px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 0 100px 174px;
  padding: 16px;
`

const FlexBox = styled.div`
  display: flex;
`

const UserName = styled.div`
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  margin-right: 24px;
`

const FollowButton = styled(Button)`
  width: 165px;
  height: 48px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.color.black};
  transition: all 0.15s;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.black};
  }
`

const Biography = styled.div`
  margin: auto 0;
`

const SubTitle = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
  box-sizing: border-box;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  margin-bottom: 24px;
  padding-bottom: 8px;
`

const PlaylistBox = styled.div`
  display: grid;
  column-gap: 24px;
  row-gap: 24px;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fill, 200px);
`

export default UsersShow
