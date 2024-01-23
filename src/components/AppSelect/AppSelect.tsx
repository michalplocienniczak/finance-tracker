import { Form, FormItemProps, Select, SelectProps } from 'antd'
import { AppSelectFormik } from './AppSelectFormik'
import React from 'react'

type AppSelectProps = SelectProps & {
  name?: string
  labelProps?: FormItemProps
}

export const AppSelect = ({
  name,
  labelProps,
  ...inputProps
}: AppSelectProps) => {
  const field = name ? (
    <AppSelectFormik name={name} {...inputProps} />
  ) : (
    <Select {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}
