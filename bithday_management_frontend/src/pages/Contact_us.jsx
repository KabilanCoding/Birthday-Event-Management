import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
import { Button, TextField } from "@mui/material";
import logo from "/Happy-Hub.svg";
function Contact_us() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(feedback);
  };
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    phoneNo: "",
    reference: "",
    comments: "",
  });
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
          <div className="contact_us_banner"></div>
          <div className="flex-center-full" style={{ marginTop: "3%" }}>
            <div className="contact-content">
              <h1>
                Contact us if you need our services. We will be happy to make
                your events memorable!
              </h1>
            </div>
          </div>
          <div
            className="flex-center-full"
            style={{ backgroundColor: "#f2f2f2", padding: "2%" }}
          >
            <div className="flex-box-contact-us">
              <div className="flex-center-full-form">
                <div
                  style={{
                    width: "30px",
                    backgroundColor: "#AC87C5",
                    height: "5px",
                  }}
                  className="flex-container-about-us"
                ></div>
                <div>
                  <h2>Contact Us</h2>
                </div>
              </div>
              <form
                style={{ backgroundColor: "#f2f2f2", boxShadow: "none" }}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="flex-box-contact-us">
                  <div className="flex-center-full-form">
                    <div className="fields">
                      <TextField
                        value={feedback.name}
                        onChange={(e) => {
                          setFeedback({ ...feedback, name: e.target.value });
                        }}
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                      ></TextField>
                    </div>
                    <div className="fields">
                      <TextField
                        value={feedback.email}
                        onChange={(e) => {
                          setFeedback({ ...feedback, email: e.target.value });
                        }}
                        type="email"
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                      ></TextField>
                    </div>
                  </div>
                  <div className="flex-center-full-form">
                    <div className="fields">
                      <TextField
                        value={feedback.phoneNo}
                        onChange={(e) => {
                          setFeedback({ ...feedback, phoneNo: e.target.value });
                        }}
                        type="text"
                        id="phone"
                        label="Phone No"
                        variant="outlined"
                        fullWidth
                      ></TextField>
                    </div>
                    <div className="fields">
                      <TextField
                        value={feedback.reference}
                        onChange={(e) => {
                          setFeedback({
                            ...feedback,
                            reference: e.target.value,
                          });
                        }}
                        type="text"
                        id="reference"
                        label="Where do you hear about us?"
                        variant="outlined"
                        fullWidth
                      ></TextField>
                    </div>
                  </div>
                  <div>
                    <div className="fields">
                      <TextField
                        value={feedback.comments}
                        onChange={(e) => {
                          setFeedback({
                            ...feedback,
                            comments: e.target.value,
                          });
                        }}
                        id="filled-multiline-flexible"
                        label="Comments"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div>
                    <div className="field-container">
                      <Button
                        type="submit"
                        variant="contained"
                        className="button-bg"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <img src={logo} height={300} style={{ padding: "10%" }}></img>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Contact_us;
