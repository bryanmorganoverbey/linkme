import * as React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Grid } from "@mui/material";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import AlreadySignedInUser from "../shared/AlreadySignedInUser";
import ButtonAppBar from "../../Nav";

const LoginPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // Use the value of authStatus to decide which page to render

  return (
    <Grid sx={{ backgroundColor: "#0C1A26", minHeight: "100vh" }}>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? (
        <div>
          <ButtonAppBar />
          <Grid sx={{ p: 5 }}>
            <Authenticator initialState="signIn" />
          </Grid>
        </div>
      ) : (
        <AlreadySignedInUser />
      )}
    </Grid>
  );
};

export default LoginPage;
