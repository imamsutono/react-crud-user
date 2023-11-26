import { FC, useEffect, useState } from 'react'
import { Container, DataTable, Flex } from './components'
import { Pagination } from './constants/datatable'
import axios from 'axios'

const App: FC = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [loading, setLoading] = useState(false)
  
  const paginationInit: Pagination = {links: []}
  const [pagination, setPagination] = useState(paginationInit)

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

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <h1>The Digital Cellar</h1>
        <button>+ Add New User</button>
      </Flex>
      <DataTable
        data={data}
        pagination={pagination}
        perPage={perPage}
        total={total}
      />
      {loading ? 'Fetching users...' : null}
    </Container>
  )
}

export default App
