import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../styles/auth.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    // Login API
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Store Rating Platform</h1>

        <p>Welcome back. Continue rating and discovering stores.</p>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
