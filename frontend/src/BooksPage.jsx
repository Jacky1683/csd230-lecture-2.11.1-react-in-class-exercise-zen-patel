import { useEffect, useMemo, useState } from 'react';
import api from './api/axiosConfig';
import Book from './Book';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/books');
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load books. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError('Failed to delete book.');
    }
  };

  const filteredBooks = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return books;

    return books.filter(
      (book) =>
        book.title?.toLowerCase().includes(term) ||
        book.author?.toLowerCase().includes(term)
    );
  }, [books, searchTerm]);

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: '1000px' }}>
        <p className="section-label">Inventory</p>
        <h1>Books</h1>
        <p className="section-subtitle">
          View, search, and manage all book inventory records.
        </p>

        <div className="search-bar-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Loading books...</p>}
        {error && <p className="form-message error">{error}</p>}
        {!loading && filteredBooks.length === 0 && <p>No matching books found.</p>}

        {!loading &&
          filteredBooks.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              copies={book.copies}
              price={book.price}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default BooksPage;