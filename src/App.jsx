import { useMemo, useState } from 'react';
import ConfirmDelete from './components/ConfirmDelete';
import FilterPopup from './components/FilterPopup';
import Header from './components/Header';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { useUsers } from './hooks/useUsers';
import { DEFAULT_FILTERS } from './utils/constants';
import { applyFilters, applySearch, paginateUsers, sortUsers } from './utils/helpers';

export default function App() {
  const { users, loading, saving, error, addUser, editUser, removeUser, fetchUsers, clearError } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formState, setFormState] = useState({ isOpen: false, mode: 'add', user: null });
  const [deleteState, setDeleteState] = useState({ isOpen: false, user: null });

  const processedUsers = useMemo(() => {
    const searchedUsers = applySearch(users, searchQuery);
    const filteredUsers = applyFilters(searchedUsers, filters);
    return sortUsers(filteredUsers, sortConfig);
  }, [filters, searchQuery, sortConfig, users]);

  const totalPages = Math.max(1, Math.ceil(processedUsers.length / pageSize));
  const visibleUsers = paginateUsers(processedUsers, Math.min(currentPage, totalPages), pageSize);

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    resetToFirstPage();
  };

  const handleApplyFilters = (nextFilters) => {
    setFilters(nextFilters);
    setIsFilterOpen(false);
    resetToFirstPage();
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setIsFilterOpen(false);
    resetToFirstPage();
  };

  const handleSort = (field) => {
    setSortConfig((currentSort) => ({
      field,
      direction: currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc',
    }));
    resetToFirstPage();
  };

  const handlePageSizeChange = (nextPageSize) => {
    setPageSize(nextPageSize);
    resetToFirstPage();
  };

  const openAddForm = () => {
    setFormState({ isOpen: true, mode: 'add', user: null });
  };

  const openEditForm = (user) => {
    setFormState({ isOpen: true, mode: 'edit', user });
  };

  const closeForm = () => {
    setFormState({ isOpen: false, mode: 'add', user: null });
  };

  const openDeleteModal = (user) => {
    setDeleteState({ isOpen: true, user });
  };

  const closeDeleteModal = () => {
    setDeleteState({ isOpen: false, user: null });
  };

  const handleFormSubmit = async (formData) => {
    const result =
      formState.mode === 'edit'
        ? await editUser(formState.user.id, formData)
        : await addUser(formData);

    if (result.ok) {
      closeForm();
      resetToFirstPage();
    }
  };

  const handleDeleteConfirm = async () => {
    const result = await removeUser(deleteState.user.id);

    if (result.ok) {
      closeDeleteModal();
      resetToFirstPage();
    }
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <main className="app-shell">
      <Header totalUsers={users.length} onAddUser={openAddForm} />

      <section className="dashboard-panel" aria-label="User records">
        {error && (
          <div className="error-banner" role="alert">
            <p>{error}</p>
            <div className="error-actions">
              {!loading && (
                <button className="secondary-button compact" type="button" onClick={fetchUsers}>
                  Retry
                </button>
              )}
              <button className="icon-button" type="button" aria-label="Dismiss error" onClick={clearError}>
                x
              </button>
            </div>
          </div>
        )}

        <div className="toolbar">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />

          <div className="filter-area">
            <button className="secondary-button" type="button" onClick={() => setIsFilterOpen((isOpen) => !isOpen)}>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
            <FilterPopup
              filters={filters}
              isOpen={isFilterOpen}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-card" role="status" aria-live="polite">
            <span className="loader" aria-hidden="true" />
            <p>Loading user records...</p>
          </div>
        ) : (
          <>
            <UserTable
              users={visibleUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={openEditForm}
              onDelete={openDeleteModal}
            />
            <Pagination
              currentPage={Math.min(currentPage, totalPages)}
              pageSize={pageSize}
              totalItems={processedUsers.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </section>

      <UserForm
        mode={formState.mode}
        user={formState.user}
        isOpen={formState.isOpen}
        isSaving={saving}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDelete
        user={deleteState.user}
        isOpen={deleteState.isOpen}
        isDeleting={saving}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
