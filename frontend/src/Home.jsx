import { useEffect, useMemo, useState } from 'react';
import api from './api/axiosConfig';
import { useCart } from './CartContext';

function Home() {
  const [books, setBooks] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount } = useCart();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [booksResponse, magazinesResponse] = await Promise.all([
        api.get('/api/books'),
        api.get('/api/magazines'),
      ]);

      setBooks(booksResponse.data || []);
      setMagazines(magazinesResponse.data || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalInventoryValue = useMemo(() => {
    const booksValue = books.reduce(
      (sum, book) => sum + Number(book.price || 0) * Number(book.copies || 0),
      0
    );

    const magazinesValue = magazines.reduce(
      (sum, magazine) =>
        sum + Number(magazine.price || 0) * Number(magazine.copies || 0),
      0
    );

    return booksValue + magazinesValue;
  }, [books, magazines]);

  return (
    <div className="hero">
      <div className="hero-card">
        <p className="hero-badge">Portfolio Project</p>
        <h1>Welcome to Jacky&apos;s Bookstore</h1>
        <p className="hero-text">
          A full-stack bookstore and magazine management application built with
          React, Spring Boot, JWT authentication, RBAC, Docker, GitHub Actions,
          and Render deployment.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Books</p>
            <h2>{loading ? '...' : books.length}</h2>
          </div>

          <div className="stat-card">
            <p>Total Magazines</p>
            <h2>{loading ? '...' : magazines.length}</h2>
          </div>

          <div className="stat-card">
            <p>Cart Items</p>
            <h2>{cartCount}</h2>
          </div>

          <div className="stat-card">
            <p>Inventory Value</p>
            <h2>${loading ? '...' : totalInventoryValue.toFixed(2)}</h2>
          </div>
        </div>

        <div className="hero-grid">
          <div className="feature-card">
            <h3>Books</h3>
            <p>Manage book inventory with clean CRUD operations.</p>
          </div>

          <div className="feature-card">
            <h3>Magazines</h3>
            <p>Track magazine inventory and current issue details.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Access</h3>
            <p>Role-based access control using JWT login and protected routes.</p>
          </div>

          <div className="feature-card">
            <h3>Cloud Deployment</h3>
            <p>Containerized and deployed using Docker, CI/CD, and Render.</p>
          </div>
        </div>

        <div className="portfolio-section">
          <div className="portfolio-card">
            <h3>Project Highlights</h3>
            <ul className="portfolio-list">
              <li>Books and magazines inventory management</li>
              <li>JWT login with role-based access control</li>
              <li>Responsive UI with cart and search features</li>
              <li>Dockerized deployment with GitHub Actions CI/CD</li>
              <li>Hosted live on Render for portfolio showcase</li>
            </ul>
          </div>

          <div className="portfolio-card">
            <h3>Tech Stack</h3>
            <div className="tech-tags">
              <span>React</span>
              <span>Spring Boot</span>
              <span>Java</span>
              <span>JWT</span>
              <span>H2 Database</span>
              <span>Docker</span>
              <span>GitHub Actions</span>
              <span>Render</span>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <p>Built by Jacky Patel for CSD230 Lab 8 Portfolio Upgrade.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;