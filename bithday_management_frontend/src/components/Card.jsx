// import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
// import { useState } from "react";
// import UserService from "../services/UserService";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/userSlice";

export default function MediaControlCard(cardContent) {
  // console.log(addon);
  // const user = useSelector(selectUser);
  const [isEventDatePassed, setIsEventDatePassed] = useState(false);
  const eventCard = cardContent.cardContent;
  useEffect(() => {
    const [day, month, year] = eventCard.event.eventDate.split("/").map(Number);
    const currentDate = new Date();
    const eventDate = new Date(year, month - 1, day);
    setIsEventDatePassed(!(currentDate < eventDate));
  }, [eventCard.event.eventDate]);
  // const
  // const handleDeleteBooking = async () => {
  //   try {
  //     // const res = await UserService.DeleteEvents(
  //     //   eventCard.event.eventId,
  //     //   user.token
  //     // ).then(setEventCard(null));
  //     // console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <>
      {eventCard && (
        <Card
          sx={{
            margin: 5,
            cursor: "pointer",
          }}
        >
          <CardMedia
            component="img"
            alt="Event"
            height="140"
            image={eventCard.theme.themeImageURL}
          />
          <CardContent>
            <div className="fields">
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Event Name : </b>
                {eventCard.event.eventName}
              </Typography>
            </div>

            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Booking Date : </b>
                {eventCard.event.eventDate}
              </Typography>
            </div>
            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Number Of Attendees : </b>
                {eventCard.event.attendees}
              </Typography>
            </div>
            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Selected Theme : </b>
                {eventCard.theme.themeName}
              </Typography>
            </div>
            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Selected AddOn : </b>
                {eventCard.addon.addonName}
              </Typography>
            </div>
            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Food menu : </b>
                <ul>
                  {eventCard.food.map((foodId) => (
                    <li key={foodId}>{foodId.foodName}</li>
                  ))}
                </ul>
              </Typography>
            </div>
            <div className="fields">
              {" "}
              <Typography gutterBottom variant="body2" color="text.secondary">
                <b>Total Cost : </b>$ {eventCard.event.eventCost}
              </Typography>
            </div>
            <div className="fields">
              <Typography
                gutterBottom
                variant="body1"
                color={isEventDatePassed ? "green" : "orange"}
              >
                {isEventDatePassed ? "▣ Completed" : "▣ Upcoming"}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}
      {/* <div className="overlay">
        <Card>Hey</Card>
      </div> */}
    </>
  );
}
