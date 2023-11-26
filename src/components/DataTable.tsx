import { CSSProperties, FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd';
import { Flex } from '.'
import { Pagination } from '../constants/datatable'

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface TableProps {
  data: UserData[];
  pagination: Pagination;
  total: number;
  onClickDelete: (id: number) => void;
  loading: boolean;
}

const styles: { [key: string]: CSSProperties } = {
  table: {
    width: '100%',
    marginTop: 40,
    marginBottom: 40
  },
  th: {
    textAlign: 'left'
  }
}

const { Text } = Typography

const DataTable: FC<TableProps> = ({
  data, pagination, total, onClickDelete, loading
}) => (
  <>
    <table style={styles.table} cellPadding={5}>
      <thead>
        <tr>
          <th style={styles.th}>
            <Text>Name</Text>
          </th>
          <th style={styles.th}>
            <Text>E-mail</Text>
          </th>
          <th style={styles.th}>
            <Text>Action</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td>
              <Text>Fetching user data...</Text>
            </td>
          </tr>
        )}
        {data.map(({ id, name, email }) => (
          <tr key={id}>
            <td>
              <Text>{name}</Text>
            </td>
            <td>
              <Text>{email}</Text>
            </td>
            <td>
              <Link to={`/edit/${id}`}>
                <Button type="link">Edit</Button>
              </Link>
              <Button type="link" onClick={() => onClickDelete(id)} danger>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Flex justify="space-between">
      <Text>
        Showing <strong>{data.length}</strong> of <strong>{total}</strong> data
      </Text>
      <div>
        {pagination.links.map(({ label, url }, index) => {
          const linkUrl = url ? `?${url.split('?')[1]}` : ''

          return (
            <Link to={linkUrl} key={index}>
              <Button>
                <span dangerouslySetInnerHTML={{ __html: label }}></span>
              </Button>
            </Link>
          )
        })}
      </div>
    </Flex>
  </>
)

export default DataTable
