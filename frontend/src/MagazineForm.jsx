import { useState } from 'react';
import api from './api/axiosConfig';

function MagazineForm() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    copies: '',
    orderQty: '',
    currentIssue: '',
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
      await api.post('/api/magazines', {
        ...formData,
        price: Number(formData.price),
        copies: Number(formData.copies),
        orderQty: Number(formData.orderQty),
      });

      setMessage('Magazine added successfully.');
      setIsError(false);

      setFormData({
        title: '',
        price: '',
        copies: '',
        orderQty: '',
        currentIssue: '',
      });
    } catch (error) {
      setMessage('Failed to add magazine.');
      setIsError(true);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <p className="section-label">Inventory Management</p>
        <h1>Add New Magazine</h1>
        <p className="section-subtitle">
          Add a new magazine record with issue and ordering details.
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
              placeholder="Enter magazine title"
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
              placeholder="Enter magazine price"
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
            <label htmlFor="orderQty">Order Quantity</label>
            <input
              id="orderQty"
              type="number"
              name="orderQty"
              value={formData.orderQty}
              onChange={handleChange}
              placeholder="Enter order quantity"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentIssue">Current Issue</label>
            <input
              id="currentIssue"
              type="date"
              name="currentIssue"
              value={formData.currentIssue}
              onChange={handleChange}
              required
            />
          </div>

          <button className="primary-btn" type="submit">
            Add Magazine
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

export default MagazineForm;