import { useEffect, useState } from "react";
import PrimarySearchAppBar from "./Nav_bar";
import Slider from "./Slider";
import service from "../assets/images/services.png";
import people from "../assets/images/people.png";
import ideas from "../assets/images/ideas.png";
import birthday1 from "../assets/images/birthday-gallery-1.jpg";
import birthday2 from "../assets/images/birthday-gallery-2.jpg";
import birthday3 from "../assets/images/birthday-gallery-3.jpg";
import birthday4 from "../assets/images/birthday-gallery-4.jpg";
import birthday5 from "../assets/images/birthday-gallery-5.jpg";
import { Puff } from "react-loader-spinner";
import Slider_worker from "./Slider_worker";
import Footer from "./Footer";
import Packages from "./Packages";
function Homepage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#ac87c5"
          ariaLabel="puff-loading"
          wrapperClass="flex-center-full loader"
        />
      ) : (
        <>
          <PrimarySearchAppBar />
          <Slider />
          <div className="flex-center-full ">
            <div className="flex-container">
              <h1>
                Welcome to <span className="text-color">HappyHub</span>
              </h1>
              <p style={{ padding: 10, textAlign: "center" }}>
                It’s all in the details . Precise coordination, extraordinary
                results . Our passion is your perfect event . Your occasion
                deserves our careful planning.
              </p>
            </div>
          </div>
          <div className="flex-container-para">
            <div className="content">
              <img src={service} alt="service"></img>
              <h2 style={{ paddingTop: 10 }}> Great Services</h2>
              <p className="content-para">
                HappyHub is a full-service event management company in Delhi
                dedicated to quality and excellence. We manage events across
                cities in India.
              </p>
            </div>
            <div className="content">
              <img src={people} alt="people"></img>
              <h2 style={{ paddingTop: 10 }}>Great People</h2>
              <p className="content-para">
                No matter what your requirement may be, our priority lies in
                gaining an understanding of how your business works, what you
                hope to achieve.
              </p>
            </div>
            <div className="content">
              <img src={ideas} alt="idea"></img>
              <h2 style={{ paddingTop: 10 }}>Great Ideas</h2>
              <p className="content-para">
                World of event management has changed tremendously in the last
                few years. We are a team of creative and innovative great
                interpersonal skills.
              </p>
            </div>
          </div>
          <div className="flex-center-full" style={{ marginTop: -10 }}>
            <div className="flex-container">
              <h1>
                <span className="text-color">HappyHub</span> Services
              </h1>
              <p style={{ padding: 10, textAlign: "center" }}>
                We make your events smart & impactful by personalised event
                management services
              </p>
            </div>
          </div>
          <div
            className="flex-center-full wrap"
            style={{
              backgroundColor: "#e6e6e6",
              paddingTop: 50,
              marginTop: 50,
            }}
          >
            <div className="flex-container" style={{ margin: 0, padding: 0 }}>
              <div
                className="flex-container"
                style={{ textAlign: "left", margin: 0 }}
              >
                <img
                  src={birthday1}
                  style={{ textAlign: "left", marginTop: 3 }}
                  height={200}
                ></img>
                <h1>Art party</h1>
                <p
                  className="content-para"
                  style={{ textAlign: "justify", marginTop: 3 }}
                >
                  Make any occasion unforgettable.Remembered always.
                </p>
              </div>
              <div className="flex-container">
                <img src={birthday2} height={200}></img>
                <h1>Pool party</h1>
                <p
                  className="content-para"
                  style={{ textAlign: "justify", marginTop: 3 }}
                >
                  Lorem ipsum dolor sit amet amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex-container" style={{ margin: 0, padding: 0 }}>
              <div className="flex-container">
                <div>
                  <img src={birthday5} height={500}></img>
                </div>
              </div>
            </div>
            <div className="flex-container" style={{ margin: 0, padding: 0 }}>
              <div
                className="flex-container"
                style={{ textAlign: "left", margin: 0 }}
              >
                <img
                  src={birthday3}
                  style={{ textAlign: "left", marginTop: 3 }}
                  height={200}
                ></img>
                <h1>Crafting</h1>
                <p
                  className="content-para"
                  style={{ textAlign: "justify", marginTop: 3 }}
                >
                  Make any occasion unforgettable.Remembered always.
                </p>
              </div>
              <div className="flex-container">
                <img src={birthday4} height={200}></img>
                <h1>Brunch</h1>
                <p
                  className="content-para"
                  style={{ textAlign: "justify", marginTop: 3 }}
                >
                  Lorem ipsum dolor sit amet amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Packages />
          </div>
          <div className="worker">
            <center style={{ paddingTop: "2%" }}>
              <h1>
                {" "}
                <span className="text-color">HappyHub</span> Team
              </h1>
            </center>
            <Slider_worker />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Homepage;
