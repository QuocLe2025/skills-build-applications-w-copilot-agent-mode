import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and compete on a modern multi-tier fitness platform.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="#">Get Started</a>
            <a className="btn btn-outline-secondary btn-lg" href="#">View Dashboard</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">Ready to build</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB via Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
