import * as React from "react";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "./signup-page.scss";
import AlreadySignedInUser from "./AlreadySignedInUser";

const SignupPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // Use the value of authStatus to decide which page to render
  return (
    <>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? (
        <Authenticator />
      ) : (
        <AlreadySignedInUser />
      )}
    </>
  );
};

export default SignupPage;
