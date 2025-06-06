import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import app_img from "../../Assests/Images/sidenav/app.png";
import notification_img from "../../Assests/Images/sidenav/Notification.png";
import layout from "../../Assests/Images/sidenav/layout.png";
import hiring from "../../Assests/Images/sidenav/hiring.png";

import accept from "../../Assests/Images/sidenav/accept.png";
import cogwheel from "../../Assests/Images/sidenav/cogwheel.png";
import report from "../../Assests/Images/sidenav/icons8-report-24.png";
import { useMediaQuery } from "@mui/material";

function Navbar() {
  // const array_img = [
  //   { img: layout, routeLink: "/dashboard", tooltip: "Dashboard" },
  //   { img: hiring, routeLink: "/employee", tooltip: "Employee's" },
  //   // { img: vector, routeLink: "/ManageApprovals", tooltip: "Add NewUser" },
  //   // { img: interview, routeLink: "/AllInterview", tooltip: "Manage Interviews" },
  //   { img: accept, routeLink: "/myleave", tooltip: "My Leave" },
  //   // { img: vector, routeLink: "/Attendance_details", tooltip: "Attendance Details" },
  //   // { img: portfolio, routeLink: "/Holiday", tooltip: "Holiday" },


  //   { img: cogwheel, routeLink: "/settings", tooltip: "Settings" },
  // ];
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
const isAdmin = permissions.includes("admin"); // true if admin exists
  const array_img = [
  { img: layout, routeLink: "/dashboard", tooltip: "Dashboard" },
  { img: hiring, routeLink: "/holiday", tooltip: "Holiday's" },
  { img: accept, routeLink: "/myleave", tooltip: "My Leave" },

  ...(isAdmin ? [{ img: cogwheel, routeLink: "/settings", tooltip: "Settings" }] : [])
];



//logout
const handleLogout =()=>{
  localStorage.clear()
    window.location.href = "/";
}
const UserName=localStorage.getItem("Name")

  const [activeLink, setActiveLink] = useState(null);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const openNotificationModal = () => setNotificationModalOpen(true);
  const closeNotificationModal = () => setNotificationModalOpen(false);
  const openAccountMenu = (event) => setAccountAnchorEl(event.currentTarget);
  const closeAccountMenu = () => setAccountAnchorEl(null);

  const isSmallScreen = useMediaQuery("(max-width:570px)");

  return (
    <>
      <Box sx={{ display: "flex", height: "55px" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#2F70CB",
            padding: "5px",
            boxShadow: "none",
          }}
        >
          <Toolbar style={{ padding: "0px", minHeight: "0px" }}>
            <a href="/dashboard" style={{ textDecoration: "none" }}>
              <img src={app_img} alt="App Logo" />
            </a>
            <Box sx={{ paddingLeft: "2em" }}>
              <Typography id="text-15-500-20-Inter">LMS </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                right: "0",
                marginRight: "2.5rem",
              }}
            >
              <Box sx={{ padding: "3px 10px", cursor: "pointer" }} onClick={openNotificationModal}>
                <img src={notification_img} alt="Notifications" />
              </Box>
              {!isSmallScreen && (
                <Box sx={{ padding: "6px 10px" }}>
                  <Typography id="text-15-500-20-Inter">
                    Welcome {UserName}
                  </Typography>
                </Box>
              )}
              <Box sx={{ padding: "6px 10px", cursor: "pointer" }} onClick={openAccountMenu}>
                <Typography id="text-15-500-20-Inter">Account</Typography>
              </Box>

              <Popover
                open={Boolean(accountAnchorEl)}
                anchorEl={accountAnchorEl}
                onClose={closeAccountMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{ style: { width: 150 } }}
              >
                <ListItem button onClick={() => window.location.href = "/dashboard"}>
                  <SettingsIcon />
                  <ListItemText primary="Profile" />
                </ListItem>
                <hr />
                <ListItem 
  onClick={handleLogout}
  sx={{
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0', 
      color: '#2F70CB',           
    },
    display: 'flex',
    alignItems: 'center',
    gap: 1, 
  }}
>
  <ExitToAppIcon />
  <ListItemText primary="Logout" />
</ListItem>

              </Popover>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 50,
              boxSizing: "border-box",
              backgroundColor: "#0B1A46",
              overflow: "hidden",
            },
          }}
        >
          <Toolbar sx={{ overflow: "hidden", marginTop: "2rem" }} />
          <Box>
            {array_img.map((arrayData, index) => (
              <Tooltip title={arrayData.tooltip} placement="right" key={index}>
                <NavLink
                  to={arrayData.routeLink}
                  onClick={() => setActiveLink(index)}
                >
                  <Box className="img-responsive">
                    <div className={index === activeLink ? "active-link" : ""}>
                      <img
                        style={{
                          padding: "10px",
                          width: arrayData.img === report ? "3.3rem" : "auto",
                          height: arrayData.img === report ? "3.2rem" : "auto",
                        }}
                        src={arrayData.img}
                        alt={arrayData.tooltip}
                      />
                    </div>
                  </Box>
                </NavLink>
              </Tooltip>
            ))}

           
          </Box>
        </Drawer>
      </Box>

      <Drawer
        anchor="right"
        open={isNotificationModalOpen}
        onClose={closeNotificationModal}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <Box sx={{ width: 420, marginTop: "4rem", paddingLeft: "10px" }}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton
            style={{ position: "absolute", top: "4rem", right: "0" }}
            onClick={closeNotificationModal}
          >
            <CloseIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
        <hr />
      </Drawer>
    </>
  );
}

export default Navbar;
