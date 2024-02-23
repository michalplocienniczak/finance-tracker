import React from 'react'
import { useAppDispatch } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Flex, notification } from 'antd'
import { Formik } from 'formik'
import { AppForm, AppInput, AppInputPassword } from '../components'
import { postUserAction } from '../store/Auth'
import { z } from 'zod'

type SignUpFormValues = {
  name: string
  email: string
  password: string
  passwordRepeat: string
}

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  passwordRepeat: z.string().min(1),
})

export const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values: SignUpFormValues) => {
    const validation = signUpSchema.safeParse(values)
    if (!validation.success) {
      notification.error({
        message: 'Wypełnij wszystkie pola formularza',
      })
      return
    }

    if (values.password !== values.passwordRepeat) {
      notification.error({
        message: 'Hasła nie są takie same',
      })
      return
    }

    dispatch(
      postUserAction({
        payload: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        onSuccess: () => {
          notification.success({
            message: 'Konto zostało utworzone. Możesz się zalogować.',
          })
          navigate('/signin')
        },
        onError: (error: string) => {
          notification.error({
            message: error,
          })
        },
      })
    )
  }

  const initialValues: SignUpFormValues = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  }

  return (
    <Card title="Zarejestruj się!">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <AppForm>
          <AppInput
            name="name"
            labelProps={{ label: 'Imię', required: true }}
          />
          <AppInput
            type="email"
            name="email"
            labelProps={{ label: 'Email', required: true }}
          />
          <AppInputPassword
            name="password"
            labelProps={{ label: 'Hasło', required: true }}
          />
          <AppInputPassword
            name="passwordRepeat"
            labelProps={{ label: 'Powtórz Hasło', required: true }}
          />
          <Flex gap="small" align="center" justify="center">
            <Button type="primary" htmlType="submit">
              Zarejestruj się
            </Button>
            <Link to="/register" className="px-3 py-2">
              Masz już konto? Zaloguj się
            </Link>
          </Flex>
        </AppForm>
      </Formik>
    </Card>
  )
}
