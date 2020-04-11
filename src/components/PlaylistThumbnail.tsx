import React from 'react'
import styled from 'styled-components'
import Thumbnail from '~/components/common/Thumbnail'
import { Playlist } from '~/domains/playlist'

type Props = {
  className?: string
  playlist: Playlist
}

const PlaylistThumbnail: React.FC<Props> = ({ playlist }) => (
  <div>
    <Wrapper>
      <Time>00:00</Time>
      <StyledThummbnail src={playlist.thumbnailUrl} />
    </Wrapper>
    <Title>{playlist.title}</Title>
  </div>
)

const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 12px #00000020;
  margin-bottom: 8px;
  position: relative;
`

const StyledThummbnail = styled(Thumbnail)`
  width: 200px;
  height: 200px;
  border-radius: 6px;
`

const Time = styled.small`
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  padding: 2px 4px;
  position: absolute;
  right: 6px;
  bottom: 6px;
`

const Title = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default PlaylistThumbnail
