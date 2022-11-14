import { useAuth } from "@/hooks/AuthContext";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  return <h1>Heelloo {user.email}</h1>;
};

export default Dashboard;
