import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = createRouteHandlerClient({ cookies });

  // Sign in the user with the provided email and password
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Assuming you have user data that needs to be updated
  const userId = supabase.auth.user().id; // Get the user's ID
  const fullName = formData.get("fullName");
  const dateBirth = formData.get("dateBirth");
  const idNumber = formData.get("idNumber");
  const country = formData.get("country");

  // Update the user's profile data in your Supabase table
  const { error } = await supabase
    .from("profiles")
    .update([
      {
        full_name: fullName,
        birthdate: dateBirth,
        id_card: idNumber,
        country,
      },
    ])
    .eq("user_id", userId);

  if (error) {
    // Handle the error, e.g., return an error response
    return new Response("Profile update failed", { status: 500 });
  }

  // Redirect the user to a success page or any other appropriate page
  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
