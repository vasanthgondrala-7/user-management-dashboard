import { useEffect, useState } from 'react';
import { DEFAULT_FILTERS } from '../utils/constants';

export default function FilterPopup({ filters, isOpen, onApply, onClear, onClose }) {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(draftFilters);
  };

  const handleClear = () => {
    setDraftFilters(DEFAULT_FILTERS);
    onClear();
  };

  return (
    <div className="popover-panel" role="dialog" aria-modal="false" aria-labelledby="filter-title">
      <form onSubmit={handleSubmit}>
        <div className="popover-header">
          <h2 id="filter-title">Filters</h2>
          <button className="icon-button" type="button" aria-label="Close filters" onClick={onClose}>
            x
          </button>
        </div>

        <div className="filter-grid">
          <label>
            First Name
            <input
              type="text"
              value={draftFilters.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
              placeholder="e.g. Leanne"
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={draftFilters.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
              placeholder="e.g. Graham"
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={draftFilters.email}
              onChange={(event) => handleChange('email', event.target.value)}
              placeholder="e.g. april.biz"
            />
          </label>
          <label>
            Department
            <input
              type="text"
              value={draftFilters.department}
              onChange={(event) => handleChange('department', event.target.value)}
              placeholder="e.g. Engineering"
            />
          </label>
        </div>

        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={handleClear}>
            Clear
          </button>
          <button className="primary-button" type="submit">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}
