import { useCallback, useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from '../api/userService';
import { createLocalUserId, mapApiUserToDashboardUser } from '../utils/helpers';

const REQUEST_ERROR_MESSAGE =
  'Unable to complete the request. Please verify your connection and try again.';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const apiUsers = await getUsers();
      setUsers(apiUsers.map(mapApiUserToDashboardUser));
    } catch {
      setError('Unable to fetch active users from the database. Please verify your connection status and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (user) => {
    setSaving(true);
    setError('');

    try {
      const optimisticUser = {
        ...user,
        id: createLocalUserId(users),
      };
      const createdUser = await createUser(optimisticUser);
      const mappedUser = mapApiUserToDashboardUser({ ...optimisticUser, ...createdUser });

      setUsers((currentUsers) => [mappedUser, ...currentUsers]);
      return { ok: true };
    } catch {
      setError(REQUEST_ERROR_MESSAGE);
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const editUser = async (id, user) => {
    setSaving(true);
    setError('');

    try {
      const updatedApiUser = await updateUser(id, { ...user, id });
      const updatedUser = mapApiUserToDashboardUser({ ...user, ...updatedApiUser, id });

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) => (currentUser.id === id ? updatedUser : currentUser)),
      );
      return { ok: true };
    } catch {
      setError(REQUEST_ERROR_MESSAGE);
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const removeUser = async (id) => {
    setSaving(true);
    setError('');

    try {
      await deleteUser(id);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
      return { ok: true };
    } catch {
      setError('Could not complete delete operation. Please try again.');
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const clearError = () => setError('');

  return {
    users,
    loading,
    saving,
    error,
    addUser,
    editUser,
    removeUser,
    fetchUsers,
    clearError,
  };
}
