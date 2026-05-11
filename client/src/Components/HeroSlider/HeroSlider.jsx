import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/slider1.jpg";
import img2 from "../../assets/slider2.jpeg";
import img3 from "../../assets/slider3.jpeg";
import img4 from "../../assets/slider4.png";
import img5 from "../../assets/slider5.jpg";
import "../../pages/Home/Home.css";
import "./HeroSlider.css";

const SLIDES = [img1, img2, img3, img4, img5];
const INTERVAL = 5000;

export default function HeroSlider() {
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

  useEffect(() => {
    timerRef.current = setInterval(sliderNext, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  return (
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
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)}
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
  );
}
