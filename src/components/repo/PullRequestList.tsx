
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type PullRequest = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  repository: string;
  status: "open" | "merged" | "closed";
  createdAt: string;
};

type PullRequestListProps = {
  pullRequests: PullRequest[];
};

const PullRequestList = ({ pullRequests }: PullRequestListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Repository</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pullRequests.map((pr) => (
            <TableRow key={pr.id}>
              <TableCell className="font-medium">
                <Link
                  to={`/pull-requests/${pr.id}`}
                  className="text-git-blue hover:underline"
                >
                  {pr.title}
                </Link>
              </TableCell>
              <TableCell>{pr.repository}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={pr.author.avatar} />
                    <AvatarFallback>
                      {pr.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{pr.author.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    pr.status === "open"
                      ? "border-git-blue text-git-blue bg-git-blue/10"
                      : pr.status === "merged"
                      ? "border-purple-500 text-purple-500 bg-purple-500/10"
                      : "border-git-red text-git-red bg-git-red/10"
                  }
                >
                  {pr.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {pr.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PullRequestList;
