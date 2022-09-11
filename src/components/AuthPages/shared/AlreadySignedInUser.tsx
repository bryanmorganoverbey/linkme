import * as React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, createSearchParams } from "react-router-dom";
import ButtonAppBar from "../../Nav";
import { Typography } from "@mui/material";

const AlreadySignedInUser = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const params = { username: user?.username || "" };
  return (
    <>
      <ButtonAppBar />
      <Typography variant="h4" sx={{ color: "white" }}>
        You are signed in as {user?.username}.
      </Typography>
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
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </>
  );
};

export default AlreadySignedInUser;
