import * as React from "react";
import { API } from "aws-amplify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import UserNotFoundPage from "./UserNotFoundPage";
import ButtonAppBar from "../Nav";
import SnapLogo from "../../assets/snapchat.png";
import { Button } from "@mui/material";
import { getProfile } from "../../graphql/queries";
import { useAuthenticator } from "@aws-amplify/ui-react";
import useEffectAsync from "../../hooks/useEffectAsync";

type ValuesD = {
  username: string;
  snapchat_link: string;
};

const Profile = () => {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = React.useState<ValuesD | null>(null);
  const { user } = useAuthenticator((context) => [context.user]);
  const username = searchParams.get("username");
  console.log(searchParams);
  const navigate = useNavigate();

  useEffectAsync(async () => {
    if (username && !profile) {
      const profile: any = await API.graphql({
        query: getProfile,
        variables: { username: username },
      });
      console.log("profile", profile);

      const { data } = profile;
      setProfile(data.getProfile);
    }
  }, [username, profile]);
  if (!username) return <UserNotFoundPage />;

  return (
    <>
      <ButtonAppBar />
      <div>Profile Page for user {username}</div>
      {user?.username && (
        <button
          type="button"
          onClick={() =>
            navigate({
              pathname: "/profile-edit",
            })
          }
        >
          Edit Profile
        </button>
      )}

      <Grid container sx={{ justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Button
              variant="text"
              onClick={() => window.open(profile?.snapchat_link)}
              sx={{ justifyContent: "space-between" }}
            >
              <img alt="snapchat" src={SnapLogo} width="60px" height="60px" />{" "}
              Snapchat
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Profile;
