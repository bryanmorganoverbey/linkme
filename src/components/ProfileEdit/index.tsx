import * as React from "react";
import { API } from "aws-amplify";
import { Formik, Form, Field } from "formik";
import { Box } from "@mui/material";
import { createProfile as createProfileMutation } from "../../graphql/mutations";
import { getProfile } from "../../graphql/queries";
import { useAuthenticator } from "@aws-amplify/ui-react";
import useEffectAsync from "../../hooks/useEffectAsync";

const ProfileEdit = () => {
  const [profile, setProfile] = React.useState(null);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffectAsync(async () => {
    if (user.username && !profile) {
      const profile: any = await API.graphql({
        query: getProfile,
        variables: { username: user.username },
      });
      console.log("profile", profile);

      const { data } = profile;
      setProfile(data.getProfile);
    }
  }, [user, profile]);

  const handleSubmit = async (values: ValuesD) => {
    const payload = {
      address: values.address,
      username: values.username,
      links: [values.link1, values.link2, values.link3],
    };
    console.log(values?.address);
    await API.graphql({
      query: createProfileMutation,
      variables: { input: payload },
    });
  };

  type ValuesD = {
    address: string;
    username: string;
    link1: string;
    link2: string;
    link3: string;
  };

  return (
    <main>
      <h1>Edit Your Profile {user?.username}</h1>
      <Formik
        initialValues={{
          address: profile?.address || "",
          link1: profile?.links?.link1 || "",
          link2: "",
          link3: "",
          username: user?.username || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <>
              <Box>
                <label>Address:</label>
                <Field name="address" />
              </Box>
              <Box>
                <label>Link1:</label>
                <Field name={`link1`}></Field>
              </Box>
              <Box>
                <label>Link2:</label>
                <Field name={`link2`}></Field>
              </Box>
              <Box>
                <label>Link3:</label>
                <Field name={`link3`}></Field>
              </Box>
              <button type="submit">Save Profile</button>
            </>
          </Form>
        )}
      </Formik>

      <button type="button" onClick={signOut}>
        Sign out
      </button>

      {/* <div>{profile}</div> */}
    </main>
  );
};

export default ProfileEdit;
