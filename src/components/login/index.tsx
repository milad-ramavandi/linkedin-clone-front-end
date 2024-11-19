"use client";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Login = () => {
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
      <div className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        <SignInButton />
      </div>
    </div>
  );
};

export default Login;
