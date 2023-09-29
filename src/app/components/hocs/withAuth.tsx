/* eslint-disable react/display-name */
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading, router]);

    return user ? <WrappedComponent /> : null;
  };
};

export default withAuth;
