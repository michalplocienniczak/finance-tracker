import { AxiosError } from 'axios'
import { isArray } from 'lodash'

const returnData = (data: unknown): string => {
  switch (typeof data) {
    case 'string':
      return data
    case 'object':
      if (isArray(data)) return data.join(', ')
      return JSON.stringify(data)
    default:
      return `${data}`
  }
}

export const handleAxiosError = (error: AxiosError): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of  2xx
    console.error('Server responded with an error:', error.response.status)
    console.error('Error data:', error.response.data)
    return returnData(error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request)
    return error.request
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message)
    return error.message
  }
}
