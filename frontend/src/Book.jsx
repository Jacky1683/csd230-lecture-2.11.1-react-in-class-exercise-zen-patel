import { useState } from 'react'

function Book({ id, title, author, copies, price, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedAuthor, setEditedAuthor] = useState(author)
  const [editedCopies, setEditedCopies] = useState(copies)
  const [editedPrice, setEditedPrice] = useState(price)

  const handleSave = () => {
    const updatedBook = {
      title: editedTitle,
      author: editedAuthor,
      copies: parseInt(editedCopies),
      price: parseFloat(editedPrice)
    }

    onUpdate(id, updatedBook)
    setIsEditing(false)
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
          <h3>Edit Book</h3>

          <p>
            <strong>Title:</strong><br />
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </p>

          <p>
            <strong>Author:</strong><br />
            <input
              type="text"
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
            />
          </p>

          <p>
            <strong>Copies:</strong><br />
            <input
              type="number"
              value={editedCopies}
              onChange={(e) => setEditedCopies(e.target.value)}
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

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p><strong>Author:</strong> {author}</p>
          <p><strong>Copies:</strong> {copies}</p>
          <p><strong>Price:</strong> ${Number(price).toFixed(2)}</p>

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

export default Book