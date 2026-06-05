import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

import authIllustration from "../../assets/Storephoto.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checks = useMemo(
    () => ({
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    }),
    [password],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: fullName,
          email,
          password,
          address,
        },
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-brand-panel">
          <div className="brand-block">
            <div className="brand-logo">
              <span className="brand-logo-star">★</span>
            </div>
            <div>
              <h2>Store Rating</h2>
              <p>Rate. Review. Discover.</p>
            </div>
          </div>

          <div className="brand-copy">
            <h1>Join the Store Rating Platform</h1>
            <p>
              Create an account to rate stores, share your experience and help
              others make better choices.
            </p>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">☆</div>
              <div>
                <h3>Rate your favorite stores</h3>
                <p>Share honest ratings</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">◎</div>
              <div>
                <h3>Discover trusted stores</h3>
                <p>See real customer feedback</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Secure &amp; Reliable</h3>
                <p>Your data is always protected</p>
              </div>
            </div>
          </div>

          <div className="brand-illustration-wrap">
            <img
              src={authIllustration}
              alt="Store rating storefront"
              className="brand-illustration"
            />
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2>Create Your Account</h2>
              <p>Sign up to get started</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="fullName">
                    Full Name <span>*</span>
                  </label>
                  <span className="char-count">{fullName.length} / 60</span>
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  maxLength={60}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <small>Name must be between 20 and 60 characters.</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>Enter a valid email address.</small>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="address">
                    Address <span>*</span>
                  </label>
                  <span className="char-count">{address.length} / 400</span>
                </div>
                <textarea
                  id="address"
                  name="address"
                  maxLength={400}
                  rows={4}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <small>Maximum 400 characters allowed.</small>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password <span>*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "⌣" : "👁"}
                  </button>
                </div>

                <ul className="password-hints">
                  <li className={checks.length ? "is-valid" : ""}>
                    8 - 16 characters
                  </li>
                  <li className={checks.uppercase ? "is-valid" : ""}>
                    At least one uppercase letter (A-Z)
                  </li>
                  <li className={checks.special ? "is-valid" : ""}>
                    At least one special character (!@#$%^&amp;*)
                  </li>
                </ul>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password <span>*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <label
                className="checkbox-row checkbox-row-terms"
                htmlFor="terms"
              >
                <input type="checkbox" id="terms" name="terms" required/>
                <span>
                  I agree to the <Link to="/terms">Terms &amp; Conditions</Link>{" "}
                  and <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <div className="auth-divider" />

            <p className="auth-footer-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
