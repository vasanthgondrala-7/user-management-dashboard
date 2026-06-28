const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUser(user) {
  const errors = {};

  if (!user.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!user.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!user.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(user.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!user.department.trim()) {
    errors.department = 'Department is required.';
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
