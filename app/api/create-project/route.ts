import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const user_id = String(formData.get("user_id"));
  const project_name = String(formData.get("project_name"));
  const project_description = String(formData.get("project_description"));

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  if (!user_id) {
    redirect("/login/sign-in");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        creator_id: user_id,
        project_name: project_name || null,
        project_description: project_description || null,
      },
    ])
    .select("project_id")
    .single();

  if (error) {
    return NextResponse.error();
  }

  redirect(`/projects/${data.project_id}`);
}
