import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./updateprofile";

export default async function Account() {
  const supabase = createClientComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Session Data:", session);

  return <ProfileUP session={session} />;
}
