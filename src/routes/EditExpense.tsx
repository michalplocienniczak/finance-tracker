import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../store'
import { getExpenseByIdAction } from '../store/Expenses'
import { Expense } from '../types'
import { Col, Row, Spin, notification } from 'antd'
import { ExpenseForm } from '../features/ExpenseForm'

export const EditExpense = () => {
  const { expenseId } = useParams<{ expenseId: string }>()
  const dispatch = useAppDispatch()
  const [activeExpense, setActiveExpense] = useState<Expense>()
  const navigate = useNavigate()

  useEffect(() => {
    if (expenseId) {
      dispatch(
        getExpenseByIdAction({
          expenseId,
          onSuccess: (response) => {
            console.log(response)
            setActiveExpense(response)
          },
          onError: (error: string) => {
            notification.error({
              message: error,
            })
            setTimeout(() => {
              navigate('/')
            }, 200)
          },
        })
      )
    }
  }, [expenseId])

  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col span={8}>
        {activeExpense ? <ExpenseForm expense={activeExpense} /> : <Spin />}
      </Col>
    </Row>
  )
}
