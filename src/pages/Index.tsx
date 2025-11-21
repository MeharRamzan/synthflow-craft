import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Workflow, Bot, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-accent/10 rounded-full">
            <Bot className="h-16 w-16 text-accent" />
          </div>
        </div>
        
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
          FeedaLabs Workflow Builder
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Create powerful AI agent workflows with an intuitive visual interface. 
          Connect agents, teams, LLMs, and conditions to build intelligent automation.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/workflows">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Workflow className="mr-2 h-5 w-5" />
              Open Workflow Builder
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <Bot className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-semibold text-foreground">Agent</h3>
            <p className="text-sm text-muted-foreground">AI assistants</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <Workflow className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-semibold text-foreground">Team</h3>
            <p className="text-sm text-muted-foreground">Collaborate</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <Bot className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold text-foreground">LLM</h3>
            <p className="text-sm text-muted-foreground">Language models</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <Workflow className="h-8 w-8 text-orange-500 mb-2" />
            <h3 className="font-semibold text-foreground">Condition</h3>
            <p className="text-sm text-muted-foreground">Logic flows</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
