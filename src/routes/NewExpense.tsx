import { Col, Row } from 'antd'
import React from 'react'
import { ExpenseForm } from '../features/ExpenseForm'

export const NewExpense = () => {
  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col span={8}>
        <ExpenseForm />
      </Col>
    </Row>
  )
}
