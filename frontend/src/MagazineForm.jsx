import { useState } from 'react'

function MagazineForm({ onMagazineAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    orderQty: '',
    currentIssue: ''
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

    if (!formData.title || !formData.price || !formData.orderQty || !formData.currentIssue) {
      setError('Please fill in all fields.')
      return
    }

    const newMagazine = {
      title: formData.title,
      price: parseFloat(formData.price),
      orderQty: parseInt(formData.orderQty),
      currentIssue: formData.currentIssue
    }

    fetch('/api/magazines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMagazine)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add magazine')
        }
        return res.json()
      })
      .then((savedMagazine) => {
        onMagazineAdded(savedMagazine)
        setFormData({
          title: '',
          price: '',
          orderQty: '',
          currentIssue: ''
        })
        setError('')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div style={{ maxWidth: '500px', color: '#000' }}>
      <h2>Add New Magazine</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Price:</label><br />
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Order Quantity:</label><br />
          <input
            type="number"
            name="orderQty"
            value={formData.orderQty}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Current Issue:</label><br />
          <input
            type="date"
            name="currentIssue"
            value={formData.currentIssue}
            onChange={handleChange}
          />
        </p>

        <button type="submit">Add Magazine</button>
      </form>
    </div>
  )
}

export default MagazineForm