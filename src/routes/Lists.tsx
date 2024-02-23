import React from 'react'
import { VirtualizedList } from '../features/VirtualizedList'
import { useUsersExpenses } from '../store/Expenses'
import { NonVirtualizedList } from '../features/NonVirtualizedList'
import { OnClickError } from '../features/OnClickError'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

export const Lists = () => {
  const { expenses } = useUsersExpenses({ fetch: true })
  return (
    <div>
      <h1>List comparison</h1>

      <h2>Error handling with Error Boundaries</h2>
      <ErrorBoundary message="Custom ERROR!">
        <OnClickError />
      </ErrorBoundary>
      <h2>Virtualized</h2>
      <VirtualizedList expenses={expenses} />
      <h2>Non-virtualized</h2>
      <NonVirtualizedList expenses={expenses} />
    </div>
  )
}
