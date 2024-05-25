import PrimarySearchAppBar from "../components/Nav_bar";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import confetti from "../assets/images/login.jpg";
import { Puff } from "react-loader-spinner";
import AdminService from "../services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserService from "../services/UserService";

function Admin_auth() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("Login");
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const notifyError = (message) => toast.error(message);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.LoginAdmin({
        email: adminLogin.email,
        password: adminLogin.password,
        role: "admin",
      });
      if (response.data.token === "Invalid Credentials") {
        notifyError("Enter Valid Credentials");
        return;
      }
      dispatch(
        login({
          email: adminLogin.email,
          password: adminLogin.password,
          token: response.data.token,
          role: "Admin",
          loggedIn: true,
        })
      );
      navigate("/");
    } catch (e) {
      notifyError("Enter Valid Credentials");
    }
  };

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
          <div className="flex-center-full-hw">
            <form
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <h1>Admin</h1>
              <div className="flex-center-full">
                <div>
                  <img
                    src={confetti}
                    height={200}
                    style={{ marginTop: 15 }}
                    alt="gift"
                  ></img>
                </div>
              </div>
              <div>
                <div className="button-header">
                  <Button
                    onClick={() => {
                      setState("Login");
                    }}
                    className="color-orange text-color"
                  >
                    Login
                  </Button>
                </div>
              </div>
              {state === "Login" ? (
                <>
                  <div className="field-container">
                    <TextField
                      required
                      value={adminLogin.email}
                      onChange={(e) => {
                        setAdminLogin({
                          ...adminLogin,
                          email: e.target.value,
                        });
                      }}
                      type="email"
                      id="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="field-container">
                    <TextField
                      required
                      value={adminLogin.password}
                      onChange={(e) => {
                        setAdminLogin({
                          ...adminLogin,
                          password: e.target.value,
                        });
                      }}
                      type="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  {/* <div className="field-container">
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
                </div> */}
                  <div className="field-container">
                    <Button
                      type="submit"
                      variant="contained"
                      className="button-bg"
                      fullWidth
                    >
                      Login
                    </Button>
                  </div>
                </>
              ) : (
                <>{""}</>
              )}
              <div className="button-header">
                <Button
                  onClick={() => {
                    navigate("/customer-auth");
                  }}
                  style={{ color: "black !important" }}
                >
                  <p style={{ color: "black" }}>Are you - </p> customer ?
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Admin_auth;
