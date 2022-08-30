import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import UserNotFoundPage from "./UserNotFoundPage";
import ButtonAppBar from "../Nav";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  console.log(searchParams);
  const navigate = useNavigate();
  if (!username) return <UserNotFoundPage />;

  return (
    <>
      <ButtonAppBar />
      <div>Profile Page for user {username}</div>
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

export default Profile;