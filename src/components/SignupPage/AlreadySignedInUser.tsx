import * as React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, createSearchParams } from "react-router-dom";
const AlreadySignedInUser = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const params = { username: user?.username || "" };
  return (
    <>
      <div>You are signed in as {user?.username}.</div>
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
    </>
  );
};

export default AlreadySignedInUser;
