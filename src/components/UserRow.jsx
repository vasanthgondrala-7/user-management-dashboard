export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td data-label="ID">{user.id}</td>
      <td data-label="First Name">{user.firstName}</td>
      <td data-label="Last Name">{user.lastName}</td>
      <td data-label="Email">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td data-label="Department">
        <span className="department-pill">{user.department}</span>
      </td>
      <td data-label="Actions">
        <div className="row-actions">
          <button className="secondary-button compact" type="button" onClick={() => onEdit(user)}>
            Edit
          </button>
          <button className="danger-button compact" type="button" onClick={() => onDelete(user)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
