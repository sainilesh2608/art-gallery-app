// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import "../App.css";
import "./Home.css";
import currencyCodes from "currency-codes";
import logo from "../assets/abhijna-logo-white.svg";
import img1 from "../assets/slider1.jpg";
import img2 from "../assets/slider2.jpeg";
import img3 from "../assets/slider3.jpeg";
import img4 from "../assets/slider4.png";
import img5 from "../assets/slider5.jpg";

// ─── Flower palette data for the mosaic grid ───────────────────────────
// const MOSAIC_COLORS = [
//   // Row 1
//   ["#2d4a3e", "#5a7a6e", "#8ab0a0"], // blue-violet bouquet tones
//   ["#f5f0e8", "#e8e0d0", "#c8c0b0"], // white lilies
//   ["#f5f0e8", "#e0d8c8", "#b8b0a0"], // soft white
//   ["#9e6a8e", "#c89ac0", "#7a4a6a"], // purple lavender
//   ["#f5f0e8", "#e8e0d0", "#c8c0b0"], // white arrangement

//   // Row 2
//   ["#8e2a1a", "#c04030", "#e85040"], // red tulips
//   ["#9e6a8e", "#c89ac0", "#7a4a6a"], // purple mix
//   ["#9e6a8e", "#8a5a7a", "#c890b0"], // purple pink
//   ["#c04030", "#e85040", "#9e2a1a"], // vibrant red
//   ["#d4a860", "#b88840", "#a07030"], // golden warm

//   // Row 3
//   ["#c8b020", "#e8d030", "#a09010"], // yellow sunflowers
//   ["#f5f0e8", "#e0d8d0", "#c8c0b8"], // white soft
//   ["#c8a080", "#d8b898", "#b88870"], // peach blush
//   ["#f5f0e8", "#e8e0d8", "#d0c8c0"], // cream white
//   ["#3a5a30", "#5a8040", "#2a4020"], // deep green ferns

//   // Row 4
//   ["#c04858", "#e06878", "#a03848"], // pink roses
//   ["#c08090", "#e0a0b0", "#a07080"], // blush pink
//   ["#c04030", "#e05040", "#9e3020"], // red garden
//   ["#d4a860", "#c89850", "#b88840"], // warm orange
//   ["#9e6a8e", "#b87a9e", "#7a4a6a"], // purple-pink

//   // Row 5
//   ["#d4a030", "#e8b840", "#b88820"], // golden orange
//   ["#c04848", "#e06060", "#a03030"], // deep red
//   ["#9e6a8e", "#c890b8", "#7a5088"], // lavender
//   ["#c8b020", "#dac030", "#a89010"], // yellow
//   ["#4a3a2a", "#6a5a4a", "#3a2a1a"], // dark moody
// ];

const artworks = [
  {
    title: "Wild Iris and Wisteria",
    img: "images/bodypaint-1.jpg",
  },
  {
    title: "Les Douce Fleurs",
    img: "images/bodypaint-2.jpg",
  },
  {
    title: "Parisian Spring Bouquet",
    img: "images/bodypaint-3.jpg",
  },
  {
    title: "Tulipes Chandeliers",
    img: "images/bodypaint-4.jpeg",
  },
  {
    title: "Forged Tulips from Provence",
    img: "images/bodypaint-5.jpeg",
  },
  {
    title: "Field of Tulips",
    img: "images/bodypaint-6.jpeg",
  },
];
const Paperartworks = [
  {
    title: "Wild Iris and Wisteria",
    img: "images/paperart-1.jpg",
  },
  {
    title: "Les Douce Fleurs",
    img: "images/paperart-2.jpg",
  },
  {
    title: "Parisian Spring Bouquet",
    img: "images/paperart-3.jpg",
  },
  {
    title: "Tulipes Chandeliers",
    img: "images/paperart-4.jpg",
  },
  {
    title: "Forged Tulips from Provence",
    img: "images/paperart-5.jpg",
  },
  {
    title: "Field of Tulips",
    img: "images/paperart-6.jpeg",
  },
];

