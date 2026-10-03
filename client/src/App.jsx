import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import AccessGate from './pages/AccessGate'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import PaddleMatch from './pages/PaddleMatch'
import PlayerMatch from './pages/PlayerMatch'

import { useEffect } from 'react'
import { isLoggedIn } from './api'

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AccessRoute() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('authenticated') === 'true') {
      sessionStorage.setItem(
        'paddlematch_access',
        'true'
      )

      navigate('/', { replace: true })
    }
  }, [navigate])

  const accessGranted =
    sessionStorage.getItem('paddlematch_access') === 'true'

  if (accessGranted) {
    return <Navigate to="/" replace />
  }

  return <AccessGate />
}

function HomeRoute() {
  const accessGranted =
    sessionStorage.getItem('paddlematch_access') === 'true'

  if (!accessGranted) {
    return <Navigate to="/access" replace />
  }

  return <Home />
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />

      <Routes>
        <Route
          path="/access"
          element={<AccessRoute />}
        />

        <Route
          path="/"
          element={<HomeRoute />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/paddles"
          element={
            <ProtectedRoute>
              <PaddleMatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <PlayerMatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App