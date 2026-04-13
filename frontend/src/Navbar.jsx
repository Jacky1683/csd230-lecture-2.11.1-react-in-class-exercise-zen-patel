import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './authProvider';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-mark">JB</span>
          <div>
            <h2>Jacky&apos;s Bookstore</h2>
            <p>Lab 8 Portfolio Upgrade</p>
          </div>
        </div>

        <nav className="nav-links">
          <Link className={isActive('/') ? 'nav-link active' : 'nav-link'} to="/">
            Home
          </Link>

          <Link className={isActive('/books') ? 'nav-link active' : 'nav-link'} to="/books">
            View Books
          </Link>

          <Link className={isActive('/add-book') ? 'nav-link active' : 'nav-link'} to="/add-book">
            Add Book
          </Link>

          <Link
            className={isActive('/magazines') ? 'nav-link active' : 'nav-link'}
            to="/magazines"
          >
            View Magazines
          </Link>

          <Link
            className={isActive('/add-magazine') ? 'nav-link active' : 'nav-link'}
            to="/add-magazine"
          >
            Add Magazine
          </Link>

          {!isAuthenticated ? (
            <Link className={isActive('/login') ? 'nav-link active' : 'nav-link'} to="/login">
              Login
            </Link>
          ) : (
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;