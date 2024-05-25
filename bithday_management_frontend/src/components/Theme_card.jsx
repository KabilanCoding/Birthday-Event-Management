import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { TextField } from "@mui/material";
import AdminService from "../services/AdminService";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Theme_Card(cardContent) {
  const user = useSelector(selectUser);
  const [isEditable, setIsEditable] = useState(false);
  const [cardContents, setCardContents] = useState(cardContent.cardContent);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const handleSubmit = async () => {
    console.log(cardContents);
    try {
      if (isEditable) {
        await AdminService.UpdateThemes(user.token, cardContents);
        notify("Updated Successfully");
      } else {
        const updatedCardContent = {
          ...cardContents,
          published: !cardContents.published,
        };
        setCardContents(updatedCardContent);
        await AdminService.UpdateThemes(user.token, updatedCardContent);
        notify(
          `Theme ${
            updatedCardContent.published ? "Published" : "Unpublished"
          } Successfully`
        );
      }
    } catch (err) {
      notifyError(err.message);
    }
  };
  // console.log(cardContents);
  return (
    <>
      {!isEditable ? (
        <Card sx={{ maxWidth: 345, margin: 5 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={cardContents.themeImageURL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cardContents.themeName}
            </Typography>
            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                {cardContents.themeDescription}
              </Typography>
            </div>

            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                <b>Photographer : </b> {cardContents.themePhotographer}
              </Typography>
            </div>

            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                <b> Videographer : </b>
                {cardContents.themeVideographer}
              </Typography>
            </div>
            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                <b>ReturnGift :</b> {cardContents.themeReturnGift}
              </Typography>
            </div>
            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                <b>Cost : </b>
                {"$"}
                {cardContents.themeCost}
              </Typography>
            </div>
            <CardActions>
              <Button
                size="small"
                style={{
                  color: cardContents.published ? "red" : "green",
                  margin: "1%",
                }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {cardContents.published ? "UnPublish" : "Publish"}
              </Button>
              <Button
                onClick={() => {
                  setIsEditable(true);
                }}
                size="small"
              >
                <Edit style={{ color: "#349eeb" }} />
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <>
          <>
            <Card sx={{ maxWidth: 345, margin: 5 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={cardContents.themeImageURL}
              />
              <CardContent>
                <div className="fields">
                  <TextField
                    value={cardContents.themeName}
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themeName: e.target.value,
                      });
                    }}
                    size="small"
                    type="text"
                    id="name"
                    label="Theme Name"
                    required
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    value={cardContents.themeDescription}
                    size="small"
                    label="Theme Description"
                    required
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themeDescription: e.target.value,
                      });
                    }}
                    type="text"
                    id="description"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    size="small"
                    label="Theme Cost"
                    required
                    value={cardContents.themeCost}
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themeCost: e.target.value,
                      });
                    }}
                    type="text"
                    id="cost"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    size="small"
                    value={cardContents.themePhotographer}
                    label="Theme Photographer"
                    required
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themePhotographer: e.target.value,
                      });
                    }}
                    type="text"
                    id="photo"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    size="small"
                    value={cardContents.themeVideographer}
                    label="Theme Vediographer"
                    required
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themeVideographer: e.target.value,
                      });
                    }}
                    type="text"
                    id="video"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    size="small"
                    value={cardContents.themeReturnGift}
                    label="Theme Gift"
                    required
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        themeReturnGift: e.target.value,
                      });
                    }}
                    type="text"
                    id="gift"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
              </CardContent>
              <CardActions>
                <div className="fields">
                  <Button
                    onClick={() => {
                      setIsEditable(false);
                      handleSubmit();
                    }}
                    size="small"
                  >
                    Confirm
                  </Button>
                </div>
              </CardActions>
            </Card>
          </>
        </>
      )}
    </>
  );
}
