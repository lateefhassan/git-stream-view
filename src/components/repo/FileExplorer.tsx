
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight, File, Folder } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type FileExplorerItemProps = {
  name: string;
  type: "file" | "folder";
  level: number;
  isSelected?: boolean;
  children?: FileExplorerItemProps[];
  onClick?: () => void;
};

const FileExplorerItem = ({
  name,
  type,
  level,
  isSelected,
  children,
  onClick,
}: FileExplorerItemProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleClick = () => {
    if (type === "file" && onClick) {
      onClick();
    } else if (type === "folder") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {type === "folder" ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger
            className={cn(
              "flex w-full items-center gap-2 rounded p-1.5 text-sm hover:bg-muted",
              isSelected && "bg-muted"
            )}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
          >
            <ChevronRight
              size={16}
              className={cn(
                "text-muted-foreground transition-transform",
                isOpen && "rotate-90"
              )}
            />
            <Folder size={16} className="text-git-blue" />
            <span className="truncate">{name}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {children?.map((item, index) => (
              <FileExplorerItem
                key={index}
                {...item}
                level={level + 1}
                onClick={onClick}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <button
          className={cn(
            "flex w-full items-center gap-2 rounded p-1.5 text-sm hover:bg-muted text-left",
            isSelected && "bg-muted font-medium"
          )}
          style={{ paddingLeft: `${level * 16 + 24}px` }}
          onClick={handleClick}
        >
          <File size={16} className="text-muted-foreground" />
          <span className="truncate">{name}</span>
        </button>
      )}
    </div>
  );
};

type FileExplorerProps = {
  files: FileExplorerItemProps[];
  onFileSelect?: (file: string) => void;
  className?: string;
};

const FileExplorer = ({ files, onFileSelect, className }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileClick = (file: string) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const renderFileExplorerItems = (
    items: FileExplorerItemProps[],
    parentPath = ""
  ) => {
    return items.map((item, index) => {
      const currentPath = parentPath
        ? `${parentPath}/${item.name}`
        : item.name;
      
      const processedItem = {
        ...item,
        isSelected: currentPath === selectedFile,
        onClick: item.type === "file" ? () => handleFileClick(currentPath) : undefined,
      };
      
      if (item.children) {
        processedItem.children = renderFileExplorerItems(
          item.children,
          currentPath
        );
      }

      return <FileExplorerItem key={index} {...processedItem} level={0} />;
    });
  };

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-2">{renderFileExplorerItems(files)}</div>
    </ScrollArea>
  );
};

export default FileExplorer;
