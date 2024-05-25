import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import person1 from "../assets/images/person1.jpg";
import person2 from "../assets/images/person2.jpg";
import person3 from "../assets/images/person3.jpg";
import person4 from "../assets/images/person4.jpg";

const images = [person1, person2];
const images1 = [person4, person3];
const content = [
  {
    name: "John",
    role: "Event Manager",
    para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quaerat quibusdam ",
  },
  {
    name: "Lara",
    role: "Founder ",
    para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quaerat quibusdam ",
  },
];
const content1 = [
  {
    name: "Stokes",
    role: "Director",
    para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quaerat quibusdam ",
  },
  {
    name: "Enitha",
    role: "Co-Founder ",
    para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quaerat quibusdam ",
  },
];

function Slider_worker() {
  const combinedSlides = images.map((img, i) => ({
    image1: img,
    image2: images1[i],
    content1: content[i],
    content2: content1[i],
  }));

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
      verticalSwipe="standard"
      axis="vertical" // Set the axis to vertical
      className="hover-pointer"
    >
      {combinedSlides.map((slide, i) => (
        <div key={i} className="style-banner">
          <div className="banner-image">
            <div className="border">
              <img
                src={slide.image1}
                className="image-slider"
                alt="Slider"
                style={{ height: "40vh", width: "40vh", borderRadius: "90%" }}
              />
            </div>
            <div
              style={{
                color: "white",
                margin: "5%",
                textAlign: "justify",
                width: "40%",
              }}
            >
              <h2>{slide.content1.name}</h2>
              <hr />
              <p style={{ fontSize: "small", fontWeight: "lighter" }}>
                {slide.content1.role}
              </p>
              <p style={{ paddingTop: "4%" }}>{slide.content1.para}</p>
            </div>
          </div>

          <div className="banner-image">
            <div className="border">
              <img
                src={slide.image2}
                className="image-slider"
                alt="Slider"
                style={{ height: "40vh", width: "40vh", borderRadius: "90%" }}
              />
            </div>
            <div
              style={{
                color: "white",
                margin: "5%",
                textAlign: "justify",
                width: "40%",
              }}
            >
              <h2>{slide.content2.name}</h2>
              <hr />
              <p style={{ fontSize: "small", fontWeight: "lighter" }}>
                {slide.content2.role}
              </p>
              <p style={{ paddingTop: "4%" }}>{slide.content2.para}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default Slider_worker;
