import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>
              navigate({
                pathname: "/",
              })
            }
          >
            <HomeIcon />
          </IconButton>
          {authStatus !== "authenticated" ? (
            <Button
              type="submit"
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#fff",
                color: "#fff",
              }}
              onClick={() => {
                navigate({
                  pathname: "/login",
                });
              }}
            >
              Login
            </Button>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                signOut();
                navigate({
                  pathname: "/",
                });
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
