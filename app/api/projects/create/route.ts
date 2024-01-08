import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Project } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.json();
  const {
    project_name,
    project_description,
    logo_needed,
    slogan_needed,
    action_plan_needed,
    tech_stack_needed,
    logo_keywords,
    slogan_keywords,
    tech_stack_keywords,
    experience_level,
  } = formData;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data: user_id } = await supabase.auth.getUser();

  if (!user_id.user?.id) {
    redirect("/login?mode=sign-in");
  }

  const {
    data,
    error,
  }: {
    data: Project | null;
    error: PostgrestError | null;
  } = await supabase
    .from("projects")
    .insert([
      {
        creator_id: user_id.user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_name: project_name || null,
        project_description: project_description || null,

        name_needed: project_name === "" ? false : true,
        logo_needed: logo_needed,
        slogan_needed: slogan_needed,
        action_plan_needed: action_plan_needed,
        tech_stack_needed: tech_stack_needed,

        logo_keywords: logo_keywords || null,
        slogan_keywords: slogan_keywords || null,
        tech_stack_keywords: tech_stack_keywords || null,
        experience_level: experience_level || null,
      },
    ])
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  redirect(`/projects/${data.project_id}`);
}
