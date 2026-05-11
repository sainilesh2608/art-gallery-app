import "../../pages/Home/Home.css";
import "./FeaturedSection.css";

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

const paperArtworks = [
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

const logos = [
  "VOGUE",
  "The New York Times",
  "Forbes",
  "FORTUNE",
  "FAIRE",
  "TRAVEL + LEISURE",
  "FRANCE-AMÉRIQUE",
  "Condé Nast Traveler",
];

function GallerySection({ title, artworksList, quote, quoteAuthor }) {
  return (
    <section className="home-mosaic-section">
      <div className="gallery-section">
        <h2 className="gallery-title">{title}</h2>

        <div className="gallery-grid">
          {artworksList.map((art, i) => (
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
          <p>{quote}</p>
          <span>{quoteAuthor}</span>
        </div>
      </div>
    </section>
  );
}

export default function FeaturedSection() {
  return (
    <>
      <GallerySection
        title="Living Canvases"
        artworksList={artworks}
        quote="Color does not merely decorate the body—it reveals the stories it carries."
        quoteAuthor="— Contemporary Body Art Series, VOGUE MAGAZINE"
      />

      <div className="ornate-divider">
        <span>✦ ✦ ✦</span>
      </div>

      <GallerySection
        title="Whimsical Worlds"
        artworksList={paperArtworks}
        quote="Each painting is not a scene, but a story—woven from imagination, memory, and myth."
        quoteAuthor="— Contemporary Body Art Series, VOGUE MAGAZINE"
      />

      <div className="ornate-divider">
        <span>✦ ✦ ✦</span>
      </div>

      <section className="featured-section">
        <div className="featured-title">
          <span></span>
          <h3>Featured in</h3>
          <span></span>
        </div>

        <div className="featured-grid">
          {logos.map((logo, index) => (
            <div className="logo-item" key={index}>
              {logo}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
