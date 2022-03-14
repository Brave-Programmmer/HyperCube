import { useState } from "react";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  Tooltip,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Box,
  Toolbar,
  AppBar,
  Button,
} from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebsae.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Circle, Home, Info, Subscriptions, TrendingDown, TrendingUp } from "@mui/icons-material";
function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState("");
  const open = Boolean(anchorEl);
  const navopen = Boolean(anchorEl);
  const history = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  const login_btn = () => {
    history.push("/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon
                onClick={handleClick}
                size="small"
                aria-controls={navopen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={navopen ? "true" : undefined}
              />
                  <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={navopen}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        mr: -0.5,
                        ml: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                
                    <Home sx={{marginRight:'10px'}}/> <Link to="/">Home</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                  <TrendingUp sx={{marginRight:'10px'}}/> <Link to="/Trending">Trending</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Subscriptions/>
                    </ListItemIcon>
                    <Link to="/Subscriptions">Subscriptions</Link>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Info/> 
                    </ListItemIcon>
                    <Link to="/about">About</Link>
                  </MenuItem>
                </Menu>
            </IconButton>
            {/* Brand Name starts */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ForumFeed
            </Typography>
            {/* Brand Name end */}
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => {
                props.settheme(!props.darkmode);
              }}
              color="inherit"
            >
              {props.theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {/* Appbar Account start */}

            {user ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          toast.success("🦄 Logged out sucessfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        })
                        .catch((error) => {
                          toast.error("🦄 Logout failed", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        });
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained">
              </Button>
            )}
            {/* Appbar Account end */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Nav;
