"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { APIKey, Chat, Message, Model, Project, Suggestions } from "./types";
import { PostgrestError } from "@supabase/supabase-js";
import { getAvailableDefaultModels } from "./utils";
import ollama from "ollama";

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

export const getCurrentUserTier = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const { data: user, error } = await supabase.from("users").select("tier");

    if (error) throw error;

    if (!user) return null;

    return user[0].tier;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getApiKeys = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const { data, error } = await supabase.from("api_keys").select("*");

    if (error) throw error;

    return data;
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

export const updateSuggestions = async ({
  project_id,
  suggestions,
}: {
  project_id: string;
  suggestions: Suggestions | null;
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
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
        suggestions: suggestions,
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

export const deleteProject = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      error,
    }: {
      data: Project[] | null;
      error: PostgrestError | null;
    } = await supabase.from("projects").delete().eq("project_id", id);

    if (error) throw error;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const getUserModels = async (apiKeys: APIKey[] | null) => {
  if (!apiKeys) return null;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const models = [];
  const { data, error } = await supabase.from("models").select("*").limit(10);
  if (error) throw error;
  const savedModels = data?.filter((model: Model) => {
    return apiKeys.some((key) => {
      if (model.model_provider.includes("LocalAI")) return true;
      return key.key_name === `${model.model_provider.toUpperCase()}_API_KEY`;
    });
  });
  if (savedModels) models.push(...savedModels);

  try {
    const localModels = (await ollama.list()).models;
    localModels.forEach((model) => {
      Object.assign(model, {
        model_name: model.name,
        model_endpoint: model.name,
        model_provider: "LocalAI:ollama",
      });
    });
    if (localModels) models.push(...localModels);
  } catch (e) {
    console.error(e);
  }

  const availableDefaultModels = getAvailableDefaultModels(apiKeys);
  if (availableDefaultModels) models.push(...availableDefaultModels);

  return models;
};

export const getChats = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      data,
      error,
    }: {
      data: Chat[] | null;
      error: PostgrestError | null;
    } = await supabase.from("chats").select("*").limit(10);

    if (error) throw error;

    if (!data) return null;

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getChat = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      data,
      error,
    }: {
      data: Chat | null;
      error: PostgrestError | null;
    } = await supabase
      .from("chats")
      .select("*")
      .limit(10)
      .eq("chat_id", id)
      .single();

    if (error) throw error;

    if (!data) return null;

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createChat = async (requestData: {
  chatName?: string;
  projectId?: string;
  userId?: string;
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { chatName, projectId, userId } = requestData;
  try {
    const {
      data,
      error,
    }: {
      data: Chat[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from("chats")
      .insert([
        {
          chat_name: chatName,
          project_id: projectId,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
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

export const getMessages = async (chatId: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      data,
      error,
    }: {
      data: Message[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from("messages")
      .select("*")
      .limit(10)
      .eq("chat_id", chatId);

    if (error) throw error;

    if (!data) return null;

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
