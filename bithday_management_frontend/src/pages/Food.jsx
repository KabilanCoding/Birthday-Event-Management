import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
import { Button, TextField } from "@mui/material";
import Food_card from "../components/Food_card";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminService from "../services/AdminService";

function Foods() {
  const [addFood, setAddFood] = useState(false);
  const [foods, setFoods] = useState({});
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const user = useSelector(selectUser);

  useEffect(() => {
    AdminService.GetFoods(user.email, user.token).then((res) =>
      setCardContent(res.data)
    );
  }, [user.email, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminService.PostFood(user.email, user.token, foods);
      // console.log(response);
      notify("Food added successfully");
      setAddFood(false);
      setCardContent((prevCardContent) => [...prevCardContent, foods]);
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
    // {
    //   foodName: "Cilantro Grilled Veg",
    //   foodImageURL:
    //     "https://img.freepik.com/free-photo/grilled-violet-asparagus-wrapped-with-bacon_2829-11299.jpg?w=1060&t=st=1706636354~exp=1706636954~hmac=ae30d4bf629fa8115d80cfae7b00edcc7475f9a913ebb004a977c51b5574d4e1",
    //   foodDescription: "lorem ipsum dolor sit amet, consectetur ",
    //   foodPrice: "$100",
    //   isPublished: true,
    // },
    // {
    //   foodName: "Hot BBQ Wings",
    //   foodImageURL:
    //     "https://img.freepik.com/free-photo/grilled-chicken-meat-appetizer-spicy-with-honey-generative-ai_188544-12164.jpg?t=st=1706636419~exp=1706637019~hmac=1dbf2dd8a36fb6d4820676cf279aafb73bc8749f5e0f64970a5b72d9ff5a1091",
    //   foodDescription: "lorem ipsum dolor sit amet, consectetur ",
    //   foodPrice: "$200",
    //   isPublished: true,
    // },
    // {
    //   foodName: "Mutton Masala Seekh",
    //   foodImageURL:
    //     "https://img.freepik.com/free-photo/hearty-beef-okra-stew-casserole-wooden-table-top-view-traditional-african-food_123827-27545.jpg?w=1060&t=st=1706636576~exp=1706637176~hmac=6dc0f07da9ddad0d6a1cc9acae1d799956f2d2a044f1f1f198a8ad99bdf4d8ba",
    //   foodDescription: "lorem ipsum dolor sit amet, consectetur ",
    //   foodPrice: "$300",
    //   isPublished: true,
    // },
    // {
    //   foodName: "Mutton Rogan",
    //   foodImageURL:
    //     "https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370903.jpg?w=740&t=st=1706636656~exp=1706637256~hmac=6e635be8aa128141a0ff0c18b45487a813f02bc7ef88bcaf5782a038e2c008f7",
    //   foodDescription: "lorem ipsum dolor sit amet, consectetur ",
    //   foodPrice: "$500",
    //   isPublished: false,
    // },
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
                  <Food_card key={index} cardContent={card} index={index} />
                </>
              ))}
          </div>
          <div className="button-center">
            <Button
              onClick={() => {
                setAddFood(!addFood);
              }}
              className="button-bg"
              style={{ color: "white" }}
            >
              {" "}
              + Add Foods
            </Button>
          </div>
          {addFood && (
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
                      value={foods.foodName}
                      onChange={(e) => {
                        setFoods({
                          ...foods,
                          foodName: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="foodName"
                      label="Food Name"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={foods.foodImageURL}
                      onChange={(e) => {
                        setFoods({
                          ...foods,
                          foodImageURL: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="foodImageURL"
                      label="Image Source"
                      variant="outlined"
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={foods.foodDescription}
                      onChange={(e) => {
                        setFoods({
                          ...foods,
                          foodDescription: e.target.value,
                        });
                      }}
                      required
                      multiline
                      maxRows={4}
                      id="foodDescription"
                      label="Food description"
                      variant="outlined"
                      //   fullWidth
                    ></TextField>
                  </div>
                  <div className="fields">
                    <TextField
                      value={foods.foodPrice}
                      onChange={(e) => {
                        setFoods({
                          ...foods,
                          foodPrice: e.target.value,
                        });
                      }}
                      required
                      type="text"
                      id="foodPrice"
                      label="Food Cost"
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
                        Add Food
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

export default Foods;
