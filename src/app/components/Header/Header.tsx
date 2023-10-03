import React, { useState, useEffect } from "react";
import {
  type User,
  onAuthStateChanged,
} from "../../../../node_modules/firebase/auth";
import { auth } from "../../../../firebase/auth";
import SignOutBtn from "./SignOutButton";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <div>
        <h4>TravelM@tes</h4>
        {user ? <SignOutBtn /> : null}
      </div>
    </nav>
  );
};

export default Header;
