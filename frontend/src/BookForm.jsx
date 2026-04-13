import { useState } from 'react';
import api from './api/axiosConfig';

function BookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    copies: '',
    price: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      await api.post('/api/books', {
        ...formData,
        copies: Number(formData.copies),
        price: Number(formData.price),
      });

      setMessage('Book added successfully.');
      setIsError(false);

      setFormData({
        title: '',
        author: '',
        copies: '',
        price: '',
      });
    } catch (error) {
      setMessage('Failed to add book.');
      setIsError(true);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <p className="section-label">Inventory Management</p>
        <h1>Add New Book</h1>
        <p className="section-subtitle">
          Add a new book record to your bookstore inventory.
        </p>

        <form className="styled-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="copies">Copies</label>
            <input
              id="copies"
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
              placeholder="Enter number of copies"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter book price"
              required
            />
          </div>

          <button className="primary-btn" type="submit">
            Add Book
          </button>
        </form>

        {message && (
          <p className={isError ? 'form-message error' : 'form-message success'}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookForm;