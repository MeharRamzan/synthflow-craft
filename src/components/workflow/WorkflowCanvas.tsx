import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  MarkerType,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Workflow } from "@/pages/Workflows";
import { NodeToolbar } from "./NodeToolbar";
import { NodeSettingsPanel } from "./NodeSettingsPanel";
import { WorkflowNode } from "./nodes/WorkflowNode";

const defaultEdgeOptions = {
  type: "smoothstep",
  animated: true,
  style: { 
    stroke: "hsl(var(--accent))", 
    strokeWidth: 2 
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "hsl(var(--accent))",
    width: 20,
    height: 20,
  },
};

const nodeTypes = {
  workflowNode: WorkflowNode,
};

interface WorkflowCanvasProps {
  workflow: Workflow;
}

const initialNodes: Node[] = [
  {
    id: "start-1",
    type: "workflowNode",
    position: { x: 250, y: 100 },
    data: { label: "Start", type: "start" },
  },
];

export const WorkflowCanvas = ({ workflow }: WorkflowCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        ...defaultEdgeOptions,
      };
      setEdges((eds) => addEdge(newEdge as Edge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const addNode = useCallback(
    (type: "agent" | "team" | "llm" | "condition") => {
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "workflowNode",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100,
        },
        data: { label: type.charAt(0).toUpperCase() + type.slice(1), type },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
        )
      );
    },
    [setNodes]
  );

  return (
    <div className="flex-1 flex">
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {workflow.name}
            </h2>
            <p className="text-sm text-muted-foreground">{workflow.description}</p>
          </div>
        </div>
        <NodeToolbar onAddNode={addNode} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ 
            stroke: "hsl(var(--accent))", 
            strokeWidth: 2 
          }}
          fitView
          className="bg-workflow-bg"
        >
          <Background color="hsl(var(--border))" gap={16} />
          <Controls className="bg-card border-border" />
          <MiniMap
            nodeColor={(node) => {
              switch (node.data.type) {
                case "start":
                  return "hsl(var(--accent))";
                case "agent":
                  return "hsl(217, 91%, 60%)";
                case "team":
                  return "hsl(142, 71%, 45%)";
                case "llm":
                  return "hsl(271, 91%, 65%)";
                case "condition":
                  return "hsl(25, 95%, 53%)";
                default:
                  return "hsl(var(--muted))";
              }
            }}
            className="bg-card border border-border"
          />
        </ReactFlow>
      </div>
      {selectedNode && (
        <NodeSettingsPanel
          node={selectedNode}
          onUpdateNode={updateNodeData}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
};
