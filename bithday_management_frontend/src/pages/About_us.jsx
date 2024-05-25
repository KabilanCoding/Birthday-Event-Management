import About_us_banner from "../components/About_us_banner";
import PrimarySearchAppBar from "../components/Nav_bar";
import service from "../assets/images/services.png";
import people from "../assets/images/people.png";
import ideas from "../assets/images/ideas.png";
import cou from "../assets/images/couple.png";
import rocket from "../assets/images/rocket.png";
import flower from "../assets/images/flower.png";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
function About_us() {
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
          <div className="about_us_banner">
            <div className="flex-center">
              <About_us_banner />
            </div>
          </div>
          <div className="flex-center-full">
            <div className="flex-container">
              <h1 style={{ margin: "3%" }}>
                We <span className="text-color">Create Events </span> that Lasts
              </h1>
              <p style={{ padding: 10, textAlign: "center" }}>
                It’s all in the details . Precise coordination, extraordinary
                results . We offer full range of Events Management Services that
                scale to your needs & budget.
              </p>
            </div>
          </div>
          <div className="flex-container-para">
            <div className="content">
              <img src={service} alt="service"></img>
              <h2 style={{ paddingTop: 10 }}> About us</h2>
              <p className="content-para">
                HappyHub is a full-service event management company in Delhi
                dedicated to quality and excellence. We manage events across
                cities in India.
              </p>
            </div>
            <div className="content">
              <img src={people} alt="people"></img>
              <h2 style={{ paddingTop: 10 }}>Our story and work</h2>
              <p className="content-para">
                No matter what your requirement may be, our priority lies in
                gaining an understanding of how your business works, what you
                hope to achieve.
              </p>
            </div>
            <div className="content">
              <img src={ideas} alt="idea"></img>
              <h2 style={{ paddingTop: 10 }}>Meet Our Team</h2>
              <p className="content-para">
                World of event management has changed tremendously in the last
                few years. We are a team of creative and innovative great
                interpersonal skills.
              </p>
            </div>
          </div>
          <div
            className="flex-center-full"
            style={{ backgroundColor: "#f2f2f2", flexDirection: "column" }}
          >
            <div
              className="flex-container"
              style={{ marginTop: "3%", marginBottom: "0%" }}
            >
              <h1>
                Why to Choose <span className="text-color">HappyHub </span>
              </h1>
            </div>
            <div className="flex-container" style={{ marginTop: "1%" }}>
              <div className="flex-container-about">
                <div className="flex-container-about-us">
                  <img src={cou} alt="service"></img>
                </div>
                <div
                  style={{
                    width: "20px",
                    backgroundColor: "#AC87C5",
                    height: "3px",
                  }}
                  className="flex-container-about-us"
                ></div>
                <div className="content">
                  <h2 style={{ textAlign: "left" }}>The Event Specialists </h2>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque quae deleniti inventore
                  </p>
                </div>
              </div>
              <div className="flex-container-about">
                <div className="flex-container-about-us">
                  <img src={rocket} alt="service"></img>
                </div>
                <div
                  className="flex-container-about-us"
                  style={{
                    width: "20px",
                    backgroundColor: "#AC87C5",
                    height: "3px",
                  }}
                ></div>
                <div className="content">
                  <h2 style={{ textAlign: "left" }}>
                    Dedicated Venues & Arrangements{" "}
                  </h2>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque quae deleniti inventore
                  </p>
                </div>
              </div>
              <div className="flex-container-about">
                <div className="flex-container-about-us">
                  <img src={flower} alt="service"></img>
                </div>
                <div
                  className="flex-container-about-us"
                  style={{
                    width: "20px",
                    backgroundColor: "#AC87C5",
                    height: "3px",
                  }}
                ></div>
                <div className="content">
                  <h2 style={{ textAlign: "left" }}>All types of Events</h2>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque quae deleniti inventore
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default About_us;
