import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Booking_theme_card(cardContent) {
  const {
    themeName,
    themeImageURL,
    themeDescription,
    themePhotographer,
    themeVideographer,
    themeReturnGift,
    themeCost,
  } = cardContent.cardContent;
  console.log(themeImageURL);
  const handleClick = () => {
    cardContent.onClick && cardContent.onClick();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 5,
        cursor: "pointer",
        opacity: cardContent.isSelected ? 1 : 0.5,
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        alt="Event"
        height="140"
        image={themeImageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {themeName}
        </Typography>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            {themeDescription}
          </Typography>
        </div>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            <b>Photographer : </b>
            {themePhotographer}
          </Typography>
        </div>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            <b>Videographer : </b>
            {themeVideographer}
          </Typography>
        </div>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            <b>Gift : </b>
            {themeReturnGift}
          </Typography>
        </div>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            <b>Cost : </b>$ {themeCost}
          </Typography>
        </div>
        {cardContent.isSelected && (
          <div className="fields">
            <Typography variant="div" color="green">
              <b>Selected</b>
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
