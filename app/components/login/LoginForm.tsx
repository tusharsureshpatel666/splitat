"use client";

import React from "react";
import Image from "next/image";
import { SignIn1 } from "./socialButton";

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center w-full mt-10 md:px-4">
      <div className="w-full max-w-md space-y-5">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold dark:text-white">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Sign in to continue
          </p>
        </div>

        {/* Google */}
        <button
          onClick={() => SignIn1("google")}
          className="w-full border cursor-pointer dark:text-white border-gray-600 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:ring-2 focus:ring-blue-400"
        >
          <Image src="/Google.svg" width={20} height={20} alt="Google" />
          <span>Continue with Google</span>
        </button>

        {/* Discord */}
        <button
          onClick={() => SignIn1("facebook")}
          className="w-full cursor-pointer border dark:text-white border-gray-600 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:ring-2 focus:ring-indigo-400"
        >
          <Image src="/facebook.svg" width={20} height={20} alt="Discord" />
          <span>Continue with Facebook</span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => SignIn1("twitter")}
          className="w-full border cursor-pointer dark:text-white border-gray-600 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:ring-2 focus:ring-blue-500"
        >
          <Image src="/x.svg" width={20} height={20} alt="Facebook" />
          <span>Continue with Twitter/X</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
