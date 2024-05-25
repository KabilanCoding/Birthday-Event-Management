import Homepage from "./components/Homepage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Customer_auth from "./pages/Customer_auth";
import Admin_auth from "./pages/Admin_auth";
import About_us from "./pages/About_us";
import Contact_us from "./pages/Contact_us";
import LogOut from "./pages/Logout";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Error from "./pages/Error";
import View_schedule from "./pages/View_schedule";
import Add_themes from "./pages/Add_themes";
import Book_events from "./pages/Book_events";
import Book_events_2 from "./pages/Books_events_2";
import Addons from "./pages/Addons";
import Foods from "./pages/Food";
import User_Dashboard from "./pages/Dashboard";
import Admin_Dashboard from "./pages/Admin_Dashboard";
function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/customer-auth" element={<Customer_auth />} />
          <Route path="/admin-auth" element={<Admin_auth />} />
          <Route path="/about-us" element={<About_us />} />
          <Route path="/contact-us" element={<Contact_us />} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : user.role === "Customer" ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<About_us />} />
          <Route path="/contact-us" element={<Contact_us />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/customer/view-schedule" element={<View_schedule />} />
          <Route path="/profile/user-dashboard" element={<User_Dashboard />} />
          <Route path="/customer/book-schedule" element={<Book_events />} />
          <Route
            path="/customer/booking-detail-confirm"
            element={<Book_events_2 />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<About_us />} />
          <Route path="/contact-us" element={<Contact_us />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/admin/themes" element={<Add_themes />} />
          <Route path="/admin/addons" element={<Addons />} />
          <Route path="/admin/add-foods" element={<Foods />} />
          <Route
            path="/profile/admin-dashboard"
            element={<Admin_Dashboard />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
