import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API;

export default function SignUp() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/student-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          phone_number,
          password,
          repassword
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }else{
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('token', data.token);
      }
        
      // alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Sign Up</h2>

      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #f5c2c7',
          }}
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label><br /><br />

        <label>
          Last Name:
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label><br /><br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label><br /><br />

        <label>
          Phone Number (with country code):
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
          />
        </label><br /><br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label><br /><br />

        <label>
          Re-enter Password:
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />
        </label><br /><br />

        <button type="submit">Sign Up</button>
      </form>

      <div style={{ marginTop: 15 }}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