//slider images
const SLIDES = [img1, img2, img3, img4, img5];
const INTERVAL = 5000;

// Mosaic cell with gradient fill simulating flower photography
// function MosaicCell({ colors, index }) {
//   const [c1, c2, c3] = colors;
//   const angle = 110 + ((index * 23) % 70);
//   return (
//     <div className="mosaic-item">
//       <div
//         className="mosaic-placeholder"
//         style={{
//           background: `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
//         }}
//       />
//     </div>
//   );
// }

// Ornate frame with gradient border
function FramedArt({
  size = "md",
  colors = ["#5a7a6e", "#8ab0a0", "#3a5a4e"],
}) {
  const sizeClass =
    size === "sm"
      ? "framed-art-sm"
      : size === "lg"
        ? "framed-art-lg"
        : "framed-art-md";
  const [c1, c2, c3] = colors;
  return (
    <div className={`framed-art ${sizeClass}`}>
      <div
        className="framed-art-inner"
        style={{
          background: `linear-gradient(145deg, ${c1} 0%, ${c2} 45%, ${c3} 100%)`,
        }}
      />
    </div>
  );
}

// Artist card with colored block image and text
function ArtistCard({ bgColors, title, excerpt }) {
  return (
    <div className="artist-card">
      <div className="artist-card-img" style={{ overflow: "hidden" }}>
        <div
          className="artist-card-img-inner"
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(145deg, ${bgColors[0]} 0%, ${bgColors[1]} 60%, ${bgColors[2]} 100%)`,
            aspectRatio: "4/3",
          }}
        />
      </div>
      <div className="artist-card-title">{title}</div>
      <div className="artist-card-body">{excerpt}</div>
      <button className="btn" style={{ marginTop: "0.3rem" }}>
        Shop Now
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function Home() {
  // Scroll-reveal
  const revealRefs = useRef([]);
  // Slider state
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index, dir = 1) => {
    if (animating) return;
    setDirection(dir);
    setPrev(current);
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  };
  const sliderNext = () => goTo((current + 1) % SLIDES.length, 1);
  const sliderGoIdx = (i) => goTo(i, i > current ? 1 : -1);

  // ✅ Currency Dropdown State
  const [currency, setCurrency] = useState("USD");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currencies = currencyCodes.data;

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.currency.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(sliderNext, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  return (
    <div className="home">
      {/* ── Top decorative header bar ── */}
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
            {/* or text/logo icon */}
            {/* <span className="logo-text">✦</span> */}
          </div>

          {/* RIGHT - Actions */}
          <div className="right">
            <div className="dropdown">
              <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
                {currency} ▼
              </div>

              {open && (
                <div className="dropdown-menu">
                  {/* 🔍 Search */}
                  <input
                    type="text"
                    placeholder="Search currency..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="dropdown-search"
                  />

                  {/* 🌍 Currency List */}
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
            <span className="icon">👤</span>
            <span className="icon">🛒</span>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="site-nav">
        {[
          "MENU",
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

      {/* ── Hero — Polaroid Studio Artifacts ── */}
      <section className="home-hero">
        <div className="home-hero-bg" />

        {SLIDES.map((src, i) => (
          <div
            key={i}
            className={`hero-slide ${
              i === current
                ? animating
                  ? `slide-enter slide-enter-${direction > 0 ? "right" : "left"}`
                  : "slide-active"
                : i === prev
                  ? `slide-exit slide-exit-${direction > 0 ? "left" : "right"}`
                  : "slide-hidden"
            }`}
          >
            <img src={src} alt="" />
            <div className="slide-vignette" />
          </div>
        ))}

        <div className="hero-zoom-ring" key={current} />

        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? "active" : ""}`}
              onClick={() => sliderGoIdx(i)}
            />
          ))}
        </div>

        <button
          className="hero-arrow hero-arrow-left"
          onClick={() =>
            goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)
          }
        >
          &#8592;
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={sliderNext}>
          &#8594;
        </button>

        <div className="hero-progress">
          <div className="hero-progress-fill" key={current} />
        </div>
      </section>
      {/* ── Ornate Divider ── */}
      <div className="ornate-divider">
        <span>✦ ✦ ✦</span>
      </div>

      {/* ── Mosaic Photo Grid ── */}
      <section className="home-mosaic-section">
        <div className="gallery-section">
          <h2 className="gallery-title">Living Canvases</h2>

          <div className="gallery-grid">
            {artworks.map((art, i) => (
              <div className="gallery-card" key={i}>
                <img src={art.img} alt={art.title} />
                <div className="overlay">
                  <span>{art.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="quote-section">
            <h3>VOGUE</h3>
            <p>
              “Color does not merely decorate the body—it reveals the stories it
              carries.”
            </p>
            <span>— Contemporary Body Art Series, VOGUE MAGAZINE</span>
          </div>
        </div>
      </section>

       <div className="ornate-divider">
        <span>✦ ✦ ✦</span>
      </div>

      <section className="home-mosaic-section">
        <div className="gallery-section">
          <h2 className="gallery-title">Whimsical Worlds</h2>

          <div className="gallery-grid">
            {Paperartworks.map((art, i) => (
              <div className="gallery-card" key={i}>
                <img src={art.img} alt={art.title} />
                <div className="overlay">
                  <span>{art.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="quote-section">
            <h3>VOGUE</h3>
            <p>
             “Each painting is not a scene, but a story—woven from imagination, memory, and myth.”
            </p>
            <span>— Contemporary Body Art Series, VOGUE MAGAZINE</span>
          </div>
        </div>
      </section>

      {/* ── Framed Artwork Section ── */}
      <section className="home-framed-section">
        <div
          ref={addReveal}
          className="reveal"
          style={{ zIndex: 2, textAlign: "center", position: "relative" }}
        >
          <p className="home-hero-eyebrow" style={{ marginBottom: "0.4rem" }}>
            Studio Collection
          </p>
          <h2 className="home-framed-title">Framed Originals</h2>
          <p className="home-framed-sub">
            Oil on canvas — each piece signed and framed in hand-gilded ornate
            frames
          </p>
        </div>

        <div className="home-framed-row" ref={addReveal}>
          <FramedArt size="sm" colors={["#c8a060", "#e0b870", "#a07840"]} />
          <FramedArt size="lg" colors={["#9e6a8e", "#c890b8", "#7a4a6a"]} />
          <FramedArt size="md" colors={["#c04848", "#e06860", "#a03830"]} />
          <FramedArt size="sm" colors={["#4a7a60", "#6a9e78", "#3a5a48"]} />
        </div>

        <div
          className="home-framed-row"
          ref={addReveal}
          style={{ transitionDelay: "0.15s" }}
        >
          <FramedArt size="md" colors={["#c8b020", "#e0ca30", "#a09010"]} />
          <FramedArt size="sm" colors={["#8a6a9e", "#a888c0", "#6a4a7a"]} />
          <FramedArt size="lg" colors={["#5a7a6e", "#8aaa9e", "#3a5a4e"]} />
          <FramedArt size="sm" colors={["#b86840", "#d08860", "#906030"]} />
          <FramedArt size="md" colors={["#c04030", "#e05848", "#9e2820"]} />
        </div>

        <div style={{ position: "relative", zIndex: 2, marginTop: "1.2rem" }}>
          <button className="home-hero-btn">View All Framed Pieces</button>
        </div>
      </section>

      {/* ── Print Drop 2025 ── */}
      <section className="home-print-drop" ref={addReveal}>
        <div className="home-print-drop-bg" />

        {/* Decorative bokeh shapes */}
        <svg
          className="fruit-deco"
          viewBox="0 0 300 220"
          width="380"
          height="280"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Raspberry cluster — soft circles */}
          {[
            [150, 100, 38],
            [185, 88, 30],
            [120, 92, 26],
            [155, 132, 28],
            [188, 122, 24],
            [122, 126, 22],
            [170, 112, 20],
            [135, 110, 24],
            [162, 90, 18],
            [143, 135, 16],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={`hsl(${355 + ((i * 4) % 12)},${62 + ((i * 3) % 18)}%,${35 + ((i * 5) % 15)}%)`}
              opacity={0.72 - i * 0.03}
            />
          ))}
          {/* Highlight dots */}
          {[
            [148, 95, 4],
            [183, 84, 3],
            [118, 87, 3],
            [152, 128, 4],
            [186, 118, 3],
          ].map(([cx, cy, r], i) => (
            <circle
              key={`h${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(255,255,255,0.45)"
            />
          ))}
          {/* Stem */}
          <path
            d="M150,62 C148,75 152,80 150,100"
            stroke="#5a7a30"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaf */}
          <ellipse
            cx="158"
            cy="68"
            rx="14"
            ry="7"
            fill="#6a9a40"
            opacity="0.8"
            transform="rotate(-25,158,68)"
          />
        </svg>

        <div className="home-print-drop-content">
          <p className="home-print-drop-tag">Limited Edition</p>
          <h2 className="home-print-drop-title">Print Drop 2025</h2>
          <p className="home-print-drop-body">
            Botanical fine art prints on 310gsm cotton rag — archival pigment
            ink, signed and numbered editions of 50. Each drop available for 72
            hours only.
          </p>
          <button
            className="home-hero-btn"
            style={{
              borderColor: "var(--clr-charcoal)",
              color: "var(--clr-charcoal)",
            }}
          >
            Notify Me
          </button>
        </div>
      </section>

      {/* ── Featured Banner — Sunflower print ── */}
      <section className="home-featured-banner">
        <div className="home-featured-banner-bg" />

        {/* Sunflower rendered with SVG overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 900 220"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Stems */}
          {[120, 280, 450, 620, 780].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={220}
              x2={x + (i % 2 ? -15 : 15)}
              y2={40}
              stroke={`hsl(90,${55 + i * 5}%,${28 + i * 4}%)`}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          {/* Leaves */}
          {[120, 280, 450, 620, 780].map((x, i) => (
            <g key={`l${i}`}>
              <ellipse
                cx={x + 30}
                cy={140 - ((i * 8) % 40)}
                rx="32"
                ry="14"
                fill="#6a9030"
                opacity="0.85"
                transform={`rotate(${30 + ((i * 20) % 40)},${x + 30},${140 - ((i * 8) % 40)})`}
              />
              <ellipse
                cx={x - 28}
                cy={160 - ((i * 6) % 30)}
                rx="28"
                ry="12"
                fill="#5a8028"
                opacity="0.75"
                transform={`rotate(${-35 - ((i * 15) % 30)},${x - 28},${160 - ((i * 6) % 30)})`}
              />
            </g>
          ))}
          {/* Flower heads */}
          {[120, 280, 450, 620, 780].map((x, i) => {
            const y = 48 + (i % 3) * 18;
            const r = 38 + (i % 2) * 14;
            return (
              <g key={`f${i}`}>
                {/* Petals */}
                {Array.from({ length: 14 }).map((_, p) => {
                  const a = (p / 14) * Math.PI * 2;
                  return (
                    <ellipse
                      key={p}
                      cx={x + Math.cos(a) * r * 0.78}
                      cy={y + Math.sin(a) * r * 0.78}
                      rx={r * 0.28}
                      ry={r * 0.14}
                      fill={`hsl(${42 + ((i * 4) % 18)},${85 + i * 3}%,${52 + i * 2}%)`}
                      transform={`rotate(${(a * 180) / Math.PI},${x + Math.cos(a) * r * 0.78},${y + Math.sin(a) * r * 0.78})`}
                      opacity="0.9"
                    />
                  );
                })}
                {/* Center */}
                <circle
                  cx={x}
                  cy={y}
                  r={r * 0.36}
                  fill={`hsl(${28 + i * 6},${65 + i * 4}%,${22 + i * 3}%)`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={r * 0.22}
                  fill={`hsl(${22 + i * 4},60%,18%)`}
                />
              </g>
            );
          })}
        </svg>

        <button className="home-featured-cta">Shop This Print →</button>
      </section>

      {/* ── Botanical Full-bleed — Lily of the Valley ── */}
      <section className="home-botanical" style={{ minHeight: "440px" }}>
        <div className="home-botanical-bg" />

        {/* Botanical illustration overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 900 440"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Large background leaves */}
          {[
            [300, 380, 180, 70, -25, 0.55],
            [600, 400, 200, 65, -40, 0.5],
            [120, 420, 160, 58, 15, 0.45],
            [750, 380, 170, 62, 30, 0.48],
            [450, 430, 190, 72, -10, 0.52],
          ].map(([cx, cy, rx, ry, rot, op], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill={`hsl(${125 + i * 6},${45 + i * 4}%,${22 + i * 3}%)`}
              opacity={op}
              transform={`rotate(${rot},${cx},${cy})`}
            />
          ))}

          {/* Lily of the Valley stems + bells */}
          {[180, 340, 480, 640, 800].map((bx, bi) => {
            const baseY = 440;
            const topY = 80 + (bi % 3) * 60;
            const bells = 6 + (bi % 3);
            return (
              <g key={`s${bi}`}>
                {/* Stem */}
                <path
                  d={`M${bx},${baseY} C${bx + 20},${baseY - 120} ${bx - 15},${topY + 100} ${bx},${topY}`}
                  stroke={`hsl(130,${50 + bi * 4}%,${30 + bi * 3}%)`}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Bell flowers */}
                {Array.from({ length: bells }).map((_, fi) => {
                  const t = fi / (bells - 1);
                  // Bezier point approximation
                  const fx =
                    bx + 20 * (1 - t) * t * 2 + -15 * t * t * 2 + 0 * t * t * t;
                  const fy =
                    baseY * (1 - t) * (1 - t) * (1 - t) +
                    (baseY - 120) * 3 * (1 - t) * (1 - t) * t +
                    (topY + 100) * 3 * (1 - t) * t * t +
                    topY * t * t * t;
                  return (
                    <g
                      key={fi}
                      transform={`translate(${fx + 18 * (1 - t * 0.5)},${fy})`}
                    >
                      <ellipse
                        rx={6 + t * 2}
                        ry={10 + t * 3}
                        fill="rgba(255,255,255,0.82)"
                      />
                      <ellipse
                        rx={3}
                        ry={5}
                        cy={4}
                        fill="rgba(255,255,255,0.4)"
                      />
                    </g>
                  );
                })}
                {/* Leaf pair at base */}
                <ellipse
                  cx={bx - 50}
                  cy={baseY - 80}
                  rx={70}
                  ry={20}
                  fill={`hsl(128,48%,25%)`}
                  opacity={0.7}
                  transform={`rotate(-20,${bx - 50},${baseY - 80})`}
                />
                <ellipse
                  cx={bx + 55}
                  cy={baseY - 90}
                  rx={65}
                  ry={18}
                  fill={`hsl(130,45%,22%)`}
                  opacity={0.65}
                  transform={`rotate(22,${bx + 55},${baseY - 90})`}
                />
              </g>
            );
          })}

          {/* Soft light overlay at bottom */}
          <defs>
            <radialGradient id="vignette" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="rgba(200,230,190,0.12)" />
              <stop offset="100%" stopColor="rgba(30,60,30,0)" />
            </radialGradient>
          </defs>
          <rect width="900" height="440" fill="url(#vignette)" />
        </svg>

        <div
          ref={addReveal}
          className="reveal"
          style={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.7)",
              marginBottom: "0.5rem",
            }}
          >
            Seasonal Edition
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem,3vw,2.6rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--clr-warm-white)",
              marginBottom: "1.2rem",
            }}
          >
            Lily of the Valley
          </h2>
          <button className="home-hero-btn">Explore Botanicals</button>
        </div>
      </section>

      {/* ── Artist Profile Cards ── */}
      <section className="home-artist-section">
        <div ref={addReveal} className="reveal" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--clr-stone)",
              marginBottom: "0.4rem",
            }}
          >
            Meet the Studio
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem,2.8vw,2.4rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--clr-charcoal)",
            }}
          >
            The Artist Behind the Blooms
          </h2>
        </div>

        <div className="home-artist-cards">
          <ArtistCard
            bgColors={["#d4b8a0", "#c0a080", "#e8c8a8"]}
            title="Studio Process"
            excerpt="Each arrangement is composed at golden hour — natural diffused light, hand-gathered seasonal flowers, and a medium-format film camera."
          />
          <ArtistCard
            bgColors={["#a8c0b0", "#8aa898", "#c0d8c8"]}
            title="Fine Art Prints"
            excerpt="Archival pigment on cotton rag, with a lifespan exceeding 100 years. Every print is individually examined before shipping."
          />
          <ArtistCard
            bgColors={["#c8a898", "#b89888", "#e0c0b0"]}
            title="Original Paintings"
            excerpt="Oil on linen, inspired by Dutch Golden Age florals. Available as originals or high-quality museum reproductions."
          />
        </div>

        <div className="ornate-divider">
        <span>✦ ✦ ✦</span>
      </div>
      </section>

      {/* ── Tulip Footer Banner ── */}
      <section className="home-tulip-banner">
        <div className="home-tulip-banner-bg" />
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 900 180"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Tulip shapes */}
          {[80, 200, 350, 520, 680, 820].map((tx, ti) => {
            const h = 80 + (ti % 3) * 25;
            const w = 38 + (ti % 2) * 14;
            return (
              <g key={ti}>
                {/* Stem */}
                <line
                  x1={tx}
                  y1={180}
                  x2={tx + (ti % 2 ? 8 : -8)}
                  y2={180 - h}
                  stroke={`hsl(130,${45 + ti * 4}%,${22 + ti * 3}%)`}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Leaf */}
                <ellipse
                  cx={tx + (ti % 2 ? 28 : -28)}
                  cy={180 - h / 2}
                  rx={30}
                  ry={11}
                  fill={`hsl(128,${46 + ti * 3}%,${24 + ti * 2}%)`}
                  opacity={0.8}
                  transform={`rotate(${ti % 2 ? 30 : -30},${tx + (ti % 2 ? 28 : -28)},${180 - h / 2})`}
                />
                {/* Tulip head */}
                <path
                  d={`
                    M${tx},${180 - h - 20}
                    C${tx - w},${180 - h - 20} ${tx - w},${180 - h - 20 - 40} ${tx},${180 - h - 20 - 55}
                    C${tx + w},${180 - h - 20 - 40} ${tx + w},${180 - h - 20} ${tx},${180 - h - 20}
                  `}
                  fill={`hsl(${355 + ((ti * 10) % 20)},${70 + ti * 4}%,${38 + ti * 3}%)`}
                  opacity="0.9"
                />
                <path
                  d={`
                    M${tx},${180 - h - 20}
                    C${tx - w / 2},${180 - h - 20 - 10} ${tx - w / 2},${180 - h - 20 - 38} ${tx},${180 - h - 20 - 52}
                    C${tx + w / 2},${180 - h - 20 - 38} ${tx + w / 2},${180 - h - 20 - 10} ${tx},${180 - h - 20}
                  `}
                  fill={`hsl(${350 + ((ti * 8) % 18)},${75 + ti * 3}%,${50 + ti * 2}%)`}
                  opacity="0.5"
                />
              </g>
            );
          })}
        </svg>
      </section>
    </div>
  );
}
