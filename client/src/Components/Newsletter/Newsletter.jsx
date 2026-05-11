import "../../pages/Home/Home.css";

export default function Newsletter() {
  return (
    <>
      <section className="featured-art-section">
        {/* LEFT CONTENT */}
        <div className="featured-art-content">
          <span className="mini-title">LATEST COLLECTION</span>

          <h2>Whispers Through Color</h2>

          <p>
            A contemporary exploration of femininity, mythology, and emotional
            memory through layered textures and expressive brushwork.
          </p>

          <button>EXPLORE ARTWORKS</button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="featured-art-image">
          <img src="images/featured-art-img.jpg" alt="Artist" />
        </div>
      </section>

      {/* NEWSLETTER FOOTER SECTION */}
      <section className="newsletter-footer-section">
        <div className="newsletter-overlay"></div>

        <div className="newsletter-wrapper">
          {/* LEFT TEXT */}
          <div className="newsletter-text">
            <h2>Studio Notes</h2>

            <p>
              Receive updates about exhibitions, new paintings,
              behind-the-scenes process stories, and upcoming collections.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email Address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  );
}