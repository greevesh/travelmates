import { initializeApp } from "../../../../node_modules/firebase/app";
import {
  signOut as logOut,
  getAuth,
  type Auth,
} from "../../../../node_modules/firebase/auth";
import { AuthError } from "../../../../src/app/exceptions";
import Button from "react-bootstrap/Button";
import firebaseConfig from "../../../../firebase/config";
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
