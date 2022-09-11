import * as React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import AlreadySignedInUser from "../shared/AlreadySignedInUser";
import ButtonAppBar from "../../Nav";
import { Formik, Form, Field, FormikValues } from "formik";

const SignupPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // Use the value of authStatus to decide which page to render

  const submitHandler = (values: FormikValues) => {
    console.log(values);
    window.location.href = `/signup?username=${values.uname}`;
  };

  return (
    <Grid sx={{ backgroundColor: "#0C1A26", minHeight: "100vh" }}>
      {/* {authStatus === "configuring" && "Loading..."} */}
      {authStatus !== "authenticated" ? (
        <div>
          <ButtonAppBar />
          <Grid>
            <Box sx={{ left: "20%" }}>
              <Typography variant="h4" sx={{ color: "white", p: 5 }}>
                All your social media in one QR code sticker.
              </Typography>
              <Box sx={{ left: "20%" }}>
                <Formik initialValues={{ uname: "" }} onSubmit={submitHandler}>
                  {({ values, handleChange, handleBlur }) => (
                    <Form
                      style={{
                        alignItems: "flex-start",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        WebkitBoxPack: "start",
                        justifyContent: "center",
                        margin: "0px",
                        padding: "0px",
                        border: "0px",
                        font: "inherit",
                        verticalAlign: "baseline",
                        boxSizing: "border-box",
                        WebkitFontSmoothing: "antialiased",
                        textShadow: "rgb(0 0 0 / 1%) 0px 0px 1px",
                      }}
                    >
                      <div
                        style={{
                          background: "rgb(255, 255, 255)",
                          display: "flex",
                          fontWeight: "400",
                          maxWidth: "243px",
                          position: "relative",
                          minWidth: "0px",
                          padding: "0px 16px",
                          borderRadius: "8px",
                          margin: "0px",
                          border: "0px",
                          font: "inherit",
                          verticalAlign: "baseline",
                        }}
                      >
                        <p
                          style={{
                            fontFamily:
                              '"Link Sans", "Arial Black", Arial, sans-serif',
                            fontSize: "14px",
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                            lineHeight: "1.65",
                          }}
                        >
                          <label
                            style={{
                              fontStyle: "inherit",
                              fontVariant: "inherit",
                              fontStretch: "inherit",
                              fontSize: "inherit",
                              lineHeight: "inherit",
                              fontFamily: "inherit",
                              color: "inherit",
                              fontWeight: "400",
                              margin: "0px",
                              padding: "0px",
                              border: "0px",
                              font: "inherit",
                              verticalAlign: "baseline",
                              boxSizing: "border-box",
                              WebkitFontSmoothing: "antialiased",
                              textShadow: "rgb(0 0 0 / 1%) 0px 0px 1px",
                            }}
                          >
                            snapl.me/profile/
                          </label>
                        </p>
                        <p
                          style={{
                            fontFamily:
                              '"Link Sans", "Arial Black", Arial, sans-serif',
                            fontSize: "14px",
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                            lineHeight: "1.65",
                          }}
                        >
                          <Field
                            style={{
                              border: "0px",
                              outline: "0px",
                              padding: "0px",
                              margin: "0px 8px 0px 0px",
                              overflowX: "hidden",
                              width: "100%",
                              fontStyle: "inherit",
                              fontVariant: "inherit",
                              fontStretch: "inherit",
                              fontSize: "inherit",
                              lineHeight: "inherit",
                              fontFamily: "inherit",
                              fontWeight: "400",
                              color: "rgb(103, 107, 95)",
                            }}
                            name="uname"
                            placeholder="yourname"
                          />
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#1976d2",
                          padding: "14px",
                        }}
                      >
                        Claim your Snapl
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Grid>
        </div>
      ) : (
        <AlreadySignedInUser />
      )}
    </Grid>
  );
};

export default SignupPage;
