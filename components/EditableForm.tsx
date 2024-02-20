"use client";
import { useLayoutEffect, useMemo, useState } from "react";
import { FormData, Project } from "@/types";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs";
import { deleteProject, updateProject } from "@/actions";
import ActionBar from "./ActionBar";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

export default function EditableForm({ project }: { project: Project }) {
  const router = useRouter();
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
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    },
    {
      title: "logo",
      needed: logo_needed,
      htmlFor: "logoNeeded",
      keywords: logo_keywords,
    },
    {
      title: "slogan",
      needed: slogan_needed,
      htmlFor: "sloganNeeded",
      keywords: slogan_keywords,
    },
    {
      title: "tech stack",
      needed: tech_stack_needed,
      htmlFor: "techStackNeeded",
      keywords: tech_stack_keywords,
    },
    {
      title: "action plan",
      needed: action_plan_needed,
      htmlFor: "actionPlanNeeded",
      keywords: experience_level,
    },
  ];

  const isFormUnchanged = useMemo(() => {
    const value =
      formData.projectName === project.project_name &&
      formData.projectDescription === project.project_description &&
      formData.nameNeeded === project.name_needed &&
      formData.logoNeeded === project.logo_needed &&
      formData.sloganNeeded === project.slogan_needed &&
      formData.techStackNeeded === project.tech_stack_needed &&
      formData.actionPlanNeeded === project.action_plan_needed &&
      formData.logoKeywords === project.logo_keywords &&
      formData.sloganKeywords === project.slogan_keywords &&
      formData.techStackKeywords === project.tech_stack_keywords;
    return value;
  }, [formData]);

  const [nativeShareAvailable, setNativeShareAvailable] =
    useState<boolean>(false);

  useLayoutEffect(() => {
    const getNavigator = () => {
      return navigator.share;
    };

    if (getNavigator()) {
      setNativeShareAvailable(true);
    }
  }, []);

  const handleFormChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateProject({
      project_id,
      ...formData,
    });
    router.refresh();
  };

  const handleDownload = async (e: any) => {
    e.preventDefault();
    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `accrue-${project_name ?? project_id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (e: any) => {
    e.preventDefault();
    const shareData = {
      title: `${project_name} on Accrue`,
      text: "Check out this project on Accrue!",
      url: `https://accrueapp.com/projects/${project_id}`,
    };
    if (navigator.share) {
      navigator.share(shareData);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    await deleteProject(project_id);
    router.push("/projects");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 space-y-4">
      <div className="flex flex-col items-start justify-start w-full border-b border-gray-300 border-opacity-40 space-y-2">
        <input
          className="font-semibold text-2xl lg:text-3xl text-white bg-zinc-800 bg-opacity-0 rounded-md w-full focus:p-2 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          type="text"
          name="projectName"
          value={formData.projectName}
          placeholder="(untitled)"
          onChange={handleFormChange}
        />
        <p className="font-medium text-md lg:text-lg text-purple-200">
          {project.project_id}
        </p>
        <ActionBar
          className="self-end"
          type="project"
          saveProject={handleSave}
          saveProjectDisabled={isFormUnchanged}
          downloadProject={handleDownload}
          downloadProjectDisabled={false}
          shareProject={handleShare}
          shareProjectDisabled={!nativeShareAvailable}
          deleteProject={() => setConfirmDelete(true)}
          deleteProjectDisabled={false}
        />
      </div>
      <section className="flex flex-col items-start justify-center w-full">
        <h3 className="font-semibold text-md lg:text-lg text-purple-200 mb-1">
          description
        </h3>
        <textarea
          name="projectDescription"
          id="projectDescription"
          value={formData.projectDescription}
          className="text-md lg:text-lg text-white bg-zinc-800 bg-opacity-50 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          onChange={handleFormChange}
        />
      </section>

      <section className="flex flex-col items-start justify-center w-full space-y-4">
        <div className="flex flex-row items-center justify-between w-full border-b border-gray-300 border-opacity-40 mb-2">
          <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
            requirements
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
          {options.map((option, index) => (
            <div className="relative flex" key={index}>
              <input
                type="checkbox"
                id={option.htmlFor}
                name={option.htmlFor}
                checked={Boolean(formData[option.htmlFor])}
                onChange={handleFormChange}
                className="hidden"
              />
              <label
                htmlFor={option.htmlFor}
                className={`bg-zinc-900 hover:bg-opacity-50 w-full p-4 flex-grow rounded-lg ${
                  formData[option.htmlFor]
                    ? "bg-zinc-950 ring-inset ring-1 ring-white ring-opacity-60"
                    : ""
                } cursor-pointer`}
              >
                {formData[option.htmlFor] ? (
                  <BsCheckCircleFill className="text-white text-2xl absolute top-3 right-3" />
                ) : (
                  <BsPlusCircle className="text-white text-2xl absolute top-3 right-3" />
                )}
                <div className="block space-y-3">
                  <label
                    className="text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-white to-purple-100 font-semibold"
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
      <Dialog
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-30 flex flex-col items-center justify-center"
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <Dialog.Panel className="flex flex-col items-center justify-center w-fit h-fit bg-zinc-900 p-4 m-4 max-w-2xl text-center space-y-2 rounded-md">
          <Dialog.Title
            className="font-semibold text-xl lg:text-2xl text-purple-200"
            as="h3"
          >
            Delete project
          </Dialog.Title>
          <Dialog.Description
            className="text-gray-200 text-lg lg:text-xl"
            as="p"
          >
            This will permanently delete your project and its contents. This
            action cannot be undone.
          </Dialog.Description>

          <Button onClick={handleDelete}>Delete</Button>
          <Button
            className="bg-zinc-700 text-white"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </Button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
