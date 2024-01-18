import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;
    const { error } = await supabase.from("users").upsert({
      user_id: user?.id,
      email: user?.email,
    });

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?mode=sign-in&error=Something went wrong. Try signing in again.`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
