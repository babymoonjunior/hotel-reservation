"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert(`Cannot login`);
      router.refresh();
    } else {
      alert(`login successful`);
      router.push("/");
    }
  };

  // const handleSignUp = async () => {
  //   try {
  //     const { data: user, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           first_name: "Nu",
  //           last_name: "NuNu",
  //           creditcard: "213123123123",
  //         },
  //       },
  //     });

  //     if (error) {
  //       console.error("Registration error:", error.message);
  //       return;
  //     }

  //     console.log("User registered successfully:", user);

  //     // Check if user.data exists before accessing its properties
  //     if (user && user.data) {
  //       const { first_name, last_name, creditcard } = user.data;
  //       console.log("User data:", { first_name, last_name, creditcard });
  //     } else {
  //       console.error("User data is missing or undefined.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  return (
    <>
      <form
        className=" flex flex-col h-full w-1/2 font-sans p-40 pt-40"
        method="post"
        onSubmit={handleSignIn}
      >
        <t className="font-mono font-medium text-[68px] h-[85px] text-green-800 mb-16">
          Log In
        </t>
        <label htmlFor="email" className="gap-2 flex flex-col mb-8">
          Username or Email
          <input
            className="outline-none border border-gray-400 focus:border-orange-500 rounded-sm h-12 p-3"
            type="text"
            name="email"
            placeholder="Enter your username or email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label htmlFor="password" className="gap-2 flex flex-col mb-8">
          Password
          <input
            className="outline-none border border-gray-400 focus:border-orange-500 rounded-sm h-12 p-3"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
      {/* <Button onClick={() => handleSignUp()} className="w-full">
        SignUp
      </Button> */}
    </>
  );
}
