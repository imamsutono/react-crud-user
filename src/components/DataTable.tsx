import { CSSProperties, FC } from 'react'
import { Link } from 'react-router-dom'
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
}

const styles: CSSProperties = {
  width: '100%'
}

const DataTable: FC<TableProps> = ({
  data, pagination, total, onClickDelete
}) => (
  <>
    <table style={styles}>
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, email }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <Link to={`/edit/${id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => onClickDelete(id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Flex justify="space-between">
      <span>Showing {data.length} of {total} data</span>
      <div>
        {pagination.links.map(({ label, url }, index) => {
          const linkUrl = url ? `?${url.split('?')[1]}` : ''

          return (
            <Link to={linkUrl} key={index}>
              <button dangerouslySetInnerHTML={{ __html: label }} />
            </Link>
          )
        })}
      </div>
    </Flex>
  </>
)

export default DataTable
