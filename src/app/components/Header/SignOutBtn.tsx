import { signOut as logOut, getAuth } from "firebase/auth";
import { AuthError } from "../../lib/exceptions";
import { redirect } from "../../helpers";
import Button from "react-bootstrap/Button";
import { type Auth } from "firebase/auth";
import firebaseConfig from "@root/firebase/config";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);

const SignOutBtn = () => {
  const auth: Auth = getAuth();

  const signOut = (): void => {
    try {
      logOut(auth).then(() => {
        redirect("/");
        console.log("signed out");
      });
    } catch (error) {
      throw new AuthError("There was an error signing out.");
    }
  };

  return (
    <div>
      <Button onClick={() => signOut()} variant="outline-success">
        Sign out
      </Button>
    </div>
  );
};

export default SignOutBtn;
