import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import UserService from "../services/UserService";
import Booking_theme_card from "../components/Booking_theme";
import Booking_Addon_card from "../components/Booking_Addon";
import Booking_food_card from "../components/Booking_food";

function Book_events_2() {
  const user = useSelector(selectUser);
  useEffect(() => {
    UserService.GetThemes(user.token).then((res) => {
      const filteredThemes = res.data.filter((theme) => theme.published);
      setCardThemeContent(filteredThemes);
    });
    UserService.GetAddons(user.token).then((res) => {
      const filteredAddons = res.data.filter((addon) => addon.published);
      setCardAddonContent(filteredAddons);
    });
    UserService.GetFoods(user.token).then((res) => {
      const filteredFoods = res.data.filter((food) => food.published);
      console.log(filteredFoods);
      setFood(filteredFoods);
    });
    // console.log(cardThemeContent, cardAddonContent, food);
  }, [user.token]);
  const [cardThemeContent, setCardThemeContent] = useState([]);
  const [cardAddonContent, setCardAddonContent] = useState([]);
  const [food, setFood] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(location.state);
  const [eventThemeId, setEventThemeId] = useState(-1);
  const [addonId, setAddonId] = useState(-1);
  const [eventFoodId, setEventFoodId] = useState([]);
  const notifyError = (msg) => toast.error(msg);
  const [viewSummary, setViewSummary] = useState(false);
  async function handleSubmit() {
    try {
      if (eventThemeId == -1) {
        notifyError("Please Select a theme");
        return;
      }
      if (eventFoodId.length === 0) {
        notifyError("Please Atleast a Food Menu");
        return;
      }
      if (addonId === -1) {
        notifyError("Booking without Add-ons 😐");
      }
      const selectedTheme = cardThemeContent.find(
        (theme) => theme.themeId === eventThemeId
      );
      const selectedAddon = cardAddonContent.find(
        (addon) => addon.addonId === addonId
      );
      const selectedFoods = eventFoodId.map((foodId) =>
        food.find((foodItem) => foodItem.foodId === foodId)
      );
      const themeCost = parseInt(selectedTheme.themeCost, 10);
      const addonCost = parseInt(selectedAddon.addonPrice.replace("$", ""), 10);
      const foodCost = selectedFoods.reduce((total, foodItem) => {
        return total + parseInt(foodItem.foodPrice.replace("$", ""), 10);
      }, 0);

      const totalCost =
        themeCost + addonCost + foodCost * bookingDetails.attendees;
      console.log(totalCost);
      const foodIdsString = eventFoodId.join("-");
      const updatedBookingDetails = {
        ...bookingDetails,
        eventFoodId: foodIdsString,
        eventTheme: eventThemeId,
        addon: addonId,
        eventCost: totalCost,
      };
      setBookingDetails(updatedBookingDetails);
      setViewSummary(true);
      console.log(bookingDetails);
    } catch (err) {
      console.log(err);
      notifyError(err.msg);
    }
  }

  const handleBooking = async () => {
    try {
      const response = await UserService.BookEvent(
        user.email,
        user.token,
        bookingDetails
      );
      console.log(response);
      notify("Event Successfully Added 😊");
      setIsBooked(true);
      setViewSummary(false);
    } catch (err) {
      console.log("Error");
      notifyError(err.msg);
    }
  };

  const notify = (message) => toast.success(message);

  return (
    <>
      <ToastContainer />
      <PrimarySearchAppBar />
      <div className="flex-center-full-hw">
        {cardThemeContent.length !== 0 ? (
          <>
            <div>
              <center>
                <h1>Available Themes : </h1>{" "}
              </center>
            </div>
            <div className="flex-box-card">
              {cardThemeContent.map((card, index) => (
                <div key={index}>
                  <Booking_theme_card
                    key={index}
                    cardContent={card}
                    onClick={() => setEventThemeId(card.themeId)}
                    isSelected={eventThemeId === card.themeId}
                  />
                </div>
              ))}
            </div>{" "}
          </>
        ) : (
          <center style={{ margin: "5%" }}>
            <h2>Ops!! No Themes Available</h2>
          </center>
        )}

        <div
          style={{
            margin: "1%",
            height: "5px",
            width: "100%",
            backgroundColor: "#ac87c5",
          }}
        ></div>
        {cardAddonContent.length !== 0 ? (
          <>
            <div>
              <center>
                <h1>Available Add Ons : </h1>{" "}
              </center>
            </div>
            <div className="flex-box-card">
              {cardAddonContent.map((card, index) => (
                <div key={index}>
                  <Booking_Addon_card
                    key={index}
                    cardContent={card}
                    onClick={() => setAddonId(card.addonId)}
                    isSelected={addonId === card.addonId}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <center style={{ margin: "5%" }}>
            <h2>Ops!! No Addons Available</h2>
          </center>
        )}
        <div
          style={{ height: "5px", width: "100%", backgroundColor: "#ac87c5" }}
        ></div>
        {food.length !== 0 ? (
          <>
            <div>
              <center>
                <h1>Available Dishes : </h1>{" "}
              </center>
            </div>
            <div className="flex-box-card">
              {food.map((card, index) => (
                <div key={index}>
                  <Booking_food_card
                    key={index}
                    cardContent={card}
                    onClick={() => {
                      if (eventFoodId.includes(card.foodId)) {
                        setEventFoodId(
                          eventFoodId.filter((item) => item !== card.foodId)
                        );
                      } else {
                        setEventFoodId([...eventFoodId, card.foodId]);
                      }
                    }}
                    isSelected={eventFoodId.includes(card.foodId)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <center style={{ margin: "5%" }}>
            <h2>Ops!! No Dishes Available</h2>
          </center>
        )}

        {viewSummary && (
          <div className="overlay">
            <Card>
              <CardMedia
                component="img"
                alt="Event"
                height="140"
                image={
                  cardThemeContent.find(
                    (theme) => theme.themeId === eventThemeId
                  )?.themeImageURL
                }
              />
              <CardContent>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Event Name : </b>
                  {bookingDetails.eventName}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Booking Date : </b>
                  {bookingDetails.eventDate}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Number Of Attendees : </b>
                  {bookingDetails.attendees}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Selected Theme : </b>
                  {
                    cardThemeContent.find(
                      (theme) => theme.themeId === eventThemeId
                    )?.themeName
                  }
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Selected AddOn : </b>
                  {
                    cardAddonContent.find(
                      (addon) => addon.addonId === bookingDetails.addon
                    )?.addonName
                  }
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Food menu : </b>
                  <ul>
                    {eventFoodId.map((foodId) => (
                      <li key={foodId}>
                        {" "}
                        {"=>"}
                        {
                          food.find((foodItem) => {
                            console.log(
                              foodItem,
                              eventFoodId.includes(foodItem.foodId),
                              eventFoodId
                            );
                            return foodItem.foodId === foodId;
                          }).foodName
                        }
                      </li>
                    ))}
                  </ul>
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  <b>Total Cost : </b>$ {bookingDetails.eventCost}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className="button-bg"
                  style={{ color: "white", width: "100%" }}
                  onClick={() => {
                    setViewSummary(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="button-bg"
                  style={{ color: "white", width: "100%" }}
                  onClick={() => {
                    handleBooking();
                  }}
                >
                  Book Event
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
        <div>
          {!isBooked ? (
            <Button
              className="button-bg"
              style={{ color: "white", width: "100%" }}
              onClick={() => {
                handleSubmit();
              }}
            >
              View Summary
            </Button>
          ) : (
            <Button
              className="button-bg"
              style={{ color: "white", width: "100%" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Go Back to Home Page
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Book_events_2;
