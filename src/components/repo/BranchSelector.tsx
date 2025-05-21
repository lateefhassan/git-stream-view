
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitBranch, ChevronDown } from "lucide-react";

type BranchSelectorProps = {
  currentBranch: string;
  branches: string[];
  onSelectBranch: (branch: string) => void;
};

const BranchSelector = ({
  currentBranch,
  branches,
  onSelectBranch,
}: BranchSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between md:w-auto">
          <GitBranch size={16} className="mr-2" />
          <span className="truncate max-w-[100px]">{currentBranch}</span>
          <ChevronDown size={16} className="ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch branch</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {branches.map((branch) => (
          <DropdownMenuItem
            key={branch}
            onClick={() => onSelectBranch(branch)}
            className={
              branch === currentBranch
                ? "bg-secondary font-medium"
                : ""
            }
          >
            {branch}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BranchSelector;
