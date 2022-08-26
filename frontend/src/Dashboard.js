import React from "react";
import Amplify from "aws-amplify";
//2.
import awsExports from "./aws-exports";
//3.
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";

//4.
Amplify.configure(awsExports);

function Dashboard() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      <h1>This is your logged in dashboard.</h1>
    </div>
  );
}

//6.
export default withAuthenticator(Dashboard);
