"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Project } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

export const getProject = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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

    return data;
  } catch (e) {
    console.error(e);
  }
};
