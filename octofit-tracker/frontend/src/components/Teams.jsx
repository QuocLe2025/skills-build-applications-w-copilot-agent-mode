import { useEffect, useState } from 'react'
import { buildEndpoint, fetchApi, extractList, extractPagination } from './api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchApi('teams', { signal: controller.signal })
      .then((payload) => {
        setTeams(extractList(payload, 'teams'))
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

  const endpoint = buildEndpoint('teams')

  return (
    <section>
      <div className="mb-4">
        <h2>Teams</h2>
        <p className="text-muted mb-0">Loaded from: <code>{endpoint}</code></p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading teams…</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-warning">No teams were returned from the API.</div>
      )}

      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Team</th>
                <th>Coach</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || JSON.stringify(team)}>
                  <td>{team.name || team.title || 'Unnamed Team'}</td>
                  <td>{team.coach?.username ?? team.coach?.email ?? 'Unassigned'}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 'N/A'}</td>
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

export default Teams
