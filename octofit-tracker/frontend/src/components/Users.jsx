import { useEffect, useState } from 'react'
import { buildEndpoint, fetchApi, extractList, extractPagination } from './api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    // The backend API is expected at https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

    fetchApi('users', { signal: controller.signal })
      .then((payload) => {
        setUsers(extractList(payload, 'users'))
        setPagination(extractPagination(payload))
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const endpoint = buildEndpoint('users')

  return (
    <section>
      <div className="mb-4">
        <h2>Users</h2>
        <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading users…</div>}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning">No users were found.</div>
      )}

      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || JSON.stringify(user)}>
                  <td>{user.username ?? 'Unknown'}</td>
                  <td>{user.email ?? 'Unknown'}</td>
                  <td>{user.role ?? 'Member'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination && (
        <div className="alert alert-light mt-4">
          <strong>Pagination:</strong> {JSON.stringify(pagination)}
        </div>
      )}
    </section>
  )
}

export default Users
