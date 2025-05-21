
import React from "react";
import { GitBranch, Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/providers/ThemeProvider";

type TopBarProps = {
  onMenuButtonClick: () => void;
};

const TopBar = ({ onMenuButtonClick }: TopBarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuButtonClick}
          className="mr-2"
        >
          <Menu size={20} />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div className="relative w-full max-w-md mr-4 hidden md:flex">
        <Search
          size={18}
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search repositories..."
          className="pl-8"
        />
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          <GitBranch size={16} className="mr-1.5" />
          Create
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-git-red rounded-full" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === "dark" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun size={16} className="mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon size={16} className="mr-2" />
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
