/* eslint-disable react/display-name */
import React from "react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
      // prevents user from accessing home page from /setup page
      else if (!loading && user && pathname === "/") {
        router.back();
      }
      // prevents user from accessing setup page once group is created
      else if (!loading && user && !pathname.startsWith("/group")) {
        router.back();
      }
    }, [user, loading, router]);

    return <WrappedComponent />;
  };
};

export default withAuth;
