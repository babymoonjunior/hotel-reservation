"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function LoginFrom() {
  return (
    <>
      <div className="flex text-gray-900 h-full w-full">
        <div className=" flex-1 h-[924px] w-[708px] relative">
          <Image
            className=""
            src="/loginphoto.svg"
            objectFit="cover"
            layout="fill"
            alt="photo-login"
          />
        </div>
        <div className="flex-1 flex flex-col h-full w-full font-sans p-52 pt-40">
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

          <Button className="w-full">Log In</Button>
          <div className="flex items-center">
            <span>Don't have an account yet?</span>{" "}
            <Button variant="ghost">Register</Button>
          </div>
        </div>
      </div>
    </>
  );
}
