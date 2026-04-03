import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const decodeToken = (jwt) => {
    try {
      if (!jwt) return null
      const payload = jwt.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      return decoded
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  const decoded = decodeToken(token)

  let roles = []
  if (decoded?.roles) {
    roles = decoded.roles
  } else if (decoded?.authorities) {
    roles = decoded.authorities
  } else if (decoded?.role) {
    roles = [decoded.role]
  }

  const isAdmin = roles.includes('ROLE_ADMIN')

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  const value = useMemo(() => ({
    token,
    login,
    logout,
    decoded,
    roles,
    isAdmin,
    isAuthenticated: !!token
  }), [token, isAdmin, decoded])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}