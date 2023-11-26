import { FC, useEffect, useState } from 'react'
import { Alert, Modal } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, DataTable, Flex } from './components'
import { Pagination } from './constants/datatable'

const App: FC = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const paginationInit: Pagination = {links: []}
  const [pagination, setPagination] = useState(paginationInit)

  const [actionStatus, setActionStatus] = useState('')
  const [actionMessage, setActionMessage] = useState('')

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
    fetchUsers()

    const { state } = params
    if (state?.status) {
      setActionStatus(state?.status)
      setActionMessage(state?.message)
      window.history.replaceState({}, document.title)
    }
  }, [params])

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <h1>The Digital Cellar</h1>
        
        <Link to="/add">
          <button>+ Add New User</button>
        </Link>
      </Flex>

      {actionStatus && <Alert message={actionMessage} type="success" showIcon />}

      <DataTable
        data={data}
        pagination={pagination}
        perPage={perPage}
        total={total}
        onClickDelete={openDeleteModal}
      />
      {loading ? 'Fetching users...' : null}
    </Container>
  )
}

export default App
