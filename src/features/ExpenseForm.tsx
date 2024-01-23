import { Formik } from 'formik'
import React from 'react'
import {
  AppDatePicker,
  AppForm,
  AppInput,
  AppInputNumber,
  AppSelect,
} from '../components'
import { Expense } from '../types'
import { Button, Flex, Space, notification } from 'antd'
import { useAppDispatch } from '../store'
import {
  deleteExpenseAction,
  patchExpenseAction,
  postExpenseAction,
  useUsersExpenses,
} from '../store/Expenses'
import { useAuthContext } from '../contexts'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

type ExpenseFormProps = {
  expense?: Expense
}

export const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  const { activeUser } = useAuthContext()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading } = useUsersExpenses({})
  const onSubmit = (values: Omit<Expense, 'id' | 'userId'>) => {
    if (expense) {
      dispatch(
        patchExpenseAction({
          expenseId: expense.id,
          payload: {
            description: values.description,
            amount: values.amount,
            date: values.date,
            tags: values.tags,
          },
          onSuccess: () => {
            notification.success({
              message: 'Zmiany zostały zapisane',
            })
            navigate('/')
          },
        })
      )
    } else if (activeUser) {
      dispatch(
        postExpenseAction({
          payload: {
            description: values.description,
            amount: values.amount,
            date: values.date,
            tags: values.tags,
            userId: activeUser?.id,
          },
          onSuccess: () => {
            notification.success({
              message: 'Wydatek został dodany',
            })
            navigate('/')
          },
        })
      )
    }
  }

  const initialValues = {
    description: expense?.description || '',
    amount: expense?.amount || 0,
    date: expense?.date || dayjs(new Date()).format('YYYY-MM-DD'),
    tags: expense?.tags || [],
  }

  console.log(initialValues)

  const deleteExpense = (expenseId: string) => {
    dispatch(
      deleteExpenseAction({
        expenseId,
        onSuccess: () => {
          notification.success({
            message: 'Wydatek został usunięty',
          })
        },
      })
    )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <AppForm>
        <AppInput
          name="description"
          labelProps={{
            label: 'Tytuł',
          }}
        />
        <AppInputNumber
          name="amount"
          labelProps={{
            label: 'Kwota',
          }}
        />
        <AppDatePicker
          name="date"
          labelProps={{
            label: 'Data',
          }}
        />
        <AppSelect
          name="tags"
          mode="tags"
          labelProps={{
            label: 'Kategorie',
          }}
        />
        <Flex gap={8} justify="space-between">
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {expense ? 'Zapisz' : 'Dodaj'}
            </Button>
            <Link to="/">
              <Button>Powrót</Button>
            </Link>
          </Space>

          {expense && (
            <Button
              type="primary"
              danger={true}
              onClick={() => deleteExpense(expense.id)}
            >
              Usuń
            </Button>
          )}
        </Flex>
      </AppForm>
    </Formik>
  )
}
