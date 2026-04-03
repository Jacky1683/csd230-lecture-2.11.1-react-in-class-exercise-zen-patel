import { Link } from 'react-router'
import { useAuth } from './authProvider'

function Navbar() {
  const { isAdmin, isAuthenticated, logout } = useAuth()

  return (
    <nav
      style={{
        backgroundColor: '#222',
        padding: '15px',
        display: 'flex',
        gap: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}
    >
      <Link
        to="/"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Home
      </Link>

      <Link
        to="/inventory"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        View Books
      </Link>

      {isAdmin && (
        <Link
          to="/add"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Add Book
        </Link>
      )}

      <Link
        to="/magazines"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        View Magazines
      </Link>

      {isAdmin && (
        <Link
          to="/add-magazine"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Add Magazine
        </Link>
      )}

      {!isAuthenticated ? (
        <Link
          to="/login"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Login
        </Link>
      ) : (
        <button
          onClick={logout}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar