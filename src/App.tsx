import { FC, useEffect, useState } from 'react'
import { Container, DataTable, Flex } from './components'
import { Pagination } from './constants/datatable'
import axios from 'axios'
import { Alert, Button, Form, Input, Modal } from 'antd'
import { UserForm } from './constants/userform'

const App: FC = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const paginationInit: Pagination = {links: []}
  const [pagination, setPagination] = useState(paginationInit)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [submitMessage, setSubmitMessage] = useState('')

  const fetchUsers = async () => {
    setLoading(true)

    const response = await axios.get('http://localhost:8000/api/user')
    const { data } = response

    setData(data.data)
    setTotal(data.total)
    setPerPage(data.per_page)
    setPagination(data)
    setLoading(false)
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleSubmit = (values: UserForm) => {
    setConfirmLoading(true)

    const data: UserForm = {
      name: values.name,
      email: values.email
    }

    axios.post('http://localhost:8000/api/user', data)
      .then(response => {
        form.resetFields()
        setConfirmLoading(false)
        setIsModalOpen(false)
        setSubmitMessage(response.data.message)
      })
      .catch(err => {
        console.error(err.response.data)
        console.log(err.response.data.message)
        setConfirmLoading(false)
      })
  }

  const onSubmitFailed = () => {
    console.log('failed')
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <h1>The Digital Cellar</h1>
        <button onClick={showModal}>+ Add New User</button>
      </Flex>
      {submitMessage && <Alert message={submitMessage} type="success" showIcon />}
      <DataTable
        data={data}
        pagination={pagination}
        perPage={perPage}
        total={total}
      />
      {loading ? 'Fetching users...' : null}

      <Modal
        title="Add New User"
        open={isModalOpen}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="addUserForm"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
          >
            Submit
          </Button>
        ]}
      >
        <Form
          name="addUserForm"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onSubmitFailed}
        >
          <Form.Item<UserForm>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Input your name" type="text" />
          </Form.Item>
          <Form.Item<UserForm>
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail!' }]}
          >
            <Input placeholder="Input your e-mail" type="email" />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  )
}

export default App
