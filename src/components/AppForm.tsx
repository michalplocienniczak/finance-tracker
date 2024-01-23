import React from 'react'
import { Form } from 'formik'

type AppFormProps = React.PropsWithChildren & {
  layout?: 'horizontal' | 'vertical' | 'inline'
}

export const AppForm = ({ layout = 'vertical', children }: AppFormProps) => {
  const className = `ant-form ant-form-${layout}`

  return <Form className={className}>{children}</Form>
}
