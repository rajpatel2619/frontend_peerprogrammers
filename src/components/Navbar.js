// src/components/Navbar.js
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/signup">Signup</Link> |{" "}
      <Link to="/student-dashboard">Student Dashboard</Link> |{" "}
      <Link to="/teacher-dashboard">Teacher Dashboard</Link>
    </nav>
  );
}
