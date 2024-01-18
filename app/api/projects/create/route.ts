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
    projectName: project_name,
    projectDescription: project_description,
    logoNeeded: logo_needed,
    sloganNeeded: slogan_needed,
    actionPlanNeeded: action_plan_needed,
    techStackNeeded: tech_stack_needed,
    logoKeywords: logo_keywords,
    sloganKeywords: slogan_keywords,
    techStackKeywords: tech_stack_keywords,
    experienceLevel: experience_level,
  } = requestData;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  try {
    const {
      data,
      error,
    }: {
      data: Project[] | null;
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
      .select();

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || "Something went wrong." },
        {
          status: 500,
        }
      );
    }

    const origin = new URL(request.url).origin;
    const project_id = data[0].project_id;
    return NextResponse.redirect(`${origin}/projects/${project_id}`, {
      status: 301,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
