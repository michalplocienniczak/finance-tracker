import { Col, Row } from 'antd'
import React from 'react'
import { LoginForm } from '../features/LoginForm'

export const SignIn = () => {
  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col span={8}>
        <LoginForm />
      </Col>
    </Row>
  )
}
