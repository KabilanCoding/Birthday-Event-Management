import { useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Button, TextField } from "@mui/material";
import logo from "/Happy-Hub.svg";
import { useNavigate } from "react-router-dom";

function Book_events() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookingDetails);
    navigate("/customer/booking-detail-confirm", { state: bookingDetails });
  };
  return (
    <>
      <PrimarySearchAppBar />
      <div className="flex-center-full-hw">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1>Book your event Now</h1>
          <div className="flex-center-full">
            <div>
              <img
                src={logo}
                height={200}
                style={{ marginTop: 15 }}
                alt="gift"
              ></img>
            </div>
          </div>
          <div className="flex-box-contact-us">
            <div className="flex-center-full-form">
              <div className="fields">
                <TextField
                  value={bookingDetails.eventName}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      eventName: e.target.value,
                    });
                  }}
                  required
                  type="text"
                  id="eventName"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
              <div className="fields">
                <TextField
                  required
                  value={bookingDetails.attendees}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      attendees: e.target.value,
                    });
                  }}
                  type="text"
                  id="attendees"
                  label="No of Attendees"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
            </div>
            <div className="flex-center-full-form">
              <div className="fields">
                <TextField
                  required
                  value={bookingDetails.applicantMobile}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      applicantMobile: e.target.value,
                    });
                  }}
                  type="text"
                  id="applicantMobile"
                  label="Phone No"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
              <div className="fields">
                <TextField
                  value={bookingDetails.reference}
                  required
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      reference: e.target.value,
                    });
                  }}
                  type="text"
                  id="reference"
                  label="Where do you hear about us?"
                  variant="outlined"
                  // fullWidth
                ></TextField>
              </div>
            </div>
            <div className="flex-center-full-form">
              <div className="fields">
                <TextField
                  required
                  value={bookingDetails.eventDate}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      eventDate: e.target.value,
                    });
                  }}
                  type="text"
                  id="eventDate"
                  label="Date"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
              <div className="fields">
                <TextField
                  value={bookingDetails.eventTime}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      eventTime: e.target.value,
                    });
                  }}
                  required
                  type="text"
                  label="Event Time"
                  id="eventTime"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
            </div>

            <div>
              <div className="fields">
                <TextField
                  value={bookingDetails.eventAddress}
                  required
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      eventAddress: e.target.value,
                    });
                  }}
                  id="filled-multiline-flexible"
                  label="Address"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div>
              <div className="fields">
                <TextField
                  value={bookingDetails.eventDescription}
                  required
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      eventDescription: e.target.value,
                    });
                  }}
                  id="filled-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="flex-center-full-form">
              <div className="fields">
                <Button type="submit">Next {"->"}</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Book_events;
