// Used by /projects/create
export type FormData = {
  projectName: string;
  projectDescription: string;

  nameNeeded: boolean;
  logoNeeded: boolean;
  sloganNeeded: boolean;
  techStackNeeded: boolean;
  actionPlanNeeded: boolean;

  logoKeywords: string;
  sloganKeywords: string;
  techStackKeywords: string;
  experienceLevel: string;
};

export type Suggestions = {
  name_suggestions?: string[];
  logo_suggestions?: string[];
  slogan_suggestions?: string[];
  tech_stack_suggestion?: string;
  action_plan_suggestion?: {
    action: string;
    plan: string;
    deadline: string;
  }[];
};

// Isomorphic to Supabase table "projects"
export type Project = {
  project_id: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
  project_name?: string;
  project_description: string;

  name_needed: boolean;
  logo_needed: boolean;
  slogan_needed: boolean;
  tech_stack_needed: boolean;
  action_plan_needed: boolean;

  // Further questions
  logo_keywords?: string;
  slogan_keywords?: string;
  tech_stack_keywords?: string;
  experience_level?: "beginner" | "intermediate" | "advanced" | "expert";

  suggestions?: Suggestions | null;
  suggestions_needed?: boolean;
};

export type Model = {
  name: string;
  value:
    | "gpt-3.5-turbo-1106"
    | "gpt-4-turbo-preview"
    | "mistral-tiny"
    | "mistral-small"
    | "mistral-medium";
  requiredAPIKey: "OPENAI_API_KEY" | "ANYSCALE_API_KEY" | null;
};

export type Tier = {
  name: "individual" | "team" | "enterprise";
  monthlyPrice: number;
  yearlyPrice: number;
  numberOfProjectsAllowed: number;
  numberOfTeamsAllowed: number;
  numberOfTeamMembersAllowed: number;
  bestFor: string;
  description: string;
};
