'use client';
import { Button, buttonVariants } from "@/components/ui/button";

export default function LoginFrom() {
    return (
        <div className="flex flex-col w-full h-full">
            <t className="font-mono font-[500] text-[68px] h-[85px]">Log In</t>
            <label>Username or Email</label>
            <input
                type="text"
                name="username"
                placeholder="Enter your username or email"
            ></input>
            <label>Password</label>
            <input type="password" placeholder="Enter your password"></input>
            <Button className=" w-full">Log In</Button>
            <div>
                <span>Don't have an account yet?</span>{" "}
                <Button variant="ghost">
                    Register
                </Button>
            </div>
        </div>
    );
}