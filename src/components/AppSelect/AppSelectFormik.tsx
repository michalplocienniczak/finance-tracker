import { Select, SelectProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'
import { DefaultOptionType } from 'antd/es/select'

type AppSelectFormikProps = SelectProps & {
  name: string
}

export const AppSelectFormik = ({
  name,
  ...inputProps
}: AppSelectFormikProps) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    [name: string]: string | number | undefined
  }>()
  const onChange = (
    value: DefaultOptionType['value'],
    options: DefaultOptionType | DefaultOptionType[]
  ) => {
    setFieldValue(name, value)
    inputProps?.onChange?.(value, options)
  }
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true)
    inputProps?.onBlur?.(event)
  }

  return (
    <Select
      {...inputProps}
      value={get(values, name)}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
