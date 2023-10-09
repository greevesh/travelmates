import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SignOutBtn from "./SignOutButton";
import { auth } from "../../../../firebase/auth";
import {
  type User,
  onAuthStateChanged,
} from "../../../../node_modules/firebase/auth";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ padding: 0 }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TravelM@tes
          </Typography>
          {user ? <SignOutBtn /> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
