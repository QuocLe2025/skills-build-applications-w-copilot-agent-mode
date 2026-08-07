import { useEffect, useState } from 'react'
import { buildEndpoint, fetchApi, extractList, extractPagination } from './api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchApi('leaderboard', { signal: controller.signal })
      .then((payload) => {
        setEntries(extractList(payload, 'leaderboard'))
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

  const endpoint = buildEndpoint('leaderboard')

  return (
    <section>
      <div className="mb-4">
        <h2>Leaderboard</h2>
        <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading leaderboard…</div>}
      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-warning">No leaderboard entries are available yet.</div>
      )}

      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id || JSON.stringify(entry)}>
                  <td>{entry.rank ?? '—'}</td>
                  <td>{entry.user?.username ?? 'Unknown'}</td>
                  <td>{entry.points ?? entry.score ?? 'N/A'}</td>
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

export default Leaderboard
