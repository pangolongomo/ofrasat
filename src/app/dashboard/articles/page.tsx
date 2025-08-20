"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import RichTextEditor from "@/components/RichTextEditor";

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

interface Branch {
  id: string;
  name: string;
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
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    branchId: "",
    status: "DRAFT",
  });
  const [editArticle, setEditArticle] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    branchId: "",
    status: "DRAFT",
  });

  useEffect(() => {
    fetchArticles();
    fetchBranches();
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

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/branches");
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      }
    } catch {
      toast.error("Erreur lors du chargement des branches");
    }
  };

  const createArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      if (response.ok) {
        await fetchArticles();
        setShowCreateArticle(false);
        setNewArticle({
          title: "",
          excerpt: "",
          content: "",
          featuredImage: "",
          branchId: "",
          status: "DRAFT",
        });
        toast.success("Article créé avec succès");
      } else {
        const error = await response.json();
        toast.error(error.error || "Erreur lors de la création");
      }
    } catch {
      toast.error("Erreur lors de la création");
    }
  };

  const updateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      const response = await fetch(`/api/articles/${editingArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editArticle),
      });

      if (response.ok) {
        await fetchArticles();
        setEditingArticle(null);
        toast.success("Article modifié avec succès");
      } else {
        const error = await response.json();
        toast.error(error.error || "Erreur lors de la modification");
      }
    } catch {
      toast.error("Erreur lors de la modification");
    }
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
                        <div className="text-sm font-medium text-gray-900">
                          {article.title}
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
                            onClick={() =>
                              router.push(`/dashboard/articles/${article.id}`)
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
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

      {/* Create Article Modal */}
      <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un article</DialogTitle>
            <DialogDescription>Ajouter un nouvel article</DialogDescription>
          </DialogHeader>
          <form onSubmit={createArticle} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                required
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Image principale (URL)</Label>
              <Input
                id="featuredImage"
                type="url"
                value={newArticle.featuredImage}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    featuredImage: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait</Label>
              <Textarea
                id="excerpt"
                value={newArticle.excerpt}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, excerpt: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenu</Label>
              <RichTextEditor
                content={newArticle.content}
                onChange={(content) =>
                  setNewArticle({ ...newArticle, content })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Branche</Label>
                <Select
                  value={newArticle.branchId}
                  onValueChange={(value) =>
                    setNewArticle({ ...newArticle, branchId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une branche" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={newArticle.status}
                  onValueChange={(value) =>
                    setNewArticle({ ...newArticle, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Brouillon</SelectItem>
                    <SelectItem value="PUBLISHED">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateArticle(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Créer</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Article Modal */}
      <Dialog
        open={!!editingArticle}
        onOpenChange={(open) => !open && setEditingArticle(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;article</DialogTitle>
            <DialogDescription>
              Modifier les informations de l&apos;article
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={updateArticle} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Titre</Label>
              <Input
                id="edit-title"
                required
                value={editArticle.title}
                onChange={(e) =>
                  setEditArticle({ ...editArticle, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-featuredImage">Image principale (URL)</Label>
              <Input
                id="edit-featuredImage"
                type="url"
                value={editArticle.featuredImage}
                onChange={(e) =>
                  setEditArticle({
                    ...editArticle,
                    featuredImage: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-excerpt">Extrait</Label>
              <Textarea
                id="edit-excerpt"
                value={editArticle.excerpt}
                onChange={(e) =>
                  setEditArticle({ ...editArticle, excerpt: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Contenu</Label>
              <RichTextEditor
                content={editArticle.content}
                onChange={(content) =>
                  setEditArticle({ ...editArticle, content })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Statut</Label>
              <Select
                value={editArticle.status}
                onValueChange={(value) =>
                  setEditArticle({ ...editArticle, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Brouillon</SelectItem>
                  <SelectItem value="PUBLISHED">Publié</SelectItem>
                  <SelectItem value="ARCHIVED">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingArticle(null)}
              >
                Annuler
              </Button>
              <Button type="submit">Modifier</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
