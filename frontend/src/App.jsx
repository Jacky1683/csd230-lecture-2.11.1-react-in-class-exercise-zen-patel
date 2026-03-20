import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Login from './Login'
import './App.css'
import { useAuth } from './authProvider'
import api from './api/axiosConfig'

function App() {
  const [books, setBooks] = useState([])
  const [magazines, setMagazines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { isAdmin, isAuthenticated } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const publicPaths = ['/', '/login']

    if (!isAuthenticated || publicPaths.includes(location.pathname)) {
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)

    Promise.all([
      api.get('/api/books'),
      api.get('/api/magazines')
    ])
      .then(([booksRes, magazinesRes]) => {
        setBooks(booksRes.data)
        setMagazines(magazinesRes.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [isAuthenticated, location.pathname])

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook])
  }

  const handleDeleteBook = (id) => {
    if (!window.confirm('Delete this book?')) return

    api.delete(`/api/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id))
      })
      .catch(() => {
        alert('Failed to delete book')
      })
  }

  const handleUpdateBook = (id, updatedData) => {
    api.put(`/api/books/${id}`, updatedData)
      .then((res) => {
        setBooks(books.map((book) => (book.id === id ? res.data : book)))
      })
      .catch(() => {
        alert('Failed to update book')
      })
  }

  const handleAddMagazine = (newMagazine) => {
    setMagazines([...magazines, newMagazine])
  }

  const handleDeleteMagazine = (id) => {
    if (!window.confirm('Delete this magazine?')) return

    api.delete(`/api/magazines/${id}`)
      .then(() => {
        setMagazines(magazines.filter((magazine) => magazine.id !== id))
      })
      .catch(() => {
        alert('Failed to delete magazine')
      })
  }

  const handleUpdateMagazine = (id, updatedData) => {
    api.put(`/api/magazines/${id}`, updatedData)
      .then((res) => {
        setMagazines(
          magazines.map((magazine) =>
            magazine.id === id ? res.data : magazine
          )
        )
      })
      .catch(() => {
        alert('Failed to update magazine')
      })
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Navbar />

      {error && isAuthenticated && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Error: {error}
        </p>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/inventory"
          element={
            isAuthenticated ? (
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
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/add"
          element={
            isAdmin ? (
              <div>
                <h1>Add Book</h1>
                <BookForm onBookAdded={handleAddBook} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/magazines"
          element={
            isAuthenticated ? (
              <div>
                <h1>Current Magazine Inventory</h1>
                {magazines.map((magazine) => (
                  <Magazine
                    key={magazine.id}
                    {...magazine}
                    onDelete={handleDeleteMagazine}
                    onUpdate={handleUpdateMagazine}
                  />
                ))}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/add-magazine"
          element={
            isAdmin ? (
              <div>
                <h1>Add Magazine</h1>
                <MagazineForm onMagazineAdded={handleAddMagazine} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App