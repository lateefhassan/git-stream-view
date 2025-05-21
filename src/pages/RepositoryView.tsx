
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BranchSelector from "@/components/repo/BranchSelector";
import FileExplorer from "@/components/repo/FileExplorer";
import CodeViewer from "@/components/repo/CodeViewer";
import PipelineStatus from "@/components/repo/PipelineStatus";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, Download, GitPullRequest } from "lucide-react";

const RepositoryView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("code");
  const [currentBranch, setCurrentBranch] = useState("main");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Sample repository data
  const repository = {
    id: id || "repo-1",
    name: "frontend",
    description: "React frontend application with TypeScript and Tailwind CSS",
    owner: "acme-org",
    branches: ["main", "develop", "feature/auth", "feature/ui-redesign", "bugfix/login"],
    lastCommit: {
      hash: "a1b2c3d",
      message: "Add authentication service",
      author: "John Doe",
      date: "2 days ago",
    },
  };

  // Sample file structure
  const fileStructure = [
    {
      name: "src",
      type: "folder" as const,
      children: [
        {
          name: "components",
          type: "folder" as const,
          children: [
            { name: "Button.tsx", type: "file" as const },
            { name: "Card.tsx", type: "file" as const },
            { name: "Input.tsx", type: "file" as const },
          ],
        },
        {
          name: "pages",
          type: "folder" as const,
          children: [
            { name: "Home.tsx", type: "file" as const },
            { name: "About.tsx", type: "file" as const },
            { name: "Contact.tsx", type: "file" as const },
          ],
        },
        { name: "App.tsx", type: "file" as const },
        { name: "main.tsx", type: "file" as const },
      ],
    },
    { name: "package.json", type: "file" as const },
    { name: "tsconfig.json", type: "file" as const },
    { name: "README.md", type: "file" as const },
  ];

  // Sample code for display
  const sampleCode = `import React from 'react';
import { Button } from './components/Button';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to our application
      </h1>
      <p className="mb-4">
        This is a sample React application built with TypeScript and Tailwind CSS.
      </p>
      <Button variant="primary">
        Get Started
      </Button>
    </div>
  );
}

export default App;`;

  // Sample pipeline steps
  const pipelineSteps = [
    {
      name: "Build",
      status: "success" as const,
      duration: "45s",
    },
    {
      name: "Test",
      status: "success" as const,
      duration: "2m 30s",
    },
    {
      name: "Lint",
      status: "success" as const,
      duration: "35s",
    },
    {
      name: "Deploy",
      status: "running" as const,
    },
  ];

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {repository.owner}/{repository.name}
            </h1>
            <p className="text-muted-foreground">{repository.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <BranchSelector
              currentBranch={currentBranch}
              branches={repository.branches}
              onSelectBranch={setCurrentBranch}
            />
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Clone
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="code">
              <Code size={16} className="mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="pull-requests">
              <GitPullRequest size={16} className="mr-2" />
              Pull Requests
            </TabsTrigger>
            <TabsTrigger value="pipelines">
              <Zap size={16} className="mr-2" />
              Pipelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/4 border rounded-md">
                <FileExplorer
                  files={fileStructure}
                  onFileSelect={handleFileSelect}
                  className="h-[calc(100vh-280px)]"
                />
              </div>
              <div className="w-full lg:w-3/4">
                {selectedFile ? (
                  <CodeViewer
                    code={sampleCode}
                    fileName={selectedFile}
                    className="h-[calc(100vh-280px)]"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[calc(100vh-280px)] border rounded-md bg-muted/50">
                    <div className="text-center">
                      <Code size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p>Select a file to view its contents</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pull-requests">
            <div className="p-8 text-center">
              <GitPullRequest size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Pull Requests</h3>
              <p className="text-muted-foreground mb-4">
                There are no pull requests open for this repository
              </p>
              <Button>Create Pull Request</Button>
            </div>
          </TabsContent>

          <TabsContent value="pipelines">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Latest Pipeline</h2>
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Pipeline #{repository.id}-123</h3>
                    <p className="text-sm text-muted-foreground">
                      Triggered by {repository.lastCommit.author} · {repository.lastCommit.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Logs
                  </Button>
                </div>
                <Separator className="my-4" />
                <PipelineStatus steps={pipelineSteps} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RepositoryView;
