import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { Puff } from "react-loader-spinner";
import PrimarySearchAppBar from "../components/Nav_bar";
import confetti from "../assets/images/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../services/UserService";

function Customer_auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [state, setState] = useState("Login");
  const [customerLogin, setCustomerLogin] = useState({
    email: "",
    password: "",
  });
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };
  const notifyError = (message) => toast.error(message);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.LoginUser({
        email: customerLogin.email,
        password: customerLogin.password,
        role: "user",
      });
      console.log(response);
      if (response.data.token === "Invalid Credentials") {
        notifyError("Enter Valid Credentials");
        return;
      }
      dispatch(
        login({
          email: customerLogin.email,
          password: customerLogin.password,
          token: response.data.token,
          role: "Customer",
          loggedIn: true,
        })
      );
      navigate("/");
    } catch (e) {
      notifyError("Enter Valid Credentials");
    }
    console.log(customerLogin);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (
        customer.confirmPassword !== customer.password ||
        passwordError !== "" ||
        confirmPasswordError !== ""
      ) {
        notifyError("Enter Valid Credentials");
        return;
      }
      const response = await UserService.RegisterUser({
        name: customer.firstName + " " + customer.lastName,
        email: customer.email,
        password: customer.password,
        userRole: "user",
      });
      console.log(response);
      if (
        response.data.token === undefined ||
        response.data.token === "Email Already exists"
      ) {
        notifyError("Email Already exists");
        return;
      }
      dispatch(
        login({
          email: customer.email,
          password: customer.password,
          token: response.data.token,
          role: "Customer",
          loggedIn: true,
        })
      );
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setCustomer({ ...customer, password: newPassword });

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and contain at least one uppercase letter, one special character, and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setCustomer({ ...customer, confirmPassword: confirmPass });

    if (confirmPass !== customer.password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
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
                if (state === "Login") {
                  handleLogin(e);
                } else {
                  handleRegister(e);
                }
              }}
              style={{ width: "30%" }}
            >
              <h1>Customer</h1>
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
                  |
                  <Button
                    onClick={() => {
                      setState("Register");
                    }}
                    className="color-orange text-color"
                  >
                    Register
                  </Button>
                </div>
              </div>
              {state === "Login" ? (
                <>
                  <div className="field-container">
                    <TextField
                      required
                      value={customerLogin.email}
                      onChange={(e) => {
                        setCustomerLogin({
                          ...customerLogin,
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
                      value={customerLogin.password}
                      onChange={(e) => {
                        setCustomerLogin({
                          ...customerLogin,
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
                <>
                  <div className="field-container">
                    <TextField
                      value={customer.firstName}
                      onChange={(e) => {
                        setCustomer({ ...customer, firstName: e.target.value });
                      }}
                      type="text"
                      id="first-name"
                      label="First Name"
                      required
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="field-container">
                    <TextField
                      value={customer.lastName}
                      onChange={(e) => {
                        setCustomer({ ...customer, lastName: e.target.value });
                      }}
                      type="text"
                      id="last-name"
                      label="Last Name"
                      required
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="field-container">
                    <TextField
                      value={customer.email}
                      onChange={(e) => {
                        setCustomer({ ...customer, email: e.target.value });
                      }}
                      type="email"
                      id="email"
                      label="Email"
                      required
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="field-container">
                    <TextField
                      value={customer.password}
                      onChange={handlePasswordChange}
                      type="password"
                      id="password"
                      label="Password"
                      required
                      variant="outlined"
                      fullWidth
                      error={!!passwordError}
                      helperText={passwordError}
                    />
                  </div>
                  <div className="field-container">
                    <TextField
                      value={customer.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      type="password"
                      id="confirm-password"
                      label="Confirm password"
                      required
                      variant="outlined"
                      fullWidth
                      error={!!confirmPasswordError}
                      helperText={confirmPasswordError}
                    />
                  </div>
                  <div className="field-container">
                    <Button
                      variant="contained"
                      type="submit"
                      className="button-bg"
                      fullWidth
                    >
                      Register
                    </Button>
                  </div>
                </>
              )}
              <div className="button-header">
                <Button
                  onClick={() => {
                    navigate("/admin-auth");
                  }}
                  style={{ color: "black !important" }}
                >
                  <p style={{ color: "black" }}>Are you - </p> Admin ?
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Customer_auth;
