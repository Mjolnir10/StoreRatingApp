import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (formData.name.length < 20 || formData.name.length > 60) {
      newErrors.name = "Name must be between 20 and 60 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    if (formData.address.length > 400) {
      newErrors.address = "Address cannot exceed 400 characters";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase & special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Store Rating Platform</h1>

        <p>
          Rate stores, discover trusted businesses and share your experience.
        </p>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span>{errors.name}</span>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span>{errors.email}</span>

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <span>{errors.address}</span>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span>{errors.password}</span>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span>{errors.confirmPassword}</span>

          <div className="checkbox-group">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              checked={formData.terms || false}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I agree to the Terms & Conditions and Privacy Policy
            </label>
          </div>
          <span>{errors.terms}</span>

          <button type="submit">Create Account</button>

          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
