import { FC, useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from '../components'
import { UserForm } from '../constants/userform'

const { Title } = Typography

const EditUser: FC = () => {
  const [form] = Form.useForm()
  const { userId } = useParams()
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const errorResponse: ErrorSubmitUserResponse = {}
  const [errors, setErrors] = useState(errorResponse)
  const [success, setSuccess] = useState('')

  const handleSubmit = (values: UserForm) => {
    setLoading(true)

    const data: UserForm = {
      name: values.name,
      email: values.email
    }

    axios.put(`http://localhost:8000/api/user/${userId}`, data)
      .then(({ data }) => {
        setLoading(false)
        setSuccess(data.message)
        setErrorMessage('')
        setErrors(errorResponse)
      })
      .catch(({ response }) => {
        setLoading(false)
        setErrorMessage(response.data.message)
        setErrors(response.data.errors)
        setSuccess('')
      })
  }

  const getUserData = () => {
    axios.get(`http://localhost:8000/api/user/${userId}/edit`)
      .then(({ data }) => {
        form.setFieldsValue({
          name: data.name,
          email: data.email,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    getUserData()
  })

  return (
    <Container>
      <Title>Edit User</Title>
      
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item<UserForm>
          label="Name"
          name="name"
          validateStatus={errors?.name ? 'error' : ''}
          help={errors?.name ? errors.name[0] : ''}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Input your name" type="text" />
        </Form.Item>
        <Form.Item<UserForm>
          label="E-mail"
          name="email"
          validateStatus={errors?.email ? 'error' : ''}
          help={errors?.email ? errors.email[0] : ''}
          rules={[{ required: true, message: 'Please input your e-mail!' }]}
        >
          <Input placeholder="Input your e-mail" type="email" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </Form>
    </Container>
  )
}

export default EditUser
