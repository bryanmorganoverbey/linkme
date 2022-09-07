import * as React from "react";
import { API } from "aws-amplify";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Card, Grid, TextField } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SnapLogo from "../../assets/snapchat.png";
import InstaLogo from "../../assets/instagram.png";
import QRCode from "react-qr-code";

import {
  createProfile as createProfileMutation,
  deleteProfile as deleteProfileMutation,
  updateProfile as updateProfileMutation,
} from "../../graphql/mutations";
import { getProfile } from "../../graphql/queries";
import { useAuthenticator } from "@aws-amplify/ui-react";
import useEffectAsync from "../../hooks/useEffectAsync";
import ButtonAppBar from "../Nav";

const ProfileEdit = () => {
  const [profile, setProfile] = React.useState<ValuesD | null>(null);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const params = { username: user?.username || "" };

  useEffectAsync(async () => {
    setLoading(true);
    if (user.username && !profile) {
      const profile: any = await API.graphql({
        query: getProfile,
        variables: { username: user.username },
      });
      console.log("profile", profile);

      const { data } = profile;
      setProfile(data.getProfile);
    }
    setLoading(false);
  }, [user, profile]);

  const handleSubmit = async (values: ValuesD) => {
    console.log(values);
    await API.graphql({
      query: profile === null ? createProfileMutation : updateProfileMutation,
      variables: { input: values },
    });
  };

  const handleDelete = async () => {
    await API.graphql({
      query: deleteProfileMutation,
      variables: { input: { username: user.username } },
    });
  };

  type ValuesD = {
    username: string;
    snapchat_link: string;
    instagram_link: string;
  };
  if (authStatus === "configuring") return <div>Loading...</div>;
  if (authStatus !== "authenticated") {
    navigate({
      pathname: "/",
    });
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <ButtonAppBar />
      <h1>Edit Your Profile {user?.username}</h1>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
      <button
        type="button"
        onClick={() =>
          navigate({
            pathname: "/profile",
            search: `?${createSearchParams(params)}`,
          })
        }
      >
        View Profile
      </button>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item style={{ minWidth: "300px", padding: "20px" }}>
          <Card sx={{ p: 1 }}>
            <Formik
              initialValues={{
                snapchat_link: profile?.snapchat_link || "",
                instagram_link: profile?.instagram_link || "",
                username: user?.username || "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <>
                    <Box sx={{ p: 1 }}>
                      <img
                        alt="snapchat"
                        src={SnapLogo}
                        width="60px"
                        height="60px"
                      />

                      <Field
                        render={({ field }: { field: typeof Field }) => (
                          <TextField
                            {...field}
                            style={{ width: "260px" }}
                            id="outlined-basic"
                            label="Link to your Snapchat Account"
                            variant="outlined"
                          />
                        )}
                        name="snapchat_link"
                        value={values?.snapchat_link || "not workin"}
                      />
                    </Box>
                    <Box sx={{ p: 1 }}>
                      <img
                        alt="instagram"
                        src={InstaLogo}
                        width="60px"
                        height="60px"
                      />
                      {"  "}
                      <Field
                        render={({ field }: { field: typeof Field }) => (
                          <TextField
                            {...field}
                            style={{ width: "260px" }}
                            id="outlined-basic"
                            label="Link to your Instagram Account"
                            variant="outlined"
                          />
                        )}
                        name="instagram_link"
                      />
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Button variant="outlined" onClick={handleDelete}>
                        Delete
                      </Button>{" "}
                      <Button type="submit" variant="contained">
                        Save Profile
                      </Button>
                    </Box>
                  </>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          {user?.username ? (
            <Card>
              This is your QR code that links to your profile
              <CardContent>
                <QRCode
                  value={`www.snapl.me/profile?username=${user?.username}`}
                />
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileEdit;
