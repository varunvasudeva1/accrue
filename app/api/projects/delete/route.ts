import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const {
    user_id,
    project_id,
  }: {
    user_id: string;
    project_id: string;
  } = await request.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  if (!user_id) {
    redirect("/login?mode=sign-in");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("project_id", project_id);

  if (error) {
    return NextResponse.error();
  }

  redirect(`/projects`);
}
