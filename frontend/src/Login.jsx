import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import api from './api/axiosConfig'
import { useAuth } from './authProvider'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionExpired = params.get('expired') === 'true'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/api/auth/login', {
        username,
        password
      })

      const token = response.data.token || response.data.jwt || response.data.accessToken

      if (!token) {
        throw new Error('No token returned from server')
      }

      login(token)
      navigate('/')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', color: '#000' }}>
      <h1>Login</h1>

      {sessionExpired && (
        <p style={{ color: 'orange', fontWeight: 'bold' }}>
          Session Expired. Please log in again.
        </p>
      )}

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <p>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>

        <p>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login