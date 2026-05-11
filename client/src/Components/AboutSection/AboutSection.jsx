import "../../pages/Home/Home.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* LEFT IMAGE */}
        <div className="about-image">
          <img
            src="https://abhijna.art/wp-content/uploads/2022/06/Layer-36-2-1.png"
            alt="Artist"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-content">
          <h2>ABOUT ME</h2>

          <p>
            My name is Abhijna, and I am an artist based in San Francisco.
            My work engages with themes of feminism, womanhood, and mythology.
            While painting is my primary medium, I also incorporate fiber art
            and photography to challenge and explore the concept of femininity
            globally.
          </p>

          <p>
            I honed my craft at the Art Institute of Chicago as an undergraduate
            on a scholarship and furthered my education at the Royal College of
            Art in London, broadening my artistic viewpoint.
          </p>

          <p>
            My art has been showcased in various prestigious spaces, including
            galleries in Chicago, New York, and London. In 2022, I published
            "The Feminine," a book presenting a series of performances captured
            in photographs.
          </p>

          <p className="highlight">
            I now reside and work as a full-time artist in California's Bay
            Area.
          </p>

          <a href="/" className="cv-link">
            Full CV — Click Here
          </a>
        </div>
      </div>
    </section>
  );
}