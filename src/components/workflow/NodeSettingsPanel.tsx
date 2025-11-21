import { useState, useEffect } from "react";
import { Node } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NodeSettingsPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

export const NodeSettingsPanel = ({
  node,
  onUpdateNode,
  onClose,
}: NodeSettingsPanelProps) => {
  const [label, setLabel] = useState((node.data.label as string) || "");
  const [instructions, setInstructions] = useState((node.data.instructions as string) || "");
  const [model, setModel] = useState((node.data.model as string) || "");
  const [condition, setCondition] = useState((node.data.condition as string) || "");

  useEffect(() => {
    setLabel((node.data.label as string) || "");
    setInstructions((node.data.instructions as string) || "");
    setModel((node.data.model as string) || "");
    setCondition((node.data.condition as string) || "");
  }, [node]);

  const handleSave = () => {
    onUpdateNode(node.id, {
      label,
      instructions,
      model,
      condition,
    });
  };

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Node Settings</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="node-type">Type</Label>
            <Input
              id="node-type"
              value={(node.data.type as string) || ""}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-label">Label</Label>
            <Input
              id="node-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Node label..."
            />
          </div>

          {node.data.type === "agent" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="node-instructions">Instructions</Label>
                <Textarea
                  id="node-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Agent instructions..."
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="node-model">Model</Label>
                <Input
                  id="node-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., gpt-4"
                />
              </div>
            </>
          )}

          {node.data.type === "team" && (
            <div className="space-y-2">
              <Label htmlFor="node-instructions">Team Description</Label>
              <Textarea
                id="node-instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Describe the team and its purpose..."
                rows={6}
              />
            </div>
          )}

          {node.data.type === "llm" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="node-model">Model</Label>
                <Input
                  id="node-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., gpt-4, claude-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="node-instructions">Prompt</Label>
                <Textarea
                  id="node-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="System prompt..."
                  rows={6}
                />
              </div>
            </>
          )}

          {node.data.type === "condition" && (
            <div className="space-y-2">
              <Label htmlFor="node-condition">Condition</Label>
              <Textarea
                id="node-condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Define the condition logic..."
                rows={6}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
