"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PiLightningFill } from "react-icons/pi/index";
import { BsCheckCircleFill, BsPlusCircle } from "react-icons/bs/index";
import { Transition } from "@headlessui/react";
import { FormData } from "@/types";
import Info from "@/components/Info";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const getUser = async (): Promise<string | null> => {
    const { data: user_id } = await supabase.auth.getUser();
    if (!user_id) {
      return null;
    }
    return user_id.user?.id as string;
  };

  // If user is logged in and has a project in local storage, save it to the database
  useEffect(() => {
    const saveProject = async () => {
      const user_id = await getUser();
      if (!user_id) {
        return;
      }

      const formData = localStorage.getItem("formData");
      if (!formData) {
        return;
      }

      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...JSON.parse(formData), user_id }),
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
    };
    saveProject();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectDescription: "",

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
    const user_id = await getUser();

    if (!user_id) {
      // Save the form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/login?mode=sign-in");
      return;
    }

    const response = await fetch("/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, user_id }),
    });

    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-screen min-h-screen py-20 px-8 space-y-8">
      <h3 className="font-bold text-4xl lg:text-5xl text-center text-purple-200 pb-2 border-purple-200">
        create a new project
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
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 w-full"
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
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 w-full"
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
                      ? "bg-zinc-950 border border-purple-300"
                      : ""
                  } cursor-pointer`}
                >
                  {formData[question.htmlFor] ? (
                    <BsCheckCircleFill className="text-purple-300 text-2xl absolute top-3 right-3" />
                  ) : (
                    <BsPlusCircle className="text-purple-300 text-2xl absolute top-3 right-3" />
                  )}
                  <div className="block space-y-3">
                    <label
                      className="text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-t from-purple-300 to-purple-100 font-semibold"
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
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 w-full"
              name="logoKeywords"
              id="logoKeywords"
              type="text"
              placeholder="e.g. modern, minimal, clean"
              value={formData.logoKeywords}
              onChange={handleChange}
              required={formData.logoNeeded}
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
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 w-full"
              name="sloganKeywords"
              id="sloganKeywords"
              type="text"
              placeholder="e.g. inspiring, motivational, fun"
              value={formData.sloganKeywords}
              onChange={handleChange}
              required={formData.sloganNeeded}
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
              className="rounded-md px-4 py-2 text-start bg-inherit bg-zinc-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 w-full"
              name="techStackKeywords"
              id="techStackKeywords"
              type="text"
              placeholder="e.g. React, TypeScript, Node.js"
              value={formData.techStackKeywords}
              onChange={handleChange}
              required={formData.techStackNeeded}
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
                    required
                  />
                  <label
                    htmlFor={level.name}
                    className={`bg-zinc-900 hover:bg-opacity-50 w-full p-4 flex-grow rounded-lg ${
                      formData.experienceLevel === level.name
                        ? "bg-zinc-950 border border-purple-300"
                        : ""
                    } cursor-pointer`}
                  >
                    {formData.experienceLevel === level.name && (
                      <BsCheckCircleFill className="text-purple-300 text-2xl absolute top-3 right-3" />
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

          <button
            className="flex flex-row items-center bg-gradient-to-tr from-purple-950 to-purple-500 hover:opacity-60 font-semibold m-4 p-4 rounded-lg text-white text-lg lg:text-xl transition ease-in-out duration-200 transform-110"
            type="submit"
          >
            <PiLightningFill className="inline-block mr-2" />
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
