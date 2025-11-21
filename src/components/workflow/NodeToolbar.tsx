import { Button } from "@/components/ui/button";
import { Bot, Users, Cpu, GitBranch } from "lucide-react";

interface NodeToolbarProps {
  onAddNode: (type: "agent" | "team" | "llm" | "condition") => void;
}

export const NodeToolbar = ({ onAddNode }: NodeToolbarProps) => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddNode("agent")}
          className="flex flex-col h-auto py-2 px-3"
        >
          <Bot className="h-5 w-5 mb-1" />
          <span className="text-xs">Agent</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddNode("team")}
          className="flex flex-col h-auto py-2 px-3"
        >
          <Users className="h-5 w-5 mb-1" />
          <span className="text-xs">Team</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddNode("llm")}
          className="flex flex-col h-auto py-2 px-3"
        >
          <Cpu className="h-5 w-5 mb-1" />
          <span className="text-xs">LLM</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddNode("condition")}
          className="flex flex-col h-auto py-2 px-3"
        >
          <GitBranch className="h-5 w-5 mb-1" />
          <span className="text-xs">Condition</span>
        </Button>
      </div>
    </div>
  );
};
