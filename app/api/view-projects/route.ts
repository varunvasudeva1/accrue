import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { user_id } = await request.json();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  if (!user_id) {
    redirect("/login/sign-in");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("creator_id", user_id);

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
