import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { AccountCircle, Logout } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const contact = [
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];
  var pages = [];
  if (user?.role === "Customer") {
    pages = [
      { name: "View Scheduled Events", link: "/customer/view-schedule" },
      { name: "Book Events", link: "/customer/book-schedule" },
    ];
  } else if (user?.role === "Admin") {
    pages = [
      { name: "Themes", link: "/admin/themes" },
      { name: "Add ons", link: "/admin/addons" },
      { name: "Foods", link: "/admin/add-foods" },
    ];
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pages.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => {
              navigate(text.link);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            name: "My DashBoard",
            link:
              user?.role === "Customer"
                ? "/profile/user-dashboard"
                : "/profile/admin-dashboard",
          },
          { name: "Logout", link: "/logout" },
        ].map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => {
              navigate(text.link);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AccountCircle /> : <Logout />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" className="bg-color">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user && (
            <div>
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon style={{ color: "black" }} />
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          )}
          <img
            src="/Happy-Hub.svg"
            onClick={() => {
              navigate("/");
            }}
            className="logo-happy"
          ></img>
          <Typography
            className="display-header"
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            HappyHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
          </Box>

          <Typography
            className="display-header"
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            HappyHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {[""].map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div className="flex-box">
            {contact.map((c) => (
              <Button
                key={c.name}
                onClick={() => {
                  navigate(c.link);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {c.name}
              </Button>
            ))}
          </div>

          {!user && (
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigate("/customer-auth");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PrimarySearchAppBar;
