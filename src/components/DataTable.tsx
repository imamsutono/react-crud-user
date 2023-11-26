import { CSSProperties, FC } from 'react'
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
  perPage: number;
  total: number;
  onClickDelete: (id: number) => void;
}

const styles: CSSProperties = {
  width: '100%'
}

const DataTable: FC<TableProps> = ({
  data, pagination, perPage, total, onClickDelete
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
              <button>Edit</button>
              <button onClick={() => onClickDelete(id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Flex justify="space-between">
      <span>Showing {perPage} of {total} data</span>
      <div>
        {pagination.links.map(({ label }, index) => (
          <button
            dangerouslySetInnerHTML={{ __html: label }}
            key={index}
          />
        ))}
      </div>
    </Flex>
  </>
)

export default DataTable
