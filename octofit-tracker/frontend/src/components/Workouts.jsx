import { useEffect, useState } from 'react'
import { buildEndpoint, fetchApi, extractList, extractPagination } from './api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    // The backend API is expected at https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts

    fetchApi('workouts', { signal: controller.signal })
      .then((payload) => {
        setWorkouts(extractList(payload, 'workouts'))
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

  const endpoint = buildEndpoint('workouts')

  return (
    <section>
      <div className="mb-4">
        <h2>Workouts</h2>
        <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading workouts…</div>}
      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-warning">No workouts were returned from the API.</div>
      )}

      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Intensity</th>
                <th>Recommended For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || JSON.stringify(workout)}>
                  <td>{workout.title ?? workout.name ?? 'Untitled'}</td>
                  <td>{workout.intensity ?? 'N/A'}</td>
                  <td>{workout.recommendedFor?.map((user) => user.username || user.email).join(', ') || 'None'}</td>
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

export default Workouts
