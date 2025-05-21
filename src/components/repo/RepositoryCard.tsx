
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GitBranch, GitPullRequest, Code } from "lucide-react";
import { cn } from "@/lib/utils";

type RepositoryCardProps = {
  id: string;
  name: string;
  description: string;
  language?: string;
  languageColor?: string;
  branchCount?: number;
  prCount?: number;
  lastUpdated?: string;
  className?: string;
};

const RepositoryCard = ({
  id,
  name,
  description,
  language = "TypeScript",
  languageColor = "#3178C6",
  branchCount = 3,
  prCount = 2,
  lastUpdated = "2 hours ago",
  className,
}: RepositoryCardProps) => {
  return (
    <Link to={`/repositories/${id}`}>
      <Card className={cn("h-full hover:shadow-md transition-shadow", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 mb-4 h-10">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {language && (
              <div className="flex items-center gap-1.5">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: languageColor }}
                />
                <span>{language}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <GitBranch size={16} />
              <span>{branchCount}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <GitPullRequest size={16} />
              <span>{prCount}</span>
            </div>

            <div className="ml-auto text-xs">Updated {lastUpdated}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RepositoryCard;
