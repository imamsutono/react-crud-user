import { FC, useEffect, useState } from 'react'
import { Alert, Button, Modal, Typography } from 'antd'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Container, DataTable, Flex } from './components'
import { Pagination } from './constants/datatable'

const { Title } = Typography

const App: FC = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const paginationInit: Pagination = {links: []}
  const [pagination, setPagination] = useState(paginationInit)

  const [actionStatus, setActionStatus] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  const [searchParams] = useSearchParams()
  const fetchUsers = async () => {
    setLoading(true)

    const currentPage = searchParams.get('page') || 1
    const response = await axios.get(`http://localhost:8000/api/user?page=${currentPage}`)
    const { data } = response

    setData(data.data)
    setTotal(data.total)
    setPagination(data)
    setLoading(false)
  }

  const openDeleteModal = (id: number) => {
    Modal.warning({
      title: 'Delete User',
      content: 'Are you sure want to delete the user?',
      onOk: () => submitDelete(id),
    })
  }

  const submitDelete = (id: number) => {
    axios.delete(`http://localhost:8000/api/user/${id}`)
      .then(response => {
        setActionStatus('success')
        setActionMessage(response.data.message)
        fetchUsers()
      })
      .catch(err => {
        console.error(err)
      })
  }

  const params = useLocation()
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
  
      const currentPage = searchParams.get('page') || 1
      const response = await axios.get(`http://localhost:8000/api/user?page=${currentPage}`)
      const { data } = response
  
      setData(data.data)
      setTotal(data.total)
      setPagination(data)
      setLoading(false)
    }
    fetchUser()

    const { state } = params
    if (state?.status) {
      setActionStatus(state?.status)
      setActionMessage(state?.message)
      window.history.replaceState({}, document.title)
    }
  }, [searchParams, params])

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Title>The Digital Cellar</Title>
        
        <Link to="/add">
          <Button type="primary">+ Add New User</Button>
        </Link>
      </Flex>

      {actionStatus && <Alert message={actionMessage} type="success" showIcon />}

      <DataTable
        data={data}
        pagination={pagination}
        total={total}
        onClickDelete={openDeleteModal}
        loading={loading}
      />
    </Container>
  )
}

export default App
