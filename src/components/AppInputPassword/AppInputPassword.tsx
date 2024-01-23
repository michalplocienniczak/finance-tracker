import { Form, FormItemProps, Input } from 'antd'
import {
  AppInputPasswordFormik,
  InputPasswordProps,
} from './AppInputPasswordFormik'
import React from 'react'

type AppInputPasswordProps = InputPasswordProps & {
  name?: string
  labelProps?: FormItemProps
}

export const AppInputPassword = ({
  name,
  labelProps,
  ...inputProps
}: AppInputPasswordProps) => {
  const field = name ? (
    <AppInputPasswordFormik name={name} {...inputProps} />
  ) : (
    <Input.Password {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}
