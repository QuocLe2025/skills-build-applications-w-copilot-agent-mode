import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/`
  : `${window.location.protocol}//${window.location.hostname}:8000/api/`

function Home() {
  return (
    <section className="py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and compete on a modern multi-tier fitness platform.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <NavLink className="btn btn-primary btn-lg" to="/activities">
              Activities
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-lg" to="/leaderboard">
              Leaderboard
            </NavLink>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">API configuration</h2>
              <p className="mb-2">
                This frontend loads data from the backend using Vite environment variables.
              </p>
              <p className="small mb-0 text-break">
                <strong>API base:</strong> {apiHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="container py-5">
      <header className="mb-4">
        <nav className="nav nav-pills flex-wrap gap-2">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/activities" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Leaderboard
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Teams
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Users
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Workouts
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
