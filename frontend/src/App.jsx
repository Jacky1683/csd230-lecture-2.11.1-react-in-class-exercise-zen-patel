import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not fetch books')
        }
        return res.json()
      })
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook])
  }

  const handleDeleteBook = (id) => {
    if (!window.confirm('Delete this book?')) return

    fetch(`/api/books/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete book')
        }
        setBooks(books.filter((book) => book.id !== id))
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const handleUpdateBook = (id, updatedData) => {
    fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update book')
        }
        return res.json()
      })
      .then((updatedBook) => {
        setBooks(books.map((book) => (book.id === id ? updatedBook : book)))
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/inventory"
          element={
            <div>
              <h1>Current Book Inventory</h1>
              {books.map((book) => (
                <Book
                  key={book.id}
                  {...book}
                  onDelete={handleDeleteBook}
                  onUpdate={handleUpdateBook}
                />
              ))}
            </div>
          }
        />

        <Route
          path="/add"
          element={
            <div>
              <h1>Add Book</h1>
              <BookForm onBookAdded={handleAddBook} />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App