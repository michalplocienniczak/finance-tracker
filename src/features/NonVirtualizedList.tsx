import React from 'react'
import { Expense } from '../types'

type NonVirtualizedListProps = {
  expenses: Expense[]
}

export const NonVirtualizedList = ({ expenses }: NonVirtualizedListProps) => {
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>{expense.description}</div>
      ))}
    </div>
  )
}
