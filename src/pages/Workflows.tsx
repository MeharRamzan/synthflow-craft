import { useState } from "react";
import { WorkflowCanvas } from "@/components/workflow/WorkflowCanvas";
import { WorkflowList } from "@/components/workflow/WorkflowList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateWorkflowDialog } from "@/components/workflow/CreateWorkflowDialog";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const Workflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateWorkflow = (name: string, description: string) => {
    const newWorkflow: Workflow = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setWorkflows([...workflows, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Workflow List */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Workflows</h2>
            <Button
              size="sm"
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
        <WorkflowList
          workflows={workflows}
          selectedWorkflow={selectedWorkflow}
          onSelectWorkflow={setSelectedWorkflow}
        />
      </div>

      {/* Main Content - Workflow Canvas */}
      <div className="flex-1 flex flex-col">
        {selectedWorkflow ? (
          <WorkflowCanvas workflow={selectedWorkflow} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Workflow Selected
              </h3>
              <p className="text-muted-foreground mb-4">
                Create a new workflow or select an existing one to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>
        )}
      </div>

      <CreateWorkflowDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateWorkflow={handleCreateWorkflow}
      />
    </div>
  );
};

export default Workflows;
