import Typewriter from "typewriter-effect";

const About_us_banner = () => {
  return (
    <div>
      <div>
        <div>
          <h1>
            {" "}
            <Typewriter
              options={{
                strings: ["About us", "Our story and work", "Meet Our Team"],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About_us_banner;
