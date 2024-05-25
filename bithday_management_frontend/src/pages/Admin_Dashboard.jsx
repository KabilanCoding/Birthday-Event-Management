import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "../assets/css/DashBoard.css";
import PrimarySearchAppBar from "../components/Nav_bar";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminService from "../services/AdminService";
import UserService from "../services/UserService";

const Admin_Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [BookedEvents, setBookedEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [isCardVisible, setCardVisibility] = useState(false);
  const [overlay, setOverLay] = useState(0);
  const [events, setEvents] = useState([]);
  const user = useSelector(selectUser);
  const notifyError = (message) => toast.error(message);
  const notify = (message) => toast.success(message);
  useEffect(() => {
    AdminService.GetEvents(user.token).then((res) => {
      setBookedEvents(res.data.length);
      const filteredEvents = res.data.filter((event) => {
        return isValidElement(event.event.eventDate);
      });
      setUpcomingEvents(filteredEvents.length);
      setEvents(res.data);
      setUserName(filteredEvents[0]?.user?.name);
      console.log(filteredEvents);
    });
  }, [user.email, user.token]);

  const isValidElement = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    const currentDate = new Date();
    const eventDate = new Date(year, month - 1, day);
    return currentDate <= eventDate;
  };

  const handleDeleteBooking = async () => {
    try {
      const res = await UserService.DeleteEvents(
        events[overlay].event.eventId,
        user.token
      );
      console.log(res);
      setCardVisibility(false);
      notify(res.data);
      await AdminService.GetEvents(user.token).then((res) => {
        setBookedEvents(res.data.length);
        const filteredEvents = res.data.filter((event) => {
          return isValidElement(event.event.eventDate);
        });
        setUpcomingEvents(filteredEvents.length);
        setEvents(res.data);
      });
    } catch (e) {
      console.log(e);
      notifyError(e.message);
    }
  };
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "AmountUsed",
        data: [20, 38, 38, 72, 55, 63, 43, 76, 85, 80, 40],
        borderColor: "#d0cdef",
        borderWidth: 2,
        borderDash: [5, 5],
      },
      {
        label: "TotalBudget",
        data: [85, 65, 75, 38, 85, 35, 62, 40, 40, 64, 50, 89],

        borderColor: "#6259ca",
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <ToastContainer />
      <PrimarySearchAppBar />
      <div id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Hi {userName}!!</h1>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </a>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>{BookedEvents}</h3>
                <p>Booked Events</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group"></i>
              <span className="text">
                <h3>{upcomingEvents}</h3>
                <p>Upcoming Events</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text">
                <h3>{BookedEvents - upcomingEvents}</h3>
                <p>Completed Events</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Bookings</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Booked by</th>
                    <th>Event name</th>
                    <th>Date Order</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>
                        {/* <img src="img/people.png"/> */}
                        <p>{event.user.name}</p>
                      </td>
                      <td>
                        {/* <img src="img/people.png"/> */}
                        <p>{event.event.eventName}</p>
                      </td>
                      <td>{event.event.eventDate}</td>
                      <td>
                        {isValidElement(event.event.eventDate) ? (
                          <Button
                            className="button-bg"
                            onClick={() => {
                              setOverLay(index);
                              setCardVisibility(true);
                            }}
                            style={{ color: "white" }}
                          >
                            View{" "}
                          </Button>
                        ) : (
                          <span className="status completed">Completed</span>
                        )}
                      </td>
                    </tr>
                    // console.log(event);
                  ))}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Your Activities </h3>
              </div>
              <Line data={chartData} />
            </div>
          </div>
        </main>
      </div>
      {isCardVisible && (
        <div className="overlay">
          <Card>
            <CardMedia
              component="img"
              alt="Event"
              height="140"
              image={events[overlay].theme.themeImageURL}
            />
            <CardContent>
              <div className="fields">
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Event Name : </b>
                  {events[overlay].event.eventName}
                </Typography>
              </div>

              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Booking Date : </b>
                  {events[overlay].event.eventDate}
                </Typography>
              </div>
              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Number Of Attendees : </b>
                  {events[overlay].event.attendees}
                </Typography>
              </div>
              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Selected Theme : </b>
                  {events[overlay].theme.themeName}
                </Typography>
              </div>
              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Selected AddOn : </b>
                  {events[overlay].addon.addonName}
                </Typography>
              </div>
              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Food menu : </b>
                  <ul>
                    {events[overlay].food.map((foodId) => (
                      <li key={foodId}>{foodId.foodName}</li>
                    ))}
                  </ul>
                </Typography>
              </div>
              <div className="fields">
                {" "}
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Total Cost : </b>$ {events[overlay].event.eventCost}
                </Typography>
              </div>
              <div className="fields">
                <Button
                  className="button-bg"
                  style={{ color: "white", margin: "1%" }}
                  onClick={() => setCardVisibility(false)}
                >
                  Close
                </Button>
                <Button
                  className="button-bg"
                  style={{ color: "white" }}
                  onClick={handleDeleteBooking}
                >
                  Cancel Booking
                </Button>
              </div>
            </CardContent>
          </Card>{" "}
        </div>
      )}
    </>
  );
};

export default Admin_Dashboard;
