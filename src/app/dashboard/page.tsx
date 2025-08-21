import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const isSuperAdmin = session?.user?.role === "SUPERADMIN";

  let totalArticles = 0;
  let totalUsers = 0;
  let draftArticles = 0;
  let hasError = false;

  try {
    [totalArticles, totalUsers, draftArticles] = await Promise.all([
      prisma.article.count(),
      prisma.user.count(),
      prisma.article.count({ where: { status: "DRAFT" } }),
    ]);
  } catch (error) {
    console.error('Database connection error:', error);
    hasError = true;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">
            Erreur de connexion à la base de données. Veuillez vérifier votre configuration.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">Total des articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isSuperAdmin ? totalUsers : totalUsers - 1}
            </div>
            <p className="text-xs text-muted-foreground">Utilisateurs actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftArticles}</div>
            <p className="text-xs text-muted-foreground">
              En attente de publication
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
