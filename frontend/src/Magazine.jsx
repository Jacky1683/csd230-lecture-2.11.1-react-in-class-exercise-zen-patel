import { useState } from 'react'

function Magazine({ id, title, price, orderQty, currentIssue, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedPrice, setEditedPrice] = useState(price)
  const [editedOrderQty, setEditedOrderQty] = useState(orderQty)
  const [editedCurrentIssue, setEditedCurrentIssue] = useState(
    currentIssue ? currentIssue.substring(0, 10) : ''
  )

  const handleSave = () => {
    const updatedMagazine = {
      title: editedTitle,
      price: parseFloat(editedPrice),
      orderQty: parseInt(editedOrderQty),
      currentIssue: editedCurrentIssue
    }

    onUpdate(id, updatedMagazine)
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return dateString.substring(0, 10)
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#f9f9f9',
      color: '#000'
    }}>
      {isEditing ? (
        <>
          <h3>Edit Magazine</h3>

          <p>
            <strong>Title:</strong><br />
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </p>

          <p>
            <strong>Price:</strong><br />
            <input
              type="number"
              step="0.01"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </p>

          <p>
            <strong>Order Quantity:</strong><br />
            <input
              type="number"
              value={editedOrderQty}
              onChange={(e) => setEditedOrderQty(e.target.value)}
            />
          </p>

          <p>
            <strong>Current Issue:</strong><br />
            <input
              type="date"
              value={editedCurrentIssue}
              onChange={(e) => setEditedCurrentIssue(e.target.value)}
            />
          </p>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p><strong>Price:</strong> ${Number(price).toFixed(2)}</p>
          <p><strong>Order Quantity:</strong> {orderQty}</p>
          <p><strong>Current Issue:</strong> {formatDate(currentIssue)}</p>

          <button onClick={() => setIsEditing(true)}>Update</button>
          <button
            onClick={() => onDelete(id)}
            style={{ marginLeft: '10px', backgroundColor: '#d9534f', color: 'white' }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}

export default Magazine