"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  const canManageUsers = ["SUPERADMIN", "ADMIN"].includes(session.user.role);
  const isEditor = session.user.role === "EDITOR";

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar */}
        <Sidebar variant="floating">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard"}
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Tableau de bord</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/articles"}
                    >
                      <Link href="/dashboard/articles">
                        <FileText className="w-4 h-4" />
                        <span>Articles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {canManageUsers && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/users"}
                      >
                        <Link href="/dashboard/users">
                          <Users className="w-4 h-4" />
                          <span>Utilisateurs</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/profile"}
                    >
                      <Link href="/dashboard/profile">
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {!isEditor && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/settings"}
                      >
                        <Link href="/dashboard/settings">
                          <Settings className="w-4 h-4" />
                          <span>Paramètres</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <Link href="/" className="text-2xl font-bold text-primary">
                  OFRASAT
                </Link>
                <span className="text-muted-foreground">/ Dashboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-muted-foreground">{session.user.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
