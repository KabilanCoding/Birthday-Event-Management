import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Booking_card(cardContent) {
  const { eventName, imageSrc, description, cost } = cardContent.cardContent;

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
      <CardMedia component="img" alt="Event" height="140" image={imageSrc} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cost}
        </Typography>
      </CardContent>
    </Card>
  );
}
