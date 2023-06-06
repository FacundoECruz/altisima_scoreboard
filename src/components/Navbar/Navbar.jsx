import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox"
import DraftsIcon from "@mui/icons-material/Drafts"

const navLinks = [
  {
    title: "Jugadores",
    path: "/players",
    icon: "^=^",
  },
  {
    title: "Partidas",
    path: "/games",
    icon: "O/",
  },
  {
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Registrarse",
    path: "/login",
    icon: <DraftsIcon />,
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Altisima
          </Typography>
          {navLinks.map((item) => (
            <Button
              color="inherit"
              key={item.title}
              component="a"
              href={item.path}
            >
              {item.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks}/>
      </Drawer>
    </>
  );
}

export default Navbar;
