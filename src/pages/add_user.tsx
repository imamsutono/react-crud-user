import { FC, useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container } from '../components'
import { UserForm } from '../constants/userform'

const { Title } = Typography

const AddUser: FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const errorResponse: ErrorSubmitUserResponse = {}
  const [errors, setErrors] = useState(errorResponse)

  const handleSubmit = (values: UserForm) => {
    setLoading(true)

    const data: UserForm = {
      name: values.name,
      email: values.email
    }

    axios.post('http://localhost:8000/api/user', data)
      .then(response => {
        form.resetFields()
        setLoading(false)

        navigate('/', {
          state: {
            status: 'success',
            message: response.data.message
          }
        })
        // console.log(response.data.message)
      })
      .catch(({ response }) => {
        setLoading(false)
        setErrorMessage(response.data.message)
        setErrors(response.data.errors)
      })
  }

  return (
    <Container>
      <Title>Add New User</Title>
      
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}

      <Form
        name="addUserForm"
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
          <Button htmlType="submit">
            Cancel
          </Button>
        </Link>
      </Form>
    </Container>
  )
}

export default AddUser
