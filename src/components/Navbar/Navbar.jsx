import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useEffect } from "react";
import api from "../../utils/api-client";
import PlayerCard from "../PlayerCard";

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Jugadores",
    path: "/players",
    icon: <PersonIcon />,
  },
  {
    title: "Partidas",
    path: "/games",
    icon: <SportsEsportsIcon />,
  },
  {
    title: "Nueva Partida",
    path: "/games/new",
    icon: <VideogameAssetIcon />,
  },
  {
    title: "Registrarse",
    path: "/register",
    icon: <AppRegistrationIcon />,
  },
];

// eslint-disable-next-line react/prop-types
function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    logout();
    setUserData(null)
    setAnchorEl(null)
  };

  useEffect(() => {
    if(user){
    api
      .getUser(user)
      .then((res) => {
        const { username, image, createdGames } = res.data[0];
        return { username, image, createdGames };
      })
      .then((userObj) => {
        api
          .getPlayer(user)
          .then((res) => {
            const { gamesPlayed, gamesWon, totalScore } = res.data[0];
            const userData = { ...userObj, gamesPlayed, gamesWon, totalScore };
            setUserData(userData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    } else {
      return
    }
  }, [user]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: "flex" }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton component="a" href="/" sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Altisima</Typography>
          </IconButton>
          {userData ? (
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar src={userData.image} alt="User Avatar" />
            </IconButton>
          ) : (
            <Box sx={{ display: { sm: "block" } }}>
              <IconButton component="a" href="/login">
                Login
              </IconButton>
              <IconButton component="a" href="/register">
                Register
              </IconButton>
            </Box>
          )}
          {/* Menú desplegable */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ boxSizing: "border-box" }}
          >
            {userData ? (
              <PlayerCard
                image={userData.image}
                username={userData.username}
                stats={[
                  { label: "Creadas", value: userData.createdGames },
                  { label: "Jugadas", value: userData.gamesPlayed },
                  { label: "Ganadas", value: userData.gamesWon },
                  { label: "Puntaje", value: userData.totalScore },
                ]}
                width="95%"
                margin="3px"
              />
            ) : null}
            <MenuItem onClick={() => handleMenuItemClick()}>
              Salir
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: "flex" }}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}

export default Navbar;
