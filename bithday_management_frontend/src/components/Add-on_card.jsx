import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminService from "../services/AdminService";

export default function Add_on_card(cardContent) {
  const user = useSelector(selectUser);
  const [isEditable, setIsEditable] = useState(false);
  const [cardContents, setCardContents] = useState(cardContent.cardContent);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  //   console.log(cardContents);
  const handleSubmit = async () => {
    try {
      if (isEditable) {
        await AdminService.UpdateAddons(user.token, cardContents);
        notify("Updated Successfully");
      } else {
        const updatedCardContent = {
          ...cardContents,
          published: !cardContents.published,
        };
        console.log(updatedCardContent);
        setCardContents(updatedCardContent);
        await AdminService.UpdateAddons(user.token, updatedCardContent);
        notify(
          `Addon ${
            updatedCardContent.published ? "Published" : "Unpublished"
          } Successfully`
        );
      }
    } catch (e) {
      notifyError(e.message);
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
      {!isEditable ? (
        <Card sx={{ maxWidth: 345, margin: 5 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={cardContents.addonImageURL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cardContents.addonName}
            </Typography>
            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                {cardContents.addonDescription}
              </Typography>
            </div>
            <div className="fields">
              <Typography variant="body2" color="text.secondary">
                <b>{"Cost : "}</b>$ {cardContents.addonPrice}
              </Typography>
            </div>
          </CardContent>
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
        </Card>
      ) : (
        <>
          <>
            <Card sx={{ maxWidth: 345, margin: 5 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={cardContents.addonImageURL}
              />
              <CardContent>
                <div className="fields">
                  <TextField
                    value={cardContents.addonName}
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        addonName: e.target.value,
                      });
                    }}
                    label="Addon Name"
                    size="small"
                    required
                    type="text"
                    id="name"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
                <div className="fields">
                  <TextField
                    label="Addon Description"
                    size="small"
                    required
                    value={cardContents.addonDescription}
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        addonDescription: e.target.value,
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
                    label="Addon Price"
                    size="small"
                    required
                    value={cardContents.addonPrice}
                    onChange={(e) => {
                      setCardContents({
                        ...cardContents,
                        addonPrice: e.target.value,
                      });
                    }}
                    type="text"
                    id="cost"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                </div>
              </CardContent>
              <div className="fields">
                <CardActions>
                  <Button
                    onClick={() => {
                      setIsEditable(false);
                      handleSubmit();
                    }}
                    size="small"
                  >
                    Confirm
                  </Button>
                </CardActions>
              </div>
            </Card>
          </>
        </>
      )}
    </>
  );
}
