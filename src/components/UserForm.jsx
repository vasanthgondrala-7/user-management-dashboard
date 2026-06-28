import { useEffect, useMemo, useState } from 'react';
import { DEPARTMENTS } from '../utils/constants';
import { hasValidationErrors, validateUser } from '../utils/validators';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export default function UserForm({ mode, user, isOpen, isSaving, onClose, onSubmit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = mode === 'edit';
  const title = isEditing ? 'Edit User' : 'Add User';

  const departmentOptions = useMemo(() => {
    const selectedDepartment = user?.department;

    if (selectedDepartment && !DEPARTMENTS.includes(selectedDepartment)) {
      return [selectedDepartment, ...DEPARTMENTS];
    }

    return DEPARTMENTS;
  }, [user]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(
      user
        ? {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            department: user.department || '',
          }
        : EMPTY_FORM,
    );
    setErrors({});
  }, [isOpen, user]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateUser(formData);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    await onSubmit({
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
    });
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="user-form-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">{isEditing ? `User ID ${user.id}` : 'New Record'}</p>
            <h2 id="user-form-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close form" onClick={onClose}>
            x
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit} noValidate>
          <label>
            First Name
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Department
            <input
              type="text"
              value={formData.department}
              onChange={(event) => handleChange('department', event.target.value)}
              list="department-options"
              aria-invalid={Boolean(errors.department)}
            />
            <datalist id="department-options">
              {departmentOptions.map((department) => (
                <option key={department} value={department} />
              ))}
            </datalist>
            {errors.department && <span className="field-error">{errors.department}</span>}
          </label>

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button className="primary-button" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
