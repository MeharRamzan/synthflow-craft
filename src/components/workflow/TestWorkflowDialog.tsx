import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Play, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TestWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
  nodes: any[];
  edges: any[];
}

export const TestWorkflowDialog = ({
  open,
  onOpenChange,
  workflowName,
  nodes,
  edges,
}: TestWorkflowDialogProps) => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const executeWorkflow = async () => {
    if (!query.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a test query",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput("");

    // Simulate workflow execution
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const executionPath = nodes
        .map((node) => `${node.data.type}: ${node.data.label}`)
        .join(" → ");

      const simulatedOutput = `Workflow Execution Complete

Input Query: "${query}"

Execution Path:
${executionPath}

Processed by ${nodes.length} nodes:
${nodes.map((node, i) => `  ${i + 1}. ${node.data.label} (${node.data.type})`).join("\n")}

Final Output:
Based on your query, the workflow has been processed through all connected nodes. Each node would perform its specific function (agent reasoning, team collaboration, LLM processing, or conditional logic) to generate the final result.

[This is a simulated response - actual execution will be implemented based on node configurations]`;

      setOutput(simulatedOutput);

      toast({
        title: "Workflow Executed",
        description: "Test completed successfully",
      });
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "An error occurred during workflow execution",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Test Workflow: {workflowName}</DialogTitle>
          <DialogDescription>
            Enter a test query to execute the workflow and see the output
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="query">Test Query</Label>
            <Textarea
              id="query"
              placeholder="Enter your test input here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isRunning}
            />
          </div>

          {output && (
            <div className="space-y-2">
              <Label>Output</Label>
              <div className="bg-muted p-4 rounded-lg border border-border">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isRunning}
          >
            Close
          </Button>
          <Button onClick={executeWorkflow} disabled={isRunning}>
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Test
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
