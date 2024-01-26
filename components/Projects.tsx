"use client";
import { Project } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxChevronRight } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import { formatDistance } from "date-fns";
import { Dialog } from "@headlessui/react";
import { deleteProject } from "@/actions";

export default function Projects({ projects }: { projects: Project[] }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const showDescription = (description: string) => {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    }
    return description;
  };

  const lastUpdated = projects.map((project) =>
    formatDistance(new Date(project.updated_at), new Date(), {
      addSuffix: true,
    })
  );

  const showDeleteConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConfirmDelete(true);
    setProjectToDelete(e.currentTarget.value);
  };

  const handleDelete = (project_id: string) => {
    setConfirmDelete(false);
    deleteProject(project_id);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-2">
      {projects &&
        projects?.map((project: Project, index: number) => (
          <Link
            key={index}
            className={`flex flex-row items-center justify-between w-full sm:w-3/4 lg:w-2/3 px-4 py-4 lg:py-6 bg-zinc-800 bg-opacity-50 rounded-md
                hover:bg-purple-400 hover:bg-opacity-30 transition duration-150 ease-in-out
                `}
            href={`/projects/${project.project_id}`}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold text-xl lg:text-2xl text-purple-400">
                {project.project_name || "(untitled)"}
              </h3>
              <p className="text-purple-200 text-md lg:text-lg">
                {showDescription(project.project_description)}
              </p>
              <p className="text-gray-200 text-sm lg:text-md">
                last updated {lastUpdated[index]}
              </p>
            </div>
            <button
              className="text-purple-200 text-xl lg:text-2xl hover:scale-125 transition-all ease-in-out duration-300 mr-3"
              onClick={showDeleteConfirmation}
              value={project.project_id}
            >
              <FaRegTrashCan />
            </button>
            <RxChevronRight className="text-purple-200 text-2xl lg:text-3xl" />
          </Link>
        ))}
      <Dialog
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-30 flex flex-col items-center justify-center"
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <Dialog.Panel className="flex flex-col items-center justify-center w-fit h-fit bg-zinc-900 p-4 m-4 max-w-2xl text-center space-y-2 rounded-md">
          <Dialog.Title
            className="font-bold text-xl lg:text-2xl text-purple-200"
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

          <p className="text-gray-400 text-sm lg:text-md">
            Tip: Hold shift while clicking the delete button to bypass this menu
            in the future.
          </p>

          <button
            className="bg-purple-800 bg-opacity-50 text-purple-200 py-2 px-6 mx-2 rounded-lg font-semibold text-lg-110 hover:bg-purple-400 hover:bg-opacity-30 transition-all ease-in-out duration-300"
            onClick={() => handleDelete(projectToDelete!)}
          >
            Delete
          </button>
          <button
            className="bg-zinc-800 text-white py-2 px-6 mx-2 rounded-lg font-semibold text-lg-110 hover:bg-opacity-30 transition-all ease-in-out duration-300"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
