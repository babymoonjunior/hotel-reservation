"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LoginFrom() {
  return (
    <>
      <form className=" flex flex-col h-full w-1/2 font-sans p-40 pt-40">
        <t className="font-mono font-medium text-[68px] h-[85px] text-green-800 mb-16">
          Log In
        </t>
        <label className="gap-2 flex flex-col mb-8">
          Username or Email
          <input
            className="outline-none border border-gray-400 focus:border-orange-500 rounded-sm h-12 p-3"
            type="text"
            name="username"
            placeholder="Enter your username or email"
          />
        </label>

        <label className="gap-2 flex flex-col mb-8">
          Password
          <input
            className="outline-none border border-gray-400 focus:border-orange-500 rounded-sm h-12 p-3"
            type="password"
            placeholder="Enter your password"
          />
        </label>

        <Button type="submit" className="w-full">
          Log In
        </Button>
        <div className="flex items-center">
          <span>Don't have an account yet?</span>{" "}
          <Link href="/register">
            <Button
              variant="ghost"
              className="bg-utility-bg hover:bg-utility-bg active:bg-utility-bg"
            >
              Register
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
