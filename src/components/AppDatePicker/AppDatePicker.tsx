import { DatePicker, DatePickerProps, Form, FormItemProps } from 'antd'
import { AppDatePickerFormik } from './AppDatePickerFormik'
import React from 'react'

type AppDatePickerProps = DatePickerProps & {
  name?: string
  labelProps?: FormItemProps
}

export const AppDatePicker = ({
  name,
  labelProps,
  ...inputProps
}: AppDatePickerProps) => {
  const field = name ? (
    <AppDatePickerFormik name={name} {...inputProps} />
  ) : (
    <DatePicker {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}
