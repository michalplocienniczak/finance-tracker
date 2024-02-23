import { Button } from 'antd'
import React from 'react'

export const OnClickError = () => {
  throw new Error('Error for the component!')
  return (
    <div>
      <h1>Click for error</h1>
      <Button
        danger
        onClick={() => {
          throw new Error('Error!')
        }}
      >
        Click me
      </Button>
    </div>
  )
}
