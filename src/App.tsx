import React from 'react'
import { ConfigProvider } from 'antd'
import { theme } from '../antd.config'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignIn } from './routes/SignIn'
import { AuthProvider } from './contexts'
import { AppLayout } from './layout/AppLayout'
import { SignUp } from './routes/SignUp'
import { Dashboard } from './routes/Dashboard'
import { NewExpense } from './routes/NewExpense'
import { EditExpense } from './routes/EditExpense'
import { Lists } from './routes/Lists'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: '/lists',
    element: (
      <AppLayout>
        <Lists />
      </AppLayout>
    ),
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/new-expense',
    element: (
      <AppLayout>
        <NewExpense />
      </AppLayout>
    ),
  },
  {
    path: '/edit-expense/:expenseId',
    element: (
      <AppLayout>
        <EditExpense />
      </AppLayout>
    ),
  },
])

function App(): JSX.Element {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </ConfigProvider>
  )
}

export default App
