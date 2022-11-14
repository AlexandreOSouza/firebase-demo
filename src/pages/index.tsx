import { Button, Flex, Input, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Head>
        <title>Login</title>
      </Head>
      <Flex>
        <Flex direction={"column"}>
          <h1>Welcome</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type={"email"}
              placeholder={"Email"}
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
            <Input
              type={"password"}
              placeholder={"Password"}
              {...register("password", { required: true })}
            />
            {errors.password && <span>Password is required</span>}
            <Button type={"submit"}>Login</Button>
          </form>
          <Text>
            Forgot your password? <Link href={"#"}>Click here</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
