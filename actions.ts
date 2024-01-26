"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Project } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) throw error;

    if (!user) return null;

    return user.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createProject = async (requestData: {
  user_id: string;
  projectName: string;
  projectDescription: string;
  logoNeeded: boolean;
  sloganNeeded: boolean;
  actionPlanNeeded: boolean;
  techStackNeeded: boolean;
  logoKeywords: string;
  sloganKeywords: string;
  techStackKeywords: string;
  experienceLevel: string;
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    user_id,
    projectName,
    projectDescription,
    logoNeeded,
    sloganNeeded,
    actionPlanNeeded,
    techStackNeeded,
    logoKeywords,
    sloganKeywords,
    techStackKeywords,
    experienceLevel,
  } = requestData;

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
          project_name: projectName,
          project_description: projectDescription,

          name_needed: projectName === "" ? true : false,
          logo_needed: logoNeeded,
          slogan_needed: sloganNeeded,
          action_plan_needed: actionPlanNeeded,
          tech_stack_needed: techStackNeeded,

          logo_keywords: logoKeywords,
          slogan_keywords: sloganKeywords,
          tech_stack_keywords: techStackKeywords,
          experience_level: experienceLevel,
        },
      ])
      .select();

    if (error) throw error;

    if (!data) return null;

    return data[0];
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const updateProject = async (requestData: {
  project_id: string;
  projectName: string;
  projectDescription: string;
  nameNeeded: boolean;
  logoNeeded: boolean;
  sloganNeeded: boolean;
  actionPlanNeeded: boolean;
  techStackNeeded: boolean;
  logoKeywords: string;
  sloganKeywords: string;
  techStackKeywords: string;
  experienceLevel: string;
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    project_id,
    projectName,
    projectDescription,
    nameNeeded,
    logoNeeded,
    sloganNeeded,
    actionPlanNeeded,
    techStackNeeded,
    logoKeywords,
    sloganKeywords,
    techStackKeywords,
    experienceLevel,
  } = requestData;

  try {
    const {
      error,
    }: {
      data: Project[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from("projects")
      .update({
        updated_at: new Date().toISOString(),
        project_name: projectName,
        project_description: projectDescription,

        name_needed: nameNeeded,
        logo_needed: logoNeeded,
        slogan_needed: sloganNeeded,
        action_plan_needed: actionPlanNeeded,
        tech_stack_needed: techStackNeeded,

        logo_keywords: logoKeywords,
        slogan_keywords: sloganKeywords,
        tech_stack_keywords: techStackKeywords,
        experience_level: experienceLevel,
      })
      .eq("project_id", project_id);

    if (error) throw error;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const getProject = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
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
      .select("*")
      .limit(10)
      .eq("project_id", id);

    if (error) throw error;

    if (!data) return null;

    return data[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProjects = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      data,
      error,
    }: {
      data: Project[] | null;
      error: PostgrestError | null;
    } = await supabase.from("projects").select("*").limit(10);

    if (error) throw error;

    if (!data) return null;

    return data.sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  } catch (e) {
    console.error(e);
  }
};
