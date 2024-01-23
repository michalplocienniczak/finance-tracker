import React from 'react'
import { useUsersExpenses } from '../store/Expenses'
import Table, { ColumnsType } from 'antd/es/table'
import { Expense } from '../types'
import { Button, Flex, Space, Spin, Tag } from 'antd'
import { Link } from 'react-router-dom'

export const ExpensesTable = () => {
  const { expenses, isLoading } = useUsersExpenses({})

  const columns: ColumnsType<Expense> = [
    {
      key: 'id',
      title: '#',
      dataIndex: 'id',
      render: (id: string) => <span>{id}</span>,
    },
    {
      key: 'title',
      title: 'Tytuł',
      dataIndex: 'description',
      render: (description: string) => <span>{description}</span>,
    },
    {
      key: 'amount',
      title: 'Kwota',
      dataIndex: 'amount',
      render: (amount: number) => <span>{amount}</span>,
    },
    {
      key: 'category',
      title: 'Kategorie',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <span>
          {tags.map((tag) => (
            <Tag bordered={false} key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      key: 'date',
      title: 'Data',
      dataIndex: 'date',
      render: (date: string) => <span>{date}</span>,
    },
    {
      key: '',
      title: '',
      dataIndex: '',
      render: (_, record: Expense) => (
        <Link to={`/edit-expense/${record.id}`}>
          <Button type="primary">Edytuj</Button>
        </Link>
      ),
    },
  ]

  if (isLoading) {
    return (
      <Flex justify="center" align="middle" className="h-screen">
        <Space>
          <Spin />
        </Space>
      </Flex>
    )
  }

  if (expenses.length === 0) {
    return (
      <Flex vertical={true} gap={8}>
        <Space>
          <Link to="/new-expense">
            <Button type="primary">Dodaj wydatek</Button>
          </Link>
        </Space>
        <span>Brak wydatków</span>
      </Flex>
    )
  }

  return (
    <Flex vertical={true} gap={8}>
      <Space>
        <Link to="/new-expense">
          <Button type="primary">Dodaj wydatek</Button>
        </Link>
      </Space>
      <Table columns={columns} dataSource={expenses} />
    </Flex>
  )
}
