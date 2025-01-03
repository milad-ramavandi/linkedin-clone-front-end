"use client";
import { Button } from "@nextui-org/react";
import React from "react";

const errorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-1/2 lg:w-1/3 p-1 flex flex-col space-y-2 bg-gray-100 shadow-lg rounded-md">
        <p className="text-red-500 font-bold text-large text-center">
          Opps, there is an Error: {error.message}
        </p>
        <div className="w-1/3 mx-auto">
          <Button onClick={reset} fullWidth variant={"ghost"}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default errorPage;
