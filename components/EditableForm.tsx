"use client";
import { useMemo, useState } from "react";
import { FormData, Project } from "@/types";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs";
import { updateProject } from "@/actions";

export default function EditableForm({ project }: { project: Project }) {
  const {
    project_id,
    project_name,
    project_description,

    name_needed,
    logo_needed,
    slogan_needed,
    tech_stack_needed,
    action_plan_needed,

    logo_keywords,
    slogan_keywords,
    tech_stack_keywords,
    experience_level,

    name_suggestions,
    logo_suggestions,
    slogan_suggestions,
    tech_stack_suggestion,
    action_plan_suggestion,
  } = project;

  const [formData, setFormData] = useState<FormData>({
    projectName: project_name || "",
    projectDescription: project_description || "",

    nameNeeded: name_needed,
    logoNeeded: logo_needed,
    sloganNeeded: slogan_needed,
    techStackNeeded: tech_stack_needed,
    actionPlanNeeded: action_plan_needed,

    logoKeywords: logo_keywords || "",
    sloganKeywords: slogan_keywords || "",
    techStackKeywords: tech_stack_keywords || "",
    experienceLevel: experience_level || "",
  });

  const options: {
    title: string;
    needed: boolean;
    htmlFor:
      | "nameNeeded"
      | "logoNeeded"
      | "sloganNeeded"
      | "techStackNeeded"
      | "actionPlanNeeded";
    keywords?: string;
    suggestion?: string | string[];
  }[] = [
    {
      title: "name",
      needed: name_needed,
      htmlFor: "nameNeeded",
      suggestion: name_suggestions,
    },
    {
      title: "logo",
      needed: logo_needed,
      htmlFor: "logoNeeded",
      keywords: logo_keywords,
      suggestion: logo_suggestions,
    },
    {
      title: "slogan",
      needed: slogan_needed,
      htmlFor: "sloganNeeded",
      keywords: slogan_keywords,
      suggestion: slogan_suggestions,
    },
    {
      title: "tech stack",
      needed: tech_stack_needed,
      htmlFor: "techStackNeeded",
      keywords: tech_stack_keywords,
      suggestion: tech_stack_suggestion,
    },
    {
      title: "action plan",
      needed: action_plan_needed,
      htmlFor: "actionPlanNeeded",
      keywords: experience_level,
      suggestion: action_plan_suggestion,
    },
  ];

  const isFormUnchanged = useMemo(() => {
    const value =
      formData.projectName === project.project_name &&
      formData.projectDescription === project.project_description &&
      formData.logoNeeded === project.logo_needed &&
      formData.sloganNeeded === project.slogan_needed &&
      formData.techStackNeeded === project.tech_stack_needed &&
      formData.actionPlanNeeded === project.action_plan_needed &&
      formData.logoKeywords === project.logo_keywords &&
      formData.sloganKeywords === project.slogan_keywords &&
      formData.techStackKeywords === project.tech_stack_keywords;
    return value;
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateProject({
      project_id,
      ...formData,
      nameNeeded: name_needed ?? project_name === "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 space-y-4">
      <button
        className="flex flex-row items-center justify-center px-4 py-2 bg-purple-800 disabled:bg-zinc-800 bg-opacity-50 rounded-md
        hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out self-end space-x-2"
        disabled={isFormUnchanged}
        onClick={handleSubmit}
      >
        <h3 className="font-bold text-lg lg:text-xl text-purple-200">save</h3>
      </button>
      <section className="flex flex-col items-start justify-center w-full">
        <h3 className="font-semibold text-md lg:text-lg text-purple-200 mb-1">
          description
        </h3>
        <textarea
          name="projectDescription"
          id="projectDescription"
          value={formData.projectDescription}
          className="text-md lg:text-lg text-white bg-zinc-800 bg-opacity-50 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          onChange={handleChange}
        />
      </section>

      <section className="flex flex-col items-start justify-center w-full">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
          requirements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
          {options.map((option, index) => (
            <div className="relative flex" key={index}>
              <input
                type="checkbox"
                id={option.htmlFor}
                name={option.htmlFor}
                checked={Boolean(formData[option.htmlFor])}
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor={option.htmlFor}
                className={`bg-zinc-900 hover:bg-opacity-50 w-full p-4 flex-grow rounded-lg ${
                  formData[option.htmlFor]
                    ? "bg-zinc-950 border border-purple-300"
                    : ""
                } cursor-pointer`}
              >
                {formData[option.htmlFor] ? (
                  <BsCheckCircleFill className="text-purple-300 text-2xl absolute top-3 right-3" />
                ) : (
                  <BsPlusCircle className="text-purple-300 text-2xl absolute top-3 right-3" />
                )}
                <div className="block space-y-3">
                  <label
                    className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold"
                    htmlFor={option.htmlFor}
                  >
                    {option.title}
                  </label>
                </div>
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-center w-full">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
          suggestions
        </h3>
        {options.map((option, index) => {
          if (option.suggestion) {
            return (
              <div
                className="flex flex-col items-start justify-center w-full mb-2"
                key={index}
              >
                <h4 className="font-semibold text-md lg:text-lg text-purple-200 mb-1">
                  {option.title}
                </h4>
                <p className="text-md lg:text-lg text-white bg-zinc-800 bg-opacity-50 rounded-md w-full p-2">
                  {option.suggestion}
                </p>
              </div>
            );
          }
        })}
      </section>
    </div>
  );
}
