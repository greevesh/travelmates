import { signOut as logOut, getAuth } from "firebase/auth";
import { AuthError } from "../../lib/exceptions";
import Button from "react-bootstrap/Button";
import { type Auth } from "firebase/auth";
import firebaseConfig from "@root/firebase/config";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

initializeApp(firebaseConfig);

const SignOutBtn = () => {
  const auth: Auth = getAuth();
  const router: AppRouterInstance = useRouter();

  const signOut = (): void => {
    try {
      logOut(auth).then(() => {
        router.push("/");
        console.log("signed out", auth.currentUser);
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
