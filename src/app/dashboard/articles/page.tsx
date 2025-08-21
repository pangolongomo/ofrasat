"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, Loader2, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status: string;
  createdAt: string;
  branch: { name: string };
  author: { name: string };
}

function ArticleTableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-6 w-16 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/articles");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch {
      toast.error("Erreur lors du chargement des articles");
    }
    setLoading(false);
  };

  const deleteArticle = async () => {
    if (!deletingArticle) return;
    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/articles/${deletingArticle.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchArticles();
        toast.success("Article supprimé avec succès");
        setDeletingArticle(null);
      } else {
        const error = await response.json();
        toast.error(error.error || "Erreur lors de la suppression");
      }
    } catch {
      toast.error("Erreur réseau lors de la suppression");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/articles/create")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Article
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branche
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <ArticleTableSkeleton />
                ) : articles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Aucun article trouvé
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 flex-shrink-0">
                            {article.featuredImage ? (
                              <Image
                                src={article.featuredImage}
                                alt={article.title}
                                width={48}
                                height={48}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                <ImageOff className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {article.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {article.branch.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            article.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : article.status === "DRAFT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(`/dashboard/articles/${article.id}`)
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(
                                `/dashboard/articles/edit/${article.id}`
                              )
                            }
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="cursor-pointer"
                            size="sm"
                            onClick={() => setDeletingArticle(article)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deletingArticle}
        onOpenChange={(open) => !open && setDeletingArticle(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;article</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l&apos;article{" "}
              <span className="font-semibold">
                &quot;{deletingArticle?.title}&quot;
              </span>{" "}
              ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setDeletingArticle(null)}
              disabled={deleteLoading}
            >
              Annuler
            </Button>
            <Button
              onClick={deleteArticle}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
