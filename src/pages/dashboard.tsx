import { useAuth } from "@/hooks/AuthContext";
import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <h1>Heelloo {user?.email}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Dashboard;
