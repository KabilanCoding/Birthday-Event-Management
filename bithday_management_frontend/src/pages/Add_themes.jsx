import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
import { Button, TextField } from "@mui/material";
import Theme_Card from "../components/Theme_card";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import AdminService from "../services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_themes() {
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const user = useSelector(selectUser);
  const [addTheme, setAddTheme] = useState(false);
  const [theme, setThemes] = useState({ isPublished: false });

  useEffect(() => {
    const response = AdminService.GetThemes(user.email, user.token).then(
      (res) => {
        setCardContent(res.data);
      }
    );
    console.log(response);
  }, [user.email, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.PostThemes(
        user.email,
        user.token,
        theme
      );
      console.log(response);
      notify("Themes added Successfully");
      setAddTheme(false);
      setCardContent((prevCardContent) => [...prevCardContent, theme]);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        notifyError("Enter Valid Credentials");
      } else {
        notifyError(err.message);
      }
    }
    // console.log(cardContent);
  };

  const [cardContent, setCardContent] = useState([
    {
      themeName: "Event Party",
      themeImageURL:
        "https://img.freepik.com/free-photo/friends-clinking-drink-glasses-modern-bar_1150-18971.jpg?w=1060&t=st=1706633538~exp=1706634138~hmac=83d70b77f7f34018d773b33d2b24ab352b8ca98c7e1a9dc0af933e83f0de8bce",
      themeDescription: "lorem ipsum dolor sit amet, consectetur ",
      themeCost: "$100",
      themePhotographer: "Pool party",
      themeVideographer: "Magic Show",
      themeReturnGift: "BBQ",
      isPublished: true,
    },
    {
      themeName: "Pool Party",
      themeImageURL:
        "https://img.freepik.com/free-photo/lively-pool-party-scene-with-vibrant-inflatables-upbeat-music-guests-enjoying-sun_1268-31145.jpg?t=st=1706632243~exp=1706632843~hmac=e535b5a86af204e860fa344a48bd82a2d98901dccdf2061ae3d0d3733585c27b",
      themeDescription: "lorem ipsum dolor sit amet, consectetur ",
      themeCost: "$200",
      themePhotographer: "Pool party",
      themeVideographer: "Magic Show",
      themeReturnGift: "BBQ",
      isPublished: true,
    },
    {
      themeName: "Art Party",
      themeImageURL:
        "https://img.freepik.com/free-photo/friends-giving-wrapped-gift-boxes-excited-birthday-girl_23-2148029782.jpg?w=1060&t=st=1706632359~exp=1706632959~hmac=eb01527d61605b1ba7b416ad1a7c1d9c707641f5b3f228136bc5f7e822d5bccd",
      themeDescription: "lorem ipsum dolor sit amet, consectetur ",
      themeCost: "$300",
      themePhotographer: "Pool party",
      themeVideographer: "Magic Show",
      themeReturnGift: "BBQ",
      isPublished: true,
    },
    {
      themeName: "Crafting",
      themeImageURL:
        "https://img.freepik.com/free-photo/young-children-making-diy-project-from-upcycled-materials_23-2149391106.jpg?w=1060&t=st=1706633049~exp=1706633649~hmac=60c0c486212da43852bb058e244732192cc4540cdc1c3245fcb500346ea220a3",
      themeDescription: "lorem ipsum dolor sit amet, consectetur ",
      themeCost: "$500",
      themePhotographer: "Pool party",
      themeVideographer: "Magic Show",
      themeReturnGift: "BBQ",
      isPublished: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
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
          <ToastContainer />
          <PrimarySearchAppBar />
          <div className="flex-box-card">
            {cardContent &&
              cardContent.map((card, index) => (
                <>
                  <Theme_Card key={index} cardContent={card} index={index} />
                </>
              ))}
          </div>
          <div className="button-center">
            <Button
              onClick={() => {
                setAddTheme(!addTheme);
              }}
              className="button-bg"
              style={{ color: "white" }}
            >
              {" "}
              + Add Themes
            </Button>
          </div>
          {addTheme && (
            <>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1>Add Theme</h1>

                <div className="flex-themes">
                  <div className="fields">
                    <TextField
                      value={theme.themeName}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeName: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="eventName"
                      label="Theme Name"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={theme.themeImageURL}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeImageURL: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="themeImageURL"
                      label="Image Source"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={theme.themeDescription}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeDescription: e.target.value,
                        });
                      }}
                      required
                      multiline
                      maxRows={4}
                      id="description"
                      label="Theme description"
                      variant="outlined"
                      //   fullWidth
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={theme.themePhotographer}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themePhotographer: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="themePhotographer"
                      label="Photographer"
                      variant="outlined"
                    ></TextField>
                  </div>

                  <div className="fields">
                    <TextField
                      value={theme.themeVideographer}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeVideographer: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="themeVideographer"
                      label="Videographer"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={theme.themeReturnGift}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeReturnGift: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="themeReturnGift"
                      label="Return Gift"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={theme.themeCost}
                      onChange={(e) => {
                        setThemes({
                          ...theme,
                          themeCost: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="description"
                      label="Theme Cost"
                      variant="outlined"
                      //   fullWidth
                    ></TextField>
                  </div>
                  <div>
                    <center>
                      <Button
                        className="button-bg"
                        style={{ color: "white" }}
                        type="submit"
                      >
                        Add your theme
                      </Button>
                    </center>
                  </div>
                </div>
              </form>
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default Add_themes;
