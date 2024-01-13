import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Project } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestData = await request.json();
  const {
    user_id,
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
  } = requestData;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

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
        creator_id: user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_name: project_name,
        project_description: project_description,

        name_needed: project_name === "" ? false : true,
        logo_needed: logo_needed,
        slogan_needed: slogan_needed,
        action_plan_needed: action_plan_needed,
        tech_stack_needed: tech_stack_needed,

        logo_keywords: logo_keywords,
        slogan_keywords: slogan_keywords,
        tech_stack_keywords: tech_stack_keywords,
        experience_level: experience_level,
      },
    ])
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  redirect(`/projects/${data.project_id}`);
}
