
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Check, X, Clock } from "lucide-react";

type Step = {
  name: string;
  status: "success" | "failed" | "pending" | "running";
  duration?: string;
};

type PipelineStatusProps = {
  steps: Step[];
  className?: string;
};

const PipelineStatus = ({ steps, className }: PipelineStatusProps) => {
  const getStatusIcon = (status: Step["status"]) => {
    switch (status) {
      case "success":
        return <Check size={16} className="text-git-green" />;
      case "failed":
        return <X size={16} className="text-git-red" />;
      case "pending":
      case "running":
        return <Clock size={16} className="text-git-yellow" />;
    }
  };

  const getProgressValue = () => {
    const completed = steps.filter((step) => step.status === "success").length;
    return (completed / steps.length) * 100;
  };

  const getOverallStatus = () => {
    if (steps.some((step) => step.status === "failed")) {
      return "failed";
    }
    if (steps.some((step) => ["pending", "running"].includes(step.status))) {
      return "running";
    }
    return "success";
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            getOverallStatus() === "success"
              ? "bg-git-green"
              : getOverallStatus() === "running"
              ? "bg-git-yellow"
              : "bg-git-red"
          )}
        />
        <span className="font-medium">Pipeline</span>
        <div className="ml-auto text-sm text-muted-foreground">
          {steps.filter((s) => s.status === "success").length} of {steps.length}{" "}
          completed
        </div>
      </div>

      <Progress value={getProgressValue()} className="h-2" />

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(step.status)}
              <span>{step.name}</span>
            </div>
            {step.duration && (
              <span className="text-xs text-muted-foreground">
                {step.duration}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineStatus;
