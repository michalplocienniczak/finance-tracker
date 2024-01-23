import { Col, Flex, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { useUsersExpenses } from '../store/Expenses'
import { ExpensesTable } from '../features/ExpensesTable'

export const Dashboard = () => {
  const { expenses } = useUsersExpenses({ fetch: true })
  const [spendings, setSpendings] = useState(() => {
    return expenses.reduce((acc, expense) => {
      return acc + expense.amount
    }, 0)
  })

  useEffect(() => {
    setSpendings(
      expenses.reduce((acc, expense) => {
        return acc + expense.amount
      }, 0)
    )
  }, [expenses])

  return (
    <Row>
      <Col span={24}>
        <Flex className="mx-3 my-0 mb-6">
          <Statistic title="Wydano" value={spendings} />
        </Flex>
        <ExpensesTable />
      </Col>
    </Row>
  )
}
