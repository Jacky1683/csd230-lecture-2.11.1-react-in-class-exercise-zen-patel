import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import BookForm from './BookForm';
import MagazineForm from './MagazineForm';
import Login from './Login';
import Home from './Home';
import BooksPage from './BooksPage';
import MagazinesPage from './MagazinesPage';
import Cart from './Cart';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/magazines" element={<MagazinesPage />} />
            <Route path="/add-magazine" element={<MagazineForm />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;