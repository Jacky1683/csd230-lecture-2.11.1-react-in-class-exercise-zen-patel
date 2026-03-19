import { Link } from 'react-router'

function Navbar() {
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

      <Link
        to="/add"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Add Book
      </Link>

      <Link
        to="/magazines"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        View Magazines
      </Link>

      <Link
        to="/add-magazine"
        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Add Magazine
      </Link>
    </nav>
  )
}

export default Navbar