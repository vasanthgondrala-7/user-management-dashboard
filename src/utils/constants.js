export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export const USERS_ENDPOINT = '/users';

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const DEFAULT_FILTERS = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Human Resources',
  'Customer Success',
  'IT',
];
