import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const MailIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleLogin = () => {
    const e = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setDone(true);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <p className="login-label">CMS Dashboard</p>
          <h1 className="login-title">Admin sign in</h1>
        </div>

        {/* Email */}
        <div className="field">
          <label className="field-label">Email</label>
          <div className="input-wrap">
            <MailIcon />
            <input
              className={`field-input${errors.email ? " err" : ""}`}
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {errors.email && <p className="err-msg">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="field">
          <label className="field-label">Password</label>
          <div className="input-wrap">
            <LockIcon />
            <input
              className={`field-input${errors.password ? " err" : ""}`}
              type={showPw ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ paddingRight: "36px" }}
            />
            <button className="pw-toggle" onClick={() => setShowPw((v) => !v)} tabIndex={-1} type="button">
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && <p className="err-msg">{errors.password}</p>}
        </div>

        <div className="login-forgot-row">
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

        <button
          className={`btn-submit${done ? " success" : ""}`}
          onClick={handleLogin}
          disabled={done}
        >
          {done ? "✓ Signed in" : "Sign in"}
        </button>

      </div>
    </div>
  );
}