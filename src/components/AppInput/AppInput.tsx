import { Form, FormItemProps, Input, InputProps } from 'antd'
import { AppInputFormik } from './AppInputFormik'
import React from 'react'

type AppInputProps = InputProps & {
  name?: string
  labelProps?: FormItemProps
}

export const AppInput = ({
  name,
  labelProps,
  ...inputProps
}: AppInputProps) => {
  const field = name ? (
    <AppInputFormik name={name} {...inputProps} />
  ) : (
    <Input {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}
