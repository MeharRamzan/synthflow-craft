import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Bot, Users, Cpu, GitBranch, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const getNodeIcon = (type: string) => {
  switch (type) {
    case "start":
      return Play;
    case "agent":
      return Bot;
    case "team":
      return Users;
    case "llm":
      return Cpu;
    case "condition":
      return GitBranch;
    default:
      return Bot;
  }
};

const getNodeColor = (type: string) => {
  switch (type) {
    case "start":
      return "bg-accent text-accent-foreground border-accent";
    case "agent":
      return "bg-blue-500/10 text-blue-500 border-blue-500/50";
    case "team":
      return "bg-green-500/10 text-green-500 border-green-500/50";
    case "llm":
      return "bg-purple-500/10 text-purple-500 border-purple-500/50";
    case "condition":
      return "bg-orange-500/10 text-orange-500 border-orange-500/50";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export const WorkflowNode = memo(({ data, selected }: NodeProps) => {
  const nodeType = data.type as string;
  const nodeLabel = data.label as string;
  const nodeInstructions = data.instructions as string;
  
  const Icon = getNodeIcon(nodeType);
  const colorClasses = getNodeColor(nodeType);

  return (
    <div
      className={cn(
        "px-4 py-3 rounded-lg border-2 bg-workflow-node min-w-[180px] shadow-lg transition-all",
        colorClasses,
        selected && "ring-2 ring-accent ring-offset-2 ring-offset-background"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-accent"
      />

      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <div className="flex-1">
          <div className="font-medium">{nodeLabel}</div>
          {nodeInstructions && (
            <div className="text-xs opacity-70 mt-1 line-clamp-2">
              {nodeInstructions}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-accent"
      />
    </div>
  );
});

WorkflowNode.displayName = "WorkflowNode";
