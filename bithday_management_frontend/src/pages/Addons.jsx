import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
import { Button, TextField } from "@mui/material";
import Add_on_card from "../components/Add-on_card";
import AdminService from "../services/AdminService";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addons() {
  const [addOn, setAddOn] = useState(false);
  const [addOns, setAddOns] = useState({});
  const user = useSelector(selectUser);
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  useEffect(() => {
    AdminService.GetAddons(user.email, user.token)
      .then((res) => {
        setCardContent(res.data);
      })
      .catch((error) => {
        console.error("Error fetching addons:", error);
      });
  }, [user.email, user.token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.PostAddons(
        user.email,
        user.token,
        addOns
      );
      console.log(response);
      notify("Addons added successfully");
      setAddOn(false);
      setCardContent((prevCardContent) => [...prevCardContent, addOns]);
    } catch (e) {
      notifyError(e.message);
    }
    // console.log(cardContent);
  };
  const [cardContent, setCardContent] = useState([
    {
      addonName: "Dj Party",
      addonDescription: "lorem ipsum dolor sit amet, consectetur ",
      addonImageURL:
        "https://img.freepik.com/free-photo/man-being-dj-party-medium-shot_23-2149646087.jpg?w=1060&t=st=1706631694~exp=1706632294~hmac=2f16a251e4a0971dd8265c77e01d7763577da1a0e8bb2079b12dc8264cd17765",
      addonPrice: "$100",
      isPublished: true,
    },
    {
      addonName: "Magic Show",
      addonImageURL:
        "https://img.freepik.com/free-photo/front-view-woman-holding-tombola-tickets_23-2149704899.jpg?w=1060&t=st=1706631008~exp=1706631608~hmac=db20ba210b044e539659a3562f3e79a43ea429dda0c44f239e1bceb9a431423f",
      addonDescription: "lorem ipsum dolor sit amet, consectetur ",
      addonPrice: "$200",
      isPublished: true,
    },
    {
      addonName: "Music Show",
      addonImageURL:
        "https://img.freepik.com/free-photo/glowing-stage-light-illuminates-cheering-rock-fans-generated-by-ai_188544-37983.jpg?w=1380&t=st=1706631740~exp=1706632340~hmac=4e8b5d5353b1cb64e5df5ef351d4154095b2f5b627edb740494051c171aaca82",
      addonDescription: "lorem ipsum dolor sit amet, consectetur ",
      addonPrice: "$300",
      isPublished: true,
    },
    {
      addonName: "Game Show",
      addonImageURL:
        "https://img.freepik.com/free-photo/young-adults-playing-beer-pong_23-2149402815.jpg?w=1060&t=st=1706631386~exp=1706631986~hmac=833deaeece646a8b4904c2b22ab1a165458c354e415f69a98945ad9e1cf0df6a",
      addonDescription: "lorem ipsum dolor sit amet, consectetur ",
      addonPrice: "$500",
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
          <div className="flex-box-card" style={{ color: "#d0d0d0" }}>
            {cardContent &&
              cardContent.map((card, index) => (
                <>
                  <Add_on_card key={index} cardContent={card} index={index} />
                </>
              ))}
          </div>
          <div className="button-center">
            <Button
              onClick={() => {
                setAddOn(!addOn);
              }}
              className="button-bg"
              style={{ color: "white" }}
            >
              {" "}
              + Add-ons
            </Button>
          </div>
          {addOn && (
            <>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1>Addons</h1>

                <div className="flex-themes">
                  <div className="fields">
                    <TextField
                      value={addOns.addonName}
                      onChange={(e) => {
                        setAddOns({
                          ...addOns,
                          addonName: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="addonName"
                      label="Add-on Name"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={addOns.addonImageURL}
                      onChange={(e) => {
                        setAddOns({
                          ...addOns,
                          addonImageURL: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="addonImageURL"
                      label="Image Source"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={addOns.addonDescription}
                      onChange={(e) => {
                        setAddOns({
                          ...addOns,
                          addonDescription: e.target.value,
                        });
                      }}
                      required
                      multiline
                      maxRows={4}
                      id="description"
                      label="Add-on description"
                      variant="outlined"
                      //   fullWidth
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={addOns.addonPrice}
                      onChange={(e) => {
                        setAddOns({
                          ...addOns,
                          addonPrice: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="addonPrice"
                      label="Add-on Cost"
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
                        + New Addons
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

export default Addons;
