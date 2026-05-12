import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { isLoggedIn } from "../../utils/auth";
import "./Login.css";


// ── Icons ──
const MailIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const LockIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const UserIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const EyeIcon = ({ open }) => open ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ── Reusable Field ──
function Field({ label, type = "text", placeholder, value, onChange, error, icon, noIcon, showToggle, onToggle, showPw }) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="input-wrap">
        {icon}
        <input
          className={`field-input${noIcon ? " no-icon" : ""}${error ? " err" : ""}`}
          type={showToggle ? (showPw ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={showToggle ? { paddingRight: "36px" } : {}}
        />
        {showToggle && (
          <button className="pw-toggle" onClick={onToggle} tabIndex={-1} type="button">
            <EyeIcon open={showPw} />
          </button>
        )}
      </div>
      {error && <p className="err-msg">{error}</p>}
    </div>
  );
}

// ── Main Component ──
export default function Login() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginDone, setLoginDone] = useState(false);

  // Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [signupErrors, setSignupErrors] = useState({});
  const [signupDone, setSignupDone] = useState(false);

  const switchMode = (m) => {
    setMode(m);
    setLoginErrors({});
    setSignupErrors({});
    setLoginDone(false);
    setSignupDone(false);
  };


const handleLogin = async () => {
  const e = {};
  if (!loginEmail || !/\S+@\S+\.\S+/.test(loginEmail)) e.email = "Enter a valid email address";
  if (!loginPw) e.pw = "Password is required";
  if (Object.keys(e).length) { setLoginErrors(e); return; }

  try {
    const res = await api.post("/auth/login", { email: loginEmail, password: loginPw });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userRole", res.data.role);

    if (res.data.role === "ADMIN") navigate("/admin/dashboard");
    else navigate("/");

    setLoginDone(true);
  } catch (err) {
    setLoginErrors({ general: err.response?.data?.message || "Login failed" });
  }
};

const handleSignup = async () => {
  const e = {};
  if (!firstName.trim()) e.firstName = "First name is required";
  if (!lastName.trim()) e.lastName = "Last name is required";
  if (!signupEmail || !/\S+@\S+\.\S+/.test(signupEmail)) e.email = "Enter a valid email address";
  if (!signupPw || signupPw.length < 8) e.pw = "Password must be at least 8 characters";
  if (signupPw !== confirmPw) e.confirmPw = "Passwords do not match";
  if (Object.keys(e).length) { setSignupErrors(e); return; }

  try {
    const res = await api.post("/auth/register", {
      name: `${firstName} ${lastName}`,
      email: signupEmail,
      password: signupPw,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userRole", res.data.role);
    navigate("/");
    setSignupDone(true);
  } catch (err) {
    setSignupErrors({ general: err.response?.data?.message || "Signup failed" });
  }
};

  return (
    <>
      <div className="auth-page">
        <div className="outer-box">
          <div className="inner-box">

            <div className="logo">
              <div className="logo-title"> 
                {/* <img src={logo} alt="logo" className="logo" /> */}
                ✦ Abhijna
                </div>

              <div className="logo-sub">Art &amp; Collectibles</div>
            </div>
            <hr className="divider" />

            <div className="toggle-row">
              <button className={`toggle-btn${mode === "login" ? " active" : ""}`} onClick={() => switchMode("login")}>Sign in</button>
              <button className={`toggle-btn${mode === "signup" ? " active" : ""}`} onClick={() => switchMode("signup")}>Sign up</button>
            </div>

            {/* ── LOGIN ── */}
            {mode === "login" && (
              <>
                <p className="heading">Welcome back</p>
                <p className="sub-text">Sign in to your collection</p>

                <Field label="Email address" type="email" placeholder="you@example.com"
                  value={loginEmail} onChange={e => { setLoginEmail(e.target.value); setLoginErrors(p => ({ ...p, email: "" })); }}
                  error={loginErrors.email} icon={<MailIcon />} />

                <Field label="Password" placeholder="Your password"
                  value={loginPw} onChange={e => { setLoginPw(e.target.value); setLoginErrors(p => ({ ...p, pw: "" })); }}
                  error={loginErrors.pw} icon={<LockIcon />}
                  showToggle showPw={showLoginPw} onToggle={() => setShowLoginPw(v => !v)} />

                <a href="#" className="forgot">Forgot password?</a>

                <button className={`btn-submit${loginDone ? " success" : ""}`} onClick={handleLogin} disabled={loginDone}>
                  {loginDone ? "✓ Signed in" : "Sign in"}
                </button>
                <p className="note">Your wishlist and cart will be waiting for you.</p>
              </>
            )}

            {/* ── SIGNUP ── */}
            {mode === "signup" && (
              <>
                <p className="heading">Create an account</p>
                <p className="sub-text">Join to collect and explore art</p>

                <div className="name-row">
                  <Field label="First name" placeholder="Priya"
                    value={firstName} onChange={e => { setFirstName(e.target.value); setSignupErrors(p => ({ ...p, firstName: "" })); }}
                    error={signupErrors.firstName} icon={<UserIcon />} />
                  <Field label="Last name" placeholder="Sharma"
                    value={lastName} onChange={e => { setLastName(e.target.value); setSignupErrors(p => ({ ...p, lastName: "" })); }}
                    error={signupErrors.lastName} noIcon />
                </div>

                <Field label="Email address" type="email" placeholder="you@example.com"
                  value={signupEmail} onChange={e => { setSignupEmail(e.target.value); setSignupErrors(p => ({ ...p, email: "" })); }}
                  error={signupErrors.email} icon={<MailIcon />} />

                <Field label="Password" placeholder="Min. 8 characters"
                  value={signupPw} onChange={e => { setSignupPw(e.target.value); setSignupErrors(p => ({ ...p, pw: "" })); }}
                  error={signupErrors.pw} icon={<LockIcon />}
                  showToggle showPw={showSignupPw} onToggle={() => setShowSignupPw(v => !v)} />

                <Field label="Confirm password" placeholder="Re-enter your password"
                  value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setSignupErrors(p => ({ ...p, confirmPw: "" })); }}
                  error={signupErrors.confirmPw} icon={<LockIcon />}
                  showToggle showPw={showConfirmPw} onToggle={() => setShowConfirmPw(v => !v)} />

                {/* Newsletter */}
                <div className="newsletter-row">
                  <input type="checkbox" className="newsletter-cb" id="newsletter"
                    checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                  <label htmlFor="newsletter" className="newsletter-label">
                    Keep me updated on new artworks &amp; exhibitions
                    <span>Curated picks, upcoming shows, and artist stories — no spam, ever.</span>
                  </label>
                </div>

                <button className={`btn-submit${signupDone ? " success" : ""}`} onClick={handleSignup} disabled={signupDone}>
                  {signupDone ? "✓ Account created!" : "Create account"}
                </button>
                <p className="note">By signing up you agree to our terms &amp; privacy policy.</p>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}