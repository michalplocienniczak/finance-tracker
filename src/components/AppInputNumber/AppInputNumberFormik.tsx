import { InputNumber, InputNumberProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'
import { valueType } from 'antd/es/statistic/utils'

type AppInputNumberFormikProps = InputNumberProps & {
  name: string
}

export const AppInputNumberFormik = ({
  name,
  ...inputProps
}: AppInputNumberFormikProps) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    [name: string]: number | undefined
  }>()

  const onChange = (number: valueType | null) => {
    setFieldValue(name, number)
    inputProps?.onChange?.(number)
  }
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true)
    inputProps?.onBlur?.(event)
  }

  return (
    <InputNumber
      {...inputProps}
      value={get(values, name)}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
