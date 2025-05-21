
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type CodeViewerProps = {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
};

const CodeViewer = ({
  code,
  language = "typescript",
  fileName,
  showLineNumbers = true,
  className,
}: CodeViewerProps) => {
  const lines = code.split("\n");

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      {fileName && (
        <div className="bg-muted px-4 py-2 border-b font-mono text-sm">
          {fileName}
        </div>
      )}
      <ScrollArea className="h-full max-h-[500px]">
        <div className="p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <div className="select-none text-muted-foreground w-12 pr-4 text-right">
                  {i + 1}
                </div>
              )}
              <div className="code-line flex-1">{line || " "}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CodeViewer;
