import { useEffect, useState } from 'react'
import { buildEndpoint, fetchApi, extractList, extractPagination } from './api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchApi('activities', { signal: controller.signal })
      .then((payload) => {
        setActivities(extractList(payload, 'activities'))
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

  const endpoint = buildEndpoint('activities')

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>Activities</h2>
          <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading activities…</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-warning">
          No activities were found. The backend may return a paginated response or an empty array.
        </div>
      )}

      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>User</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || JSON.stringify(activity)}>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{activity.type || activity.activity || 'N/A'}</td>
                  <td>{activity.user?.username ?? activity.user?.email ?? 'Unknown'}</td>
                  <td>{activity.duration ? `${activity.duration} min` : 'N/A'}</td>
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

export default Activities
