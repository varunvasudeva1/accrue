import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data, error } = await supabase.auth.getSession();

  // If signed in and navigating to "/", redirect to "/dashboard"
  // If signed out and navigating to "/", redirect to "/about"
  const goingHome = req.nextUrl.pathname === "/";
  const origin = req.nextUrl.origin;
  const userFound = !error && data.session?.user;

  if (goingHome) {
    if (userFound) {
      return NextResponse.redirect(`${origin}/dashboard`);
    } else {
      return NextResponse.redirect(`${origin}/about`);
    }
  }
  return res;
}
