"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError("Login failed. Please check your credentials.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <div className="flex items-center relative">
            <input
              className="outline-none border border-gray-400 focus:border-orange-500 rounded-sm h-12 p-3 pr-10 w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
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
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}
