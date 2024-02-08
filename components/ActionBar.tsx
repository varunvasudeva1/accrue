import ActionBarButton from "./ActionBarButton";
import {
  GoDownload,
  GoShare,
  GoTrash,
  GoRepoPush,
  GoIterations,
} from "react-icons/go";

export default function ActionBar({
  className,
  type,

  saveProject,
  saveProjectDisabled,
  downloadProject,
  downloadProjectDisabled,
  shareProject,
  shareProjectDisabled,
  deleteProject,
  deleteProjectDisabled,

  regenerateSuggestions,
  regenerateSuggestionsDisabled,
  deleteSuggestions,
  deleteSuggestionsDisabled,
  model,
}: {
  className?: string;
  type: "project" | "suggestions";

  saveProject?: (e: any) => Promise<void>;
  saveProjectDisabled?: boolean;
  downloadProject?: (e: any) => Promise<void>;
  downloadProjectDisabled?: boolean;
  shareProject?: (e: any) => Promise<void>;
  shareProjectDisabled?: boolean;
  deleteProject?: (e: any) => Promise<void>;
  deleteProjectDisabled?: boolean;

  regenerateSuggestions?: (e: any) => Promise<void>;
  regenerateSuggestionsDisabled?: boolean;
  deleteSuggestions?: (e: any) => Promise<void>;
  deleteSuggestionsDisabled?: boolean;
  model?: string;
}) {
  if (type === "project") {
    return (
      <div className={`flex flex-row items-center ${className}`}>
        <ActionBarButton
          className="hover:bg-purple-400"
          onClick={saveProject}
          disabled={saveProjectDisabled}
          alt="save"
        >
          <GoRepoPush />
        </ActionBarButton>
        <ActionBarButton
          className="hover:bg-purple-400"
          onClick={downloadProject}
          disabled={downloadProjectDisabled}
          alt="download"
        >
          <GoDownload />
        </ActionBarButton>
        <ActionBarButton
          className="hover:bg-purple-400"
          onClick={shareProject}
          disabled={shareProjectDisabled}
          alt="share"
        >
          <GoShare />
        </ActionBarButton>
        <ActionBarButton
          onClick={deleteProject}
          disabled={deleteProjectDisabled}
          className="hover:bg-red-400"
          alt="delete"
        >
          <GoTrash />
        </ActionBarButton>
      </div>
    );
  } else if (type === "suggestions") {
    return (
      <div className={`flex flex-row items-center ${className}`}>
        <ActionBarButton
          className="hover:bg-purple-400"
          onClick={regenerateSuggestions}
          disabled={regenerateSuggestionsDisabled}
          alt="regenerate"
        >
          <GoIterations />
        </ActionBarButton>
        <ActionBarButton
          className="hover:bg-red-400"
          onClick={deleteSuggestions}
          disabled={deleteSuggestionsDisabled}
          alt="delete"
        >
          <GoTrash />
        </ActionBarButton>
      </div>
    );
  }
}
