import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import kids from "../assets/images/kids.jpg";
import children from "../assets/images/children.jpg";

const images = [kids, children];
const messages = [
  "Life is an event , Make it memorable. Every detail matters :)",
  "Memorable events don’t just happen. They happen to be our business.",
];

function Slider() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
      className="hover-pointer"
    >
      {images.map((image, i) => (
        <div key={i}>
          <img src={image} className="image-slider" alt="Slider" />
          <h1 className="image-panel">{messages[i]}</h1>
        </div>
      ))}
    </Carousel>
  );
}

export default Slider;
