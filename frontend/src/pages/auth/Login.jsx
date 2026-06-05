import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import authIllustration from "../../assets/Storephoto.png";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("role", response.data.role);

      localStorage.setItem("name", response.data.name);

      // redirect based on role

      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.role === "store_owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/stores");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
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
            <h1>Welcome Back to Store Rating</h1>
            <p>
              Login to manage your ratings, review stores, and continue helping
              others make smarter choices.
            </p>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">★</div>
              <div>
                <h3>Track your reviews</h3>
                <p>Pick up where you left off</p>
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
              <h2>Login to Your Account</h2>
              <p>Enter your details to continue</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
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
                <small>Use the password you created during signup.</small>
              </div>

              <div className="auth-row auth-row-space-between">
                <label className="checkbox-row" htmlFor="rememberMe">
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password" className="auth-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="auth-divider" />

            <p className="auth-footer-text">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
