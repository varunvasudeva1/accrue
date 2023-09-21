import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Project } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const project_name = String(formData.get("projectName"));
  const project_description = String(formData.get("projectDescription"));

  const logo_needed = Boolean(formData.get("logoNeeded"));
  const slogan_needed = Boolean(formData.get("sloganNeeded"));
  const action_plan_needed = Boolean(formData.get("actionPlanNeeded"));
  const tech_stack_needed = Boolean(formData.get("techStackNeeded"));

  const logo_keywords = String(formData.get("logoKeywords"));
  const slogan_keywords = String(formData.get("sloganKeywords"));
  const tech_stack_keywords = String(formData.get("techStackKeywords"));
  const experience_level = String(formData.get("experienceLevel"));

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data: user_id } = await supabase.auth.getUser();

  if (!user_id.user?.id) {
    redirect("/login/sign-in");
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
    .select("project_id")
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  redirect(`/projects/${data.project_id}`);
}
