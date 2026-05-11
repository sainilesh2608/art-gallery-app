import { useState } from "react";
import currencyCodes from "currency-codes";
import logo from "../../assets/abhijna-logo-white.svg";
import "../../pages/Home/Home.css";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [currency, setCurrency] = useState("USD");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
            <span
              className="icon"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              👤
            </span>
            <span className="icon">🛒</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="site-nav">
        {[
          "HOME",
          "ART",
          "POSTER & PRINT",
          "SHOWS/EVENTS",
          "PRESS",
          "CONTACT US",
        ].map((item) => (
          <a key={item} href="#" className="nav-link">
            {item}
          </a>
        ))}
      </nav>
    </>
  );
}
