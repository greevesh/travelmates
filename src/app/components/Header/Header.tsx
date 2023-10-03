"use client";
import SignOutBtn from "./SignOutButton";

const Header: React.FC = () => {
  return (
    <nav>
      <div>
        <h4>TravelM@tes</h4>
        <SignOutBtn />
      </div>
    </nav>
  );
};

export default Header;
