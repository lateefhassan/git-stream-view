
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Folder,
  GitBranch,
  GitPullRequest,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const repositories = [
    { id: "repo-1", name: "frontend" },
    { id: "repo-2", name: "api" },
    { id: "repo-3", name: "core-services" },
    { id: "repo-4", name: "docs" },
    { id: "repo-5", name: "design-system" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-sidebar p-4 w-64",
        className
      )}
    >
      <div className="flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-md bg-git-blue flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22V15C15 13.8954 14.1046 13 13 13H11C9.89543 13 9 13.8954 9 15V22"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 9C6.10457 9 7 8.10457 7 7C7 5.89543 6.10457 5 5 5C3.89543 5 3 5.89543 3 7C3 8.10457 3.89543 9 5 9Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 9C20.1046 9 21 8.10457 21 7C21 5.89543 20.1046 5 19 5C17.8954 5 17 5.89543 17 7C17 8.10457 17.8954 9 19 9Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 9V17C5 17 5 22 12 22C19 22 19 17 19 17V9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-bold text-lg">GitStream</h1>
      </div>

      <div className="mt-6 space-y-1">
        <Link to="/" className="repository-link active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link to="/pull-requests" className="repository-link">
          <GitPullRequest size={18} />
          <span>Pull Requests</span>
        </Link>
        <Link to="/team" className="repository-link">
          <Users size={18} />
          <span>Team</span>
        </Link>
        <Link to="/settings" className="repository-link">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-sm font-semibold">Repositories</h2>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <span className="sr-only">Add repository</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 1C7.22386 1 7 1.22386 7 1.5V7H1.5C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H7V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H8V1.5C8 1.22386 7.77614 1 7.5 1Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-1 py-2">
          {repositories.map((repo) => (
            <Link
              key={repo.id}
              to={`/repositories/${repo.id}`}
              className="repository-link"
            >
              <Folder size={18} />
              <span>{repo.name}</span>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
