import { Input, InputProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'

type AppInputFormikProps = InputProps & {
  name: string
}

export const AppInputFormik = ({
  name,
  ...inputProps
}: AppInputFormikProps) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    [name: string]: string | number | readonly string[] | undefined
  }>()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFieldValue(name, value)
    inputProps?.onChange?.(event)
  }
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true)
    inputProps?.onBlur?.(event)
  }

  return (
    <Input
      {...inputProps}
      value={get(values, name)}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
