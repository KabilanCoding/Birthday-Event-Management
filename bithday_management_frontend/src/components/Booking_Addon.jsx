import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Booking_Addon_card(cardContent) {
  const { addonName, addonImageURL, addonDescription, addonPrice } =
    cardContent.cardContent;

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
        image={addonImageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {addonName}
        </Typography>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            {addonDescription}
          </Typography>
        </div>
        <div className="fields">
          <Typography variant="body2" color="text.secondary">
            <b>Cost : </b>$ {addonPrice}
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
