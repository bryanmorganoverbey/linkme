import * as React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Grid } from "@mui/material";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import AlreadySignedInUser from "../shared/AlreadySignedInUser";
import ButtonAppBar from "../../Nav";
import { useSearchParams, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // Use the value of authStatus to decide which page to render
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username") || "";
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      const input = document.querySelector('input[name="username"]');
      if (input) {
        input.setAttribute("value", username);
      }
    });
  }, []);
  return (
    <Grid sx={{ backgroundColor: "#0C1A26", minHeight: "100vh" }}>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? (
        <div>
          <ButtonAppBar />
          <Grid sx={{ p: 5 }}>
            <Authenticator initialState="signUp" />
          </Grid>
        </div>
      ) : (
        <AlreadySignedInUser />
      )}
    </Grid>
  );
};

export default SignupPage;
