import UserRow from './UserRow';

const COLUMNS = [
  { label: 'ID', field: 'id' },
  { label: 'First Name', field: 'firstName' },
  { label: 'Last Name', field: 'lastName' },
  { label: 'Email', field: 'email' },
  { label: 'Department', field: 'department' },
];

export default function UserTable({ users, sortConfig, onSort, onEdit, onDelete }) {
  const getSortIndicator = (field) => {
    if (sortConfig.field !== field) {
      return 'Sort';
    }

    return sortConfig.direction === 'asc' ? 'Ascending' : 'Descending';
  };

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.field} scope="col">
                <button
                  className="table-sort-button"
                  type="button"
                  onClick={() => onSort(column.field)}
                  aria-label={`Sort by ${column.label}`}
                >
                  <span>{column.label}</span>
                  <span className="sort-badge">{getSortIndicator(column.field)}</span>
                </button>
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td className="empty-state" colSpan={6}>
                No users match the current search or filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
