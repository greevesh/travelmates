import { signOut as logOut, getAuth } from "firebase/auth"
import { AuthError } from "../../lib/exceptions"
import { useRouter } from "next/navigation"

const SignOutBtn = () => {
  const auth = getAuth()
  const router = useRouter()

  const signOut = (): void => {
    try {
      logOut(auth)
        .then(() => {
          router.push('/');
          console.log('signed out');
        })
    } catch (error) {
      throw new AuthError('There was an error signing out.');
    }
  };
  
  
    return (
        <div>
    <button onClick={() => signOut()}>Sign out</button>
  </div>
    )
}

export default SignOutBtn