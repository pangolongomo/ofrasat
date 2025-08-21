"use client";

import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  variant?: "navbar" | "dashboard";
}

export default function UserDropdown({ user, variant = "navbar" }: UserDropdownProps) {
  const isNavbar = variant === "navbar";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={
            isNavbar
              ? "group flex items-center space-x-3 text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none rounded-2xl px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              : "group flex items-center space-x-3 text-[#060097] hover:bg-[#060097]/10 focus:bg-[#060097]/10 focus:outline-none rounded-2xl px-4 py-3 backdrop-blur-sm bg-[#060097]/5 border border-[#060097]/10 hover:border-[#060097]/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          }
          aria-label={`Menu utilisateur pour ${user.name}`}
        >
          <Avatar className="h-8 w-8 shadow-lg">
            <AvatarFallback className={
              isNavbar 
                ? "bg-gradient-to-br from-white/30 to-white/10 text-white font-bold text-lg backdrop-blur-sm"
                : "bg-gradient-to-br from-[#060097]/30 to-[#060097]/10 text-[#060097] font-bold text-lg backdrop-blur-sm"
            }>
              {user.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <span className={
            isNavbar
              ? "text-sm font-semibold hidden sm:block max-w-32 truncate group-hover:text-white/90 transition-colors"
              : "text-sm font-semibold hidden sm:block max-w-32 truncate group-hover:text-[#060097]/90 transition-colors"
          }>
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 backdrop-blur-xl bg-white/95 border border-white/20 shadow-2xl rounded-2xl p-2"
      >
        <div className="px-4 py-3 bg-gradient-to-r from-[#060097]/10 to-[#0800b3]/10 rounded-xl mb-2">
          <div className="text-sm font-bold text-gray-900">
            {user.name}
          </div>
          <div className="text-xs text-gray-600">{user.email}</div>
        </div>
        <DropdownMenuItem asChild>
          <a 
            href={isNavbar ? "/dashboard" : "/"} 
            className="flex items-center cursor-pointer rounded-xl px-3 py-2 hover:bg-[#060097]/10 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-[#060097]" />
            <span className="font-medium">{isNavbar ? "Dashboard" : "Accueil"}</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-gray-200" />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer rounded-xl px-3 py-2 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}