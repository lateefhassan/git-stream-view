
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CodeViewer from "@/components/repo/CodeViewer";
import { Check, X, MessageSquare } from "lucide-react";

const PullRequestView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [comment, setComment] = useState("");

  // Sample PR data
  const pullRequest = {
    id: id || "pr-1",
    title: "Add authentication service",
    number: 42,
    description:
      "This PR adds a new authentication service with JWT token support and integrates it with the API endpoints. It includes user registration, login, and password reset functionality.",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    status: "open",
    createdAt: "2 days ago",
    repository: "api",
    branch: "feature/auth",
    targetBranch: "main",
    commits: 5,
    changedFiles: 12,
    additions: 457,
    deletions: 21,
    comments: [
      {
        id: "comment-1",
        author: {
          name: "Jane Smith",
          avatar: "/placeholder.svg",
        },
        content:
          "Looks good overall! Just a few minor comments on the implementation.",
        createdAt: "1 day ago",
      },
      {
        id: "comment-2",
        author: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg",
        },
        content:
          "I think we should add more unit tests for the authentication flow.",
        createdAt: "8 hours ago",
      },
    ],
  };

  // Sample diff code
  const diffCode = `@@ -24,7 +24,19 @@ class AuthService {
  // Previous implementation
- public async login(email: string, password: string): Promise<string> {
-   // Basic implementation
-   const user = await this.userRepository.findByEmail(email);
-   if (!user || !comparePassword(password, user.password)) {
-     throw new UnauthorizedException('Invalid credentials');
-   }
-   return this.jwtService.sign({ userId: user.id });
+ public async login(email: string, password: string): Promise<AuthResponse> {
+   try {
+     const user = await this.userRepository.findByEmail(email);
+     if (!user) {
+       throw new UnauthorizedException('User not found');
+     }
+     
+     const isPasswordValid = await comparePassword(password, user.password);
+     if (!isPasswordValid) {
+       throw new UnauthorizedException('Invalid password');
+     }
+     
+     const token = this.jwtService.sign({ 
+       userId: user.id,
+       email: user.email,
+       roles: user.roles 
+     });
+     
+     return { 
+       token, 
+       user: { 
+         id: user.id, 
+         email: user.email, 
+         name: user.name 
+       } 
+     };
+   } catch (error) {
+     this.logger.error('Login failed', error);
+     throw error;
+   }
  }`;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    alert("Comment submitted (this is just a demo)");
    setComment("");
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                pullRequest.status === "open"
                  ? "border-git-blue text-git-blue bg-git-blue/10"
                  : pullRequest.status === "merged"
                  ? "border-purple-500 text-purple-500 bg-purple-500/10"
                  : "border-git-red text-git-red bg-git-red/10"
              }
            >
              {pullRequest.status}
            </Badge>
            <span className="text-muted-foreground">
              #{pullRequest.number} opened {pullRequest.createdAt} by{" "}
              {pullRequest.author.name}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            {pullRequest.title}
          </h1>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={pullRequest.author.avatar} />
                <AvatarFallback>
                  {pullRequest.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {pullRequest.author.name} wants to merge into{" "}
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">
                  {pullRequest.targetBranch}
                </span>{" "}
                from{" "}
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">
                  {pullRequest.branch}
                </span>
              </span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <X size={16} className="mr-1.5" />
                Close
              </Button>
              <Button variant="default" className="bg-git-green hover:bg-git-green/90">
                <Check size={16} className="mr-1.5" />
                Approve
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="commits">
              Commits ({pullRequest.commits})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="border rounded-md p-4">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {pullRequest.description}
              </p>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">
                  Comments ({pullRequest.comments.length})
                </h2>
              </div>

              {pullRequest.comments.map((comment) => (
                <div key={comment.id} className="pr-comment mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Add a comment</h3>
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                  className="mb-2"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                >
                  <MessageSquare size={16} className="mr-1.5" />
                  Comment
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="changes">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted p-4 flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">Changed files:</span>{" "}
                  <span className="font-mono">{pullRequest.changedFiles}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-git-green">
                    +{pullRequest.additions}
                  </span>
                  <span className="text-sm text-git-red">
                    -{pullRequest.deletions}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="p-4">
                <div className="font-medium mb-2">src/services/AuthService.ts</div>
                <CodeViewer
                  code={diffCode}
                  language="diff"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commits">
            <div className="border rounded-md p-4">
              <p className="text-center text-muted-foreground py-8">
                Commit list would be displayed here in a real application.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PullRequestView;
