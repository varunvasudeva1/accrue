"use client";
import { useEffect, useState } from "react";
import { PiLightning } from "react-icons/pi/index";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs/index";
import { Transition } from "@headlessui/react";
import { FormData } from "@/types";
import Info from "@/components/Info";
import { useRouter } from "next/navigation";
import { createProject, getCurrentUser } from "@/actions";
import Button from "@/components/Button";

export default function Index() {
  const router = useRouter();

  const getUserId = async (): Promise<string | null> => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return null;
      }
      return user.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const submitProject = async (user_id: string, formData: FormData) => {
    try {
      const response = await createProject({
        ...formData,
        user_id,
      });
      if (response) {
        router.push(`/projects/${response.project_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // If user is logged in and there is form data in local storage, load it into the UI
  useEffect(() => {
    const getUserAndLoadFormData = async () => {
      const userId = await getUserId();
      const formData = localStorage.getItem("formData");
      if (userId && formData) {
        setFormData(JSON.parse(formData));
        localStorage.removeItem("formData");
      }
    };
    getUserAndLoadFormData();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectDescription: "",

    nameNeeded: false,
    logoNeeded: false,
    sloganNeeded: false,
    techStackNeeded: false,
    actionPlanNeeded: false,

    logoKeywords: "",
    sloganKeywords: "",
    techStackKeywords: "",
    experienceLevel: "beginner",
  });

  const kickoffQuestions: {
    title: string;
    htmlFor:
      | "logoNeeded"
      | "sloganNeeded"
      | "actionPlanNeeded"
      | "techStackNeeded";
    description: string;
  }[] = [
    {
      title: "logo",
      htmlFor: "logoNeeded",
      description:
        "Share a few keywords that reflect the vibe you want for your project logo.",
    },
    {
      title: "slogan",
      htmlFor: "sloganNeeded",
      description:
        "Provide keywords to help us generate a catchy slogan for your project.",
    },
    {
      title: "tech stack",
      htmlFor: "techStackNeeded",
      description:
        "Let us know your technology preferences for personalized tech stack recommendations.",
    },
    {
      title: "action plan",
      htmlFor: "actionPlanNeeded",
      description:
        "Create an action plan with milestones and deliverables tailored to your experience level.",
    },
  ];

  const experienceLevels: {
    name: "beginner" | "intermediate" | "advanced" | "expert";
    description: string;
  }[] = [
    {
      name: "beginner",
      description: "0-1 years of experience",
    },
    {
      name: "intermediate",
      description: "1-3 years of experience",
    },
    { name: "advanced", description: "3+ years of experience" },
    { name: "expert", description: "5+ years of experience" },
  ];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setExperienceLevel = (
    level: "beginner" | "intermediate" | "advanced" | "expert"
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      experienceLevel: level,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = await getUserId();
    if (!user_id) {
      // Save the form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/login?mode=sign-in");
      return;
    }
    await submitProject(user_id, formData);
  };

  return (
    <div className="flex flex-col items-start justify-start space-y-8">
      <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200 pb-2">
        create project
      </h3>
      <div className="flex flex-col items-center justify-center self-center w-full sm:w-3/4 lg:w-1/2 space-y-8">
        <form
          className="flex flex-col items-center justify-center gap-6 lg:gap-10 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-3 w-full">
            <div className="flex flex-row space-x-2">
              <label
                className="text-xl lg:text-2xl font-semibold text-white"
                htmlFor="experienceLevel"
              >
                project name
              </label>
              <Info text="Leave this blank and we'll generate suggestions for you." />
            </div>
            <input
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60 w-full"
              name="projectName"
              id="projectName"
              type="text"
              placeholder="Come up with something cool"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-3 w-full">
            <div className="flex flex-row space-x-2">
              <label
                className="text-xl lg:text-2xl font-semibold text-white"
                htmlFor="experienceLevel"
              >
                project description
              </label>
              <Info
                text="Tell us about your project! Describe what it does, what it's for, and why you're building it.
                The more information, the more your Accrue bot will be able to answer and generate for you."
              />
            </div>
            <textarea
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60 w-full"
              name="projectDescription"
              id="projectDescription"
              placeholder="Write your project description here"
              value={formData.projectDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
            {kickoffQuestions.map((question, index) => (
              <div className="relative flex" key={index}>
                <input
                  type="checkbox"
                  id={question.htmlFor}
                  name={question.htmlFor}
                  checked={formData[question.htmlFor]}
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor={question.htmlFor}
                  className={`bg-zinc-900 hover:bg-opacity-50 w-full p-4 flex-grow rounded-lg ${
                    formData[question.htmlFor]
                      ? "bg-zinc-950 ring-inset ring-1 ring-white ring-opacity-60"
                      : ""
                  } cursor-pointer`}
                >
                  {formData[question.htmlFor] ? (
                    <BsCheckCircleFill className="text-white text-2xl absolute top-3 right-3" />
                  ) : (
                    <BsPlusCircle className="text-white text-2xl absolute top-3 right-3" />
                  )}
                  <div className="block space-y-3">
                    <label
                      className="text-xl lg:text-2xl text-white font-semibold"
                      htmlFor={question.htmlFor}
                    >
                      {question.title}
                    </label>
                    <p className="text-md lg:text-lg text-gray-200 font-light">
                      {question.description}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <Transition
            show={formData.logoNeeded}
            className="flex flex-col space-y-3 w-full"
            enter="transition-all duration-500"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <label
              className="text-xl lg:text-2xl font-semibold text-white"
              htmlFor="logoKeywords"
            >
              logo keywords
            </label>
            <input
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60 w-full"
              name="logoKeywords"
              id="logoKeywords"
              type="text"
              placeholder="e.g. modern, minimal, clean"
              value={formData.logoKeywords}
              onChange={handleChange}
              required={formData.logoNeeded || false}
            />
          </Transition>

          <Transition
            show={formData.sloganNeeded}
            className="flex flex-col space-y-3 w-full"
            enter="transition-all duration-500"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <label
              className="text-xl lg:text-2xl font-semibold text-white"
              htmlFor="sloganKeywords"
            >
              slogan keywords
            </label>
            <input
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60 w-full"
              name="sloganKeywords"
              id="sloganKeywords"
              type="text"
              placeholder="e.g. inspiring, motivational, fun"
              value={formData.sloganKeywords}
              onChange={handleChange}
              required={formData.sloganNeeded || false}
            />
          </Transition>

          <Transition
            show={formData.techStackNeeded}
            className="flex flex-col space-y-3 w-full"
            enter="transition-all duration-500"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <label
              className="text-xl lg:text-2xl font-semibold text-white"
              htmlFor="techStackKeywords"
            >
              tech stack keywords
            </label>
            <input
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60 w-full"
              name="techStackKeywords"
              id="techStackKeywords"
              type="text"
              placeholder="e.g. React, TypeScript, Node.js"
              value={formData.techStackKeywords}
              onChange={handleChange}
              required={formData.techStackNeeded || false}
            />
          </Transition>

          <Transition
            show={formData.actionPlanNeeded}
            className="flex flex-col space-y-3 w-full"
            enter="transition-all duration-500"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="flex flex-row space-x-2">
              <label
                className="text-xl lg:text-2xl font-semibold text-white"
                htmlFor="experienceLevel"
              >
                experience level
              </label>
              <Info text="This will help us generate a plan that's right for you." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
              {experienceLevels.map((level, index) => (
                <div className="relative flex" key={index}>
                  <input
                    type="radio"
                    id={level.name}
                    name="experienceLevel"
                    value={level.name}
                    checked={formData.experienceLevel === level.name}
                    onChange={() => setExperienceLevel(level.name)}
                    className="hidden"
                    required={formData.actionPlanNeeded || false}
                  />
                  <label
                    htmlFor={level.name}
                    className={`bg-zinc-900 hover:bg-opacity-50 w-full p-4 flex-grow rounded-lg ${
                      formData.experienceLevel === level.name
                        ? "bg-zinc-950 ring-inset ring-1 ring-white ring-opacity-60"
                        : ""
                    } cursor-pointer`}
                  >
                    {formData.experienceLevel === level.name && (
                      <BsCheckCircleFill className="text-white text-2xl absolute top-3 right-3" />
                    )}
                    <div className="block space-y-3">
                      <label
                        htmlFor={level.name}
                        className="text-lg lg:text-xl font-medium text-white"
                      >
                        {level.name}
                      </label>
                      <p className="text-md lg:text-lg text-gray-200 font-light">
                        {level.description}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </Transition>

          <Button type="submit">
            <PiLightning className="text-white text-xl lg:text-2xl" />
            <h3 className="font-normal text-md lg:text-lg text-white font-mono ml-2">
              create
            </h3>
          </Button>
        </form>
      </div>
    </div>
  );
}
