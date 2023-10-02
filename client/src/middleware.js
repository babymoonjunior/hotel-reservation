import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();

    // If the user is not authenticated and the requested path is not "/login", redirect to "/login"
    if (!user && req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user is an admin and the requested path does not start with "/dashboard", redirect to "/dashboard/booking"
    if (
      user &&
      data.role === "admin" &&
      !req.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard/booking", req.url));
    }

    // If the user is not an admin and the requested path start with "/dashboard", redirect to "/"
    if (
      user &&
      data.role !== "admin" &&
      req.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // For any other cases, allow access
    return res;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookinghistory",
    "/profileupdate",
    "/paymentupdate",
    "/changedate",
    "/reservations/:path*",
  ],
};
