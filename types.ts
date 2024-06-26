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

// Type for the suggestions object in the Project type
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

// Isomorphic to Supabase table "models"
export type Model = {
  model_id?: string;
  model_name: string;
  user_id?: string;
  // Used for LocalAI:llamacpp LocalAI:ollama, and cloud models
  model_endpoint?: string;
  // Used for LocalAI models
  model_url?: string;
  model_provider:
    | "OpenAI"
    | "Mistral"
    | "LocalAI" // Indicates a local model served via REST API
    | "LocalAI:llamacpp"
    | "LocalAI:ollama";
  created_at?: string;
};

// Isomorphic to Supabase table "messages"
export type Message = {
  message_id?: string;
  chat_id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

// Isomorphic to Supabase table "chats"
export type Chat = {
  chat_id: string;
  chat_name?: string;
  project_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

// Isomorphic to Supabase table "api_keys"
export type APIKey = {
  user_id: string;
  key_name: string;
  key_value: string;
  created_at: string;
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
