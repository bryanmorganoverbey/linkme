import * as React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Grid } from "@mui/material";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "./signup-page.scss";
import AlreadySignedInUser from "./AlreadySignedInUser";
import ButtonAppBar from "../Nav";

const SignupPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // Use the value of authStatus to decide which page to render
  return (
    <>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? (
        <div>
          <ButtonAppBar />
          <Grid sx={{ p: 5 }}>
            <Authenticator />
          </Grid>
        </div>
      ) : (
        <AlreadySignedInUser />
      )}
    </>
  );
};

export default SignupPage;
