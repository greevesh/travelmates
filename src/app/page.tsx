"use client";
import AuthCard from "./components/auth/Card";
import withAuth from "./components/hocs/withAuth";

const HomePage = () => {
  return <AuthCard />;
};

export default withAuth(HomePage);
