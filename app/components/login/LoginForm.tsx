"use client";

import React from "react";
import Image from "next/image";
import { SignIn1 } from "./socialButton";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="mt-5 h-[80vh] w-full bg-[#0f0f0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.svg"
            alt="SplitAt Logo"
            width={56}
            height={56}
            priority
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">
            Welcome to SplitAt
          </h1>
        </div>

        {/* Login Label */}
        <p className="text-center text-xs text-gray-500 mb-3">Log in with</p>

        {/* Google */}
        <button
          onClick={() => SignIn1("google")}
          className="
            w-full
            h-12
            bg-white
            text-black
            rounded-lg
            flex
            items-center
            justify-center
            gap-3
            font-medium
            text-sm
            cursor-pointer
            hover:bg-gray-100
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-white/30
          "
        >
          <Image src="/Google.svg" width={20} height={20} alt="Google" />

          <span>Continue with Google</span>
        </button>

        {/* Sign up */}
        <Link
          href={"/signin"}
          className="text-center flex items-center justify-center gap-1 text-sm text-gray-500 mt-8"
        >
          Don't have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Sign up
          </span>
        </Link>

        {/* Terms */}
        <p className="text-center text-xs text-gray-600 mt-6 leading-relaxed">
          By continuing, you agree to SplitAt's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
