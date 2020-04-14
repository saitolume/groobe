import React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  multiple?: boolean
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

const TextField: React.FC<Props> = ({ multiple = false, ...props }) =>
  multiple ? <Textarea {...props} /> : <Input {...props} />

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 6px;
  box-sizing: border-box;
  caret-color: #222;
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
  font-size: 18px;
  padding: 4px 10px;
`

const Textarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 6px;
  box-sizing: border-box;
  caret-color: #222;
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
  font-size: 18px;
  padding: 4px 10px;
`

export default TextField
