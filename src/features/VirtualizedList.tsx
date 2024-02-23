import React, { CSSProperties } from 'react'
import { Expense } from '../types'
import { FixedSizeList as List } from 'react-window'

type VirtualizedListProps = {
  expenses: Expense[]
}

export const VirtualizedList = ({ expenses }: VirtualizedListProps) => {
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>{expenses[index].description}</div>
  )

  return (
    <List height={200} itemCount={expenses.length} itemSize={50} width={300}>
      {Row}
    </List>
  )
}
