import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authProvider';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      login(response.data.token);
      setMessage('Login successful.');
      setIsError(false);

      setTimeout(() => {
        navigate('/books');
      }, 500);
    } catch (error) {
      setMessage('Invalid username or password.');
      setIsError(true);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <p className="section-label">Account Access</p>
        <h1>Login</h1>
        <p className="section-subtitle">
          Sign in to manage bookstore inventory and protected features.
        </p>

        <form className="styled-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="primary-btn" type="submit">
            Login
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

export default Login;