export default function Header({ totalUsers, onAddUser }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Admin Console</p>
        <h1>User Management Dashboard</h1>
        <p className="header-copy">
          Manage user records with search, filters, sorting, pagination, and JSONPlaceholder CRUD operations.
        </p>
      </div>

      <div className="header-actions">
        <div className="stat-tile" aria-label={`${totalUsers} users loaded`}>
          <span>{totalUsers}</span>
          <small>Users loaded</small>
        </div>
        <button className="primary-button" type="button" onClick={onAddUser}>
          <span aria-hidden="true">+</span>
          Add User
        </button>
      </div>
    </header>
  );
}
