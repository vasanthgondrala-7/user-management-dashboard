export default function ConfirmDelete({ user, isOpen, isDeleting, onClose, onConfirm }) {
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel confirm-panel" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Safety Check</p>
            <h2 id="delete-title">Delete User</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close delete confirmation" onClick={onClose}>
            x
          </button>
        </div>

        <p>
          Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>? This action removes the
          record from the dashboard view.
        </p>

        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="danger-button" type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </section>
    </div>
  );
}
