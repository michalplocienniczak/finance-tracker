import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAuthContext } from '../contexts'
import { useBattery, useGeolocation } from 'react-use'

const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const { logout, isLoggedIn } = useAuthContext()
  const batteryState = useBattery()
  const state = useGeolocation()

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin')
    }
  }, [isLoggedIn])

  const items: MenuItem[] = [
    getItem(
      <Link to="/">Home</Link>,
      '1',
      <Link to="/">
        <HomeOutlined rev={undefined} />
      </Link>
    ),
    getItem(
      <div onClick={() => logout()}>Wyloguj się</div>,
      '4',
      <div onClick={() => logout()}>
        <LogoutOutlined rev={undefined} />
      </div>
    ),
  ]

  const renderBatteryState = () => {
    if (!batteryState.isSupported) {
      return 'nie wspierane'
    }

    if (!batteryState.fetched) {
      return 'wczytywanie danych...'
    }

    return (
      `${batteryState.level * 100}%` +
      (batteryState.charging ? ' (ładowanie)' : '')
    )
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <div className="p-3">
          Battery: {renderBatteryState()} | Twoja lokalizacja:{' '}
          {JSON.stringify(state, null, 2)} | count: {count}
        </div>
        <Content className="mx-0 my-3">{children}</Content>
      </Layout>
    </Layout>
  )
}
