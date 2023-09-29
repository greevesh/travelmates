import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  type User,
} from "../../../node_modules/firebase/auth";
import { auth } from "../../../firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
