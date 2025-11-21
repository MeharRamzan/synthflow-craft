import { Workflow } from "@/pages/Workflows";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface WorkflowListProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  onSelectWorkflow: (workflow: Workflow) => void;
}

export const WorkflowList = ({
  workflows,
  selectedWorkflow,
  onSelectWorkflow,
}: WorkflowListProps) => {
  if (workflows.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-muted-foreground text-sm">No workflows yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {workflows.map((workflow) => (
        <button
          key={workflow.id}
          onClick={() => onSelectWorkflow(workflow)}
          className={cn(
            "w-full p-4 text-left border-b border-border hover:bg-muted/50 transition-colors",
            selectedWorkflow?.id === workflow.id && "bg-muted"
          )}
        >
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {workflow.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {workflow.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {workflow.updatedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
