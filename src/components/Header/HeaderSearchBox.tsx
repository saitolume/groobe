import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '~/components/common/Icon'
import TextField from '~/components/common/TextField'
import Button from '../common/Button'

type Props = {
  className?: string
}

const HeaderSearchBox: React.FC<Props> = ({ className }) => {
  const [word, setWord] = useState('')

  const handleChangeSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(`Search by ${word}`)
  }

  return (
    <Wrapper className={className} onSubmit={search}>
      <SearchField
        type="search"
        value={word}
        onChange={handleChangeSearchField}
        placeholder="プレイリスト、曲、アーティストで検索"
      />
      <SearchButton dark flat>
        <SearchIcon name="search" color="#fff" />
      </SearchButton>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  height: 40px;
  display: flex;
`

const SearchIcon = styled(Icon)`
  margin: auto;
`

const SearchField = styled(TextField)`
  width: 600px;
  height: 100%;
  border: ${({ theme }) => `1px solid ${theme.color.black}`};
  border-radius: 4px 0 0 4px;
  outline: none;
`

const SearchButton = styled(Button)`
  width: 56px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  border-radius: 0 4px 4px 0;
  display: flex;
  justify-content: center;
  padding: 0;
`

export default HeaderSearchBox
