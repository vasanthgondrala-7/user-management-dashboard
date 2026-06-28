import { DEPARTMENTS } from './constants';

export function splitFullName(fullName = '') {
  const [firstName = '', ...lastNameParts] = fullName.trim().split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(' '),
  };
}

export function getDepartmentForUser(user, index = 0) {
  if (user.department) {
    return user.department;
  }

  if (user.company?.name) {
    return user.company.name;
  }

  return DEPARTMENTS[index % DEPARTMENTS.length];
}

export function mapApiUserToDashboardUser(user, index = 0) {
  const names = splitFullName(user.name);

  return {
    id: user.id,
    firstName: user.firstName || names.firstName,
    lastName: user.lastName || names.lastName,
    email: user.email || '',
    department: getDepartmentForUser(user, index),
  };
}

export function mapDashboardUserToApiUser(user) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    department: user.department,
    company: {
      name: user.department,
    },
  };
}

export function applySearch(users, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return users;
  }

  return users.filter((user) =>
    [user.firstName, user.lastName, user.email, user.department]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export function applyFilters(users, filters) {
  return users.filter((user) =>
    Object.entries(filters).every(([field, value]) => {
      const normalizedValue = value.trim().toLowerCase();

      if (!normalizedValue) {
        return true;
      }

      return String(user[field] || '')
        .toLowerCase()
        .includes(normalizedValue);
    }),
  );
}

export function sortUsers(users, sortConfig) {
  if (!sortConfig.field) {
    return users;
  }

  return [...users].sort((a, b) => {
    const valueA = String(a[sortConfig.field] ?? '').toLowerCase();
    const valueB = String(b[sortConfig.field] ?? '').toLowerCase();
    const order = valueA.localeCompare(valueB, undefined, { numeric: true });

    return sortConfig.direction === 'asc' ? order : -order;
  });
}

export function paginateUsers(users, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return users.slice(startIndex, startIndex + pageSize);
}

export function createLocalUserId(users) {
  const highestId = users.reduce((maxId, user) => Math.max(maxId, Number(user.id) || 0), 0);
  return highestId + 1;
}
