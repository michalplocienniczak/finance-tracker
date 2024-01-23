import { Col, Row } from 'antd'
import React from 'react'
import { SignUpForm } from '../features/SignUpForm'

export const SignUp = () => {
  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col span={8}>
        <SignUpForm />
      </Col>
    </Row>
  )
}
