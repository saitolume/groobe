import React, { useState } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import Head from '~/components/common/Head'
import Layout from '~/components/common/Layout'
import SideNavigation from '~/components/settings/SettingsNavigation'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import TextField from '~/components/common/TextField'
import Button from '~/components/common/Button'

const Profile: NextPage = () => {
  const { currentUser, updateCurrentUser } = useCurrentUser()
  const [name, setName] = useState(currentUser?.name)
  const [biography, setbBiography] = useState(currentUser?.biography)

  const updateProfile = async () => {
    if (!currentUser?.id) return
    await updateCurrentUser({ id: currentUser.id, name, biography })
  }

  return (
    <>
      <Head title="プロフィールを編集" />
      <Wrapper currentUser={currentUser}>
        <Container>
          <SideNavigation />
          <Content>
            <FormGroup>
              <FormLabel>ユーザー名</FormLabel>
              <FormTextInput
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <HelperText>全てのユーザーに公開されます。</HelperText>
            </FormGroup>
            <FormGroup>
              <FormLabel>自己紹介</FormLabel>
              <FormTextarea
                value={biography}
                onChange={event => setbBiography(event.target.value)}
                multiple
              />
            </FormGroup>
            <SubmitButton onClick={updateProfile} loading dark flat round>
              プロフィールを更新
            </SubmitButton>
          </Content>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled(Layout)`
  display: flex;
  height: calc(100vh - 64px); /* header height */
`

const Container = styled.div`
  width: 1240px;
  height: calc(100% - 16px);
  display: flex;
  margin: auto auto 0 auto;
`

const Content = styled.div`
  width: calc(100% - 236px);
  background-color: ${({ theme }) => theme.color.white};
  box-sizing: border-box;
  margin-left: 16px;
  padding: 32px;
`

const FormGroup = styled.div`
  margin-bottom: 40px;
`

const FormLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`

const FormTextInput = styled(TextField)`
  width: 60%;
  height: 40px;
`

const FormTextarea = styled(TextField)`
  width: 60%;
  height: 240px;
  resize: vertical;
`

const HelperText = styled.small`
  color: ${({ theme }) => theme.color.gray};
  display: block;
  margin-top: 8px;
`

const SubmitButton = styled(Button)`
  height: 40px;
  background-color: ${({ theme }) => theme.color.success};
  padding: 0 24px;
`

export default Profile
