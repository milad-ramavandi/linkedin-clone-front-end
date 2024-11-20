"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  });

  return (
    <div
      className={
        "w-full min-h-screen mx-auto p-2 bg-gray-50 flex flex-col justify-center items-center"
      }
    >
      <Image
        src={
          "https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo-700x394.png"
        }
        width={250}
        height={250}
        alt="logo-login"
      />

      {isLoading ? (
        <Skeleton className={'rounded-full animate-pulse'}>
          <Button size={"lg"}>
          </Button>
        </Skeleton>
      ) : (
        <SignInButton>
          <Button variant={"ghost"} radius={"full"} size={"lg"}>
            Sign in
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Login;
