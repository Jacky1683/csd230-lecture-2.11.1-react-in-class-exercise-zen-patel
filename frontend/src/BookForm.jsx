import { useState } from 'react'
import api from './api/axiosConfig'

function BookForm({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    copies: '',
    price: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.copies || !formData.price) {
      setError('Please fill in all fields.')
      return
    }

    const newBook = {
      title: formData.title,
      author: formData.author,
      copies: parseInt(formData.copies),
      price: parseFloat(formData.price)
    }

    api.post('/api/books', newBook)
      .then((res) => {
        onBookAdded(res.data)
        setFormData({
          title: '',
          author: '',
          copies: '',
          price: ''
        })
        setError('')
      })
      .catch(() => {
        setError('Failed to add book')
      })
  }

  return (
    <div style={{ maxWidth: '500px', color: '#000' }}>
      <h2>Add New Book</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label>Title:</label><br />
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </p>

        <p>
          <label>Author:</label><br />
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </p>

        <p>
          <label>Copies:</label><br />
          <input type="number" name="copies" value={formData.copies} onChange={handleChange} />
        </p>

        <p>
          <label>Price:</label><br />
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
        </p>

        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default BookForm