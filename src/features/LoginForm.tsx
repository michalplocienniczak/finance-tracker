import React from 'react'
import { Button, Card, Flex, notification } from 'antd'
import { AppForm, AppInput, AppInputPassword } from '../components'
import { Formik } from 'formik'
import { useAppDispatch } from '../store'
import { loginAction } from '../store/Auth/actions/loginAction'
import { User } from '../types'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../contexts'
import { z } from 'zod'

type LoginFormValues = {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const handleSubmit = (values: LoginFormValues) => {
    const validation = loginSchema.safeParse(values)

    if (!validation.success) {
      notification.error({
        message: 'Wypełnij wszystkie pola formularza',
      })
      return
    }

    dispatch(
      loginAction({
        payload: values,
        onSuccess: (response: User) => {
          notification.success({
            message: `Witaj ${response.name}!`,
          })
          login(response.id)
          navigate('/')
        },
        onError: (error: Error) => {
          notification.error({
            message: error.message,
          })
        },
      })
    )
  }

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  }

  return (
    <Card title="Zaloguj się">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <AppForm>
          <AppInput
            type="email"
            name="email"
            labelProps={{ label: 'Email', required: true }}
          />
          <AppInputPassword
            name="password"
            labelProps={{ label: 'Hasło', required: true }}
          />
          <Flex gap="small" align="center" justify="center">
            <Button type="primary" htmlType="submit">
              Zaloguj się
            </Button>
            <Link to="/signup" className="px-3 py-2">
              Zarejestruj się
            </Link>
          </Flex>
        </AppForm>
      </Formik>
    </Card>
  )
}
