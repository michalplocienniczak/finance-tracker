import { DatePicker, DatePickerProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

type AppDatePickerFormikProps = DatePickerProps & {
  name: string
}

export const AppDatePickerFormik = ({
  name,
  ...inputProps
}: AppDatePickerFormikProps) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    [name: string]: string | Dayjs | undefined
  }>()

  const onChange = (dayjs: Dayjs | null) => {
    setFieldValue(name, dayjs?.format('YYYY-MM-DD') || '')
    inputProps?.onChange?.(dayjs, dayjs?.format('YYYY-MM-DD') || '')
  }
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true)
    inputProps?.onBlur?.(event)
  }

  return (
    <DatePicker
      {...inputProps}
      value={dayjs(get(values, name))}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
