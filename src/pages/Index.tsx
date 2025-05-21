
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RepositoryCard from "@/components/repo/RepositoryCard";
import PullRequestList from "@/components/repo/PullRequestList";
import PipelineStatus from "@/components/repo/PipelineStatus";
import { GitPullRequest, GitBranch, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample repository data
  const repositories = [
    {
      id: "repo-1",
      name: "frontend",
      description: "React frontend application with TypeScript and Tailwind CSS",
      language: "TypeScript",
      languageColor: "#3178C6",
      branchCount: 5,
      prCount: 3,
      lastUpdated: "2 hours ago",
    },
    {
      id: "repo-2",
      name: "api",
      description: "REST API service built with Node.js and Express",
      language: "JavaScript",
      languageColor: "#F7DF1E",
      branchCount: 3,
      prCount: 1,
      lastUpdated: "1 day ago",
    },
    {
      id: "repo-3",
      name: "core-services",
      description: "Core microservices for the application backend",
      language: "Go",
      languageColor: "#00ADD8",
      branchCount: 4,
      prCount: 2,
      lastUpdated: "3 days ago",
    },
    {
      id: "repo-4",
      name: "docs",
      description: "Documentation and user guides for the platform",
      language: "Markdown",
      languageColor: "#083fa1",
      branchCount: 2,
      prCount: 0,
      lastUpdated: "1 week ago",
    },
    {
      id: "repo-5",
      name: "design-system",
      description: "Shared UI components and design tokens",
      language: "TypeScript",
      languageColor: "#3178C6",
      branchCount: 2,
      prCount: 1,
      lastUpdated: "2 days ago",
    },
  ];

  // Sample pull request data
  const pullRequests = [
    {
      id: "pr-1",
      title: "Add authentication service",
      author: {
        name: "John Doe",
      },
      repository: "api",
      status: "open",
      createdAt: "2 days ago",
    },
    {
      id: "pr-2",
      title: "Update dashboard UI",
      author: {
        name: "Jane Smith",
      },
      repository: "frontend",
      status: "merged",
      createdAt: "1 week ago",
    },
    {
      id: "pr-3",
      title: "Fix pagination bug",
      author: {
        name: "Alex Johnson",
      },
      repository: "frontend",
      status: "closed",
      createdAt: "3 days ago",
    },
  ] as const;

  // Sample pipeline status data
  const pipelineSteps = [
    {
      name: "Build",
      status: "success",
      duration: "45s",
    },
    {
      name: "Test",
      status: "success",
      duration: "2m 30s",
    },
    {
      name: "Lint",
      status: "success",
      duration: "35s",
    },
    {
      name: "Deploy",
      status: "running",
    },
  ] as const;

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your repositories, PRs, and activity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Repositories</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositories.length}</div>
              <p className="text-xs text-muted-foreground">
                {repositories.length > 0 ? repositories[0].lastUpdated : "N/A"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pullRequests.filter((pr) => pr.status === "open").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Open requests requiring review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Build Status</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Last pipeline: 10 minutes ago
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
            <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Recent Repositories</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} {...repo} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pull-requests">
            <h2 className="text-xl font-semibold mb-4">Recent Pull Requests</h2>
            <PullRequestList pullRequests={pullRequests} />
          </TabsContent>
          <TabsContent value="pipelines">
            <h2 className="text-xl font-semibold mb-4">Latest Pipeline</h2>
            <div className="max-w-2xl">
              <PipelineStatus steps={pipelineSteps} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Index;
