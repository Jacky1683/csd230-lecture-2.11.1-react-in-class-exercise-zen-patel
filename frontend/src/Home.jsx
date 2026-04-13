function Home() {
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
      </div>
    </div>
  );
}

export default Home;