import { useEffect } from 'react'
import { useAuthContext } from '../../../contexts'
import { expensesSelectors, getExpensesByUserIdAction } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks'

type UseUsersExpensesProps = {
  fetch?: boolean
}

export const useUsersExpenses = ({ fetch }: UseUsersExpensesProps) => {
  const dispatch = useAppDispatch()
  const { activeUser } = useAuthContext()
  const userId = activeUser?.id

  const isLoading = useAppSelector((state) => state.expenses.loading)
  const expenses = useAppSelector(expensesSelectors.selectAll)

  useEffect(() => {
    if (fetch && userId) {
      dispatch(getExpensesByUserIdAction({ userId }))
    }
  }, [fetch, userId, dispatch])

  return {
    isLoading,
    expenses,
  }
}
