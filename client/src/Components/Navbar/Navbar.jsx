import { useState, useEffect, useRef } from "react";
import currencyCodes from "currency-codes";
import logo from "../../assets/abhijna-logo-white.svg";
import "../../pages/Home/Home.css";
import { getUserFromToken, isLoggedIn, logout } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom"; 

export default function Navbar() {
  const [currency, setCurrency] = useState("USD");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  const [user, setUser] = useState(() => {
    return isLoggedIn() ? getUserFromToken() : null;
  });

  // Update user info on component mount and listen for storage changes
  useEffect(() => {
    // Initial load
    if (isLoggedIn()) {
      const userData = getUserFromToken();
      setUser(userData);
    }

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        if (isLoggedIn()) {
          const userData = getUserFromToken();
          setUser(userData);
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userDropdownOpen]);

  const currencies = currencyCodes.data;
  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.currency.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Top decorative header bar */}
      <div className="site-top-bar">
        <div className="inside-top-bar">
          {/* LEFT - Search */}
          <div className="left">
            <div>
              <span className="icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>

          {/* CENTER - Logo */}
          <div className="center">
            <img src={logo} alt="logo" className="logo" />
          </div>

          {/* RIGHT - Actions */}
          <div className="right">
            <div className="dropdown">
              <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
                {currency} ▼
              </div>

              {open && (
                <div className="dropdown-menu">
                  <input
                    type="text"
                    placeholder="Search currency..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="dropdown-search"
                  />

                  <div className="dropdown-list">
                    {filteredCurrencies.map((c) => (
                      <div
                        key={c.code}
                        className="dropdown-item"
                        onClick={() => {
                          setCurrency(c.code);
                          setOpen(false);
                          setSearch("");
                        }}
                      >
                        {c.code} - {c.currency}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: "relative" }} ref={userDropdownRef}>
              <span
                className="icon"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                👤
              </span>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="user-dropdown-menu">
                  {user ? (
                    <>
                      <div className="user-info">
                        <div className="user-name">
                          Hi, {user.firstName || user.name}
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <div
                        className="dropdown-option"
                        onClick={() => {
                          navigate("/my-orders");
                          setUserDropdownOpen(false);
                        }}
                      >
                        📋 Orders
                      </div>
                      <div className="dropdown-divider"></div>
                      <div
                        className="dropdown-option logout"
                        onClick={() => {
                          logout();
                          setUser(null);
                          setUserDropdownOpen(false);
                          navigate("/login");
                        }}
                      >
                        🚪 Logout
                      </div>
                    </>
                  ) : (
                    <div
                      className="dropdown-option"
                      onClick={() => {
                        navigate("/login");
                        setUserDropdownOpen(false);
                      }}
                    >
                      🔐 Login
                    </div>
                  )}
                </div>
              )}
            </div>
            <span className="icon">🛒</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="site-nav">
        <Link to="/" className="nav-link">
          HOME
        </Link>

        <Link to="/art" className="nav-link">
          ART
        </Link>

        <Link to="/poster-print" className="nav-link">
          POSTER & PRINT
        </Link>

        <Link to="/shows-events" className="nav-link">
          SHOWS/EVENTS
        </Link>

        <Link to="/press" className="nav-link">
          PRESS
        </Link>

        <Link to="/contact" className="nav-link">
          CONTACT US
        </Link>
      </nav>
    </>
  );
}
