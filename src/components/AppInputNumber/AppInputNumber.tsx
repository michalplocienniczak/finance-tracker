import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd'
import { AppInputNumberFormik } from './AppInputNumberFormik'
import React from 'react'

type AppInputNumberProps = InputNumberProps & {
  name?: string
  labelProps?: FormItemProps
}

export const AppInputNumber = ({
  name,
  labelProps,
  ...inputProps
}: AppInputNumberProps) => {
  const field = name ? (
    <AppInputNumberFormik name={name} {...inputProps} />
  ) : (
    <InputNumber {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}
