import "../../pages/Home/Home.css";
import "./Testimonials.css";

const testimonials = [
  {
    text: `"The artist's choice to paint the body, impose a narrative that explores the feminine in man, woman, plant, and animal, to commend the essence of the female, her myriad emotions, sensations and passions are more of a self-search"`,
    author: "- Avani Rao Gandra",
    role: "Artist/Curator/Writer",
  },
  {
    text: `"Felt so wonderful to meet Abhijna and am so lucky to get her book. While reading it, her paintings make deep sense and few lines are so intense that I can relate to myself."`,
    author: "- Sirisha Mulpuru",
    role: "Entrepreneur/Influencer",
  },
  {
    text: `"Felt so wonderful to meet Abhijna and am so lucky to get her book. While reading it, her paintings make deep sense and few lines are so intense that I can relate to myself."`,
    author: "- Sirisha Mulpuru",
    role: "Entrepreneur/Influencer",
  },
  {
    text: `"Abhijna picked the feminine quality as a metaphor in her works to express herself. The intermingled influences of the contemporary culture from her experiences in the US, and the culture from back home where she was raised."`,
    author: "- Lakshmi Reddy",
    role: "Artist/Professor",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="overlay"></div>

      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">{item.text}</p>

            <div className="testimonial-author">
              <span>{item.author}</span>
              <p>{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}