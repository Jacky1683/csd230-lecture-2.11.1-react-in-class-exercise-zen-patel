import { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import Book from './Book';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleUpdate = async (id, updatedBook) => {
    try {
      const response = await api.put(`/api/books/${id}`, updatedBook);
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? response.data : book))
      );
    } catch (err) {
      setError('Failed to update book.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: '1000px' }}>
        <p className="section-label">Inventory</p>
        <h1>Books</h1>
        <p className="section-subtitle">
          View, update, and manage all book inventory records.
        </p>

        {loading && <p>Loading books...</p>}
        {error && <p className="form-message error">{error}</p>}
        {!loading && books.length === 0 && <p>No books available.</p>}

        {!loading &&
          books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              copies={book.copies}
              price={book.price}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
      </div>
    </div>
  );
}

export default BooksPage;