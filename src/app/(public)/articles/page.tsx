"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, FileText } from "lucide-react";


interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  branch: { name: string };
  author: { name: string };
}

function ArticlesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get("branch") || "all");

  const getPreviewText = (content: string, maxLength: number = 120) => {
    const textOnly = content.replace(/<[^>]*>/g, "");
    return textOnly.length > maxLength
      ? textOnly.substring(0, maxLength) + "..."
      : textOnly;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const url =
          filter === "all"
            ? "/api/articles/public"
            : `/api/articles/public?branch=${filter}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch {
        console.error("Erreur lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filter]);

  const getBranchColor = (branchName: string) => {
    if (branchName.includes("Consulting")) return "bg-blue-100 text-blue-800";
    if (branchName.includes("Finance")) return "bg-green-100 text-green-800";
    if (branchName.includes("Communication"))
      return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-6">Tous les articles</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => {
              setFilter("all");
              router.push("/articles");
            }}
          >
            Tous
          </Button>
          <Button
            variant={filter === "consulting" ? "default" : "outline"}
            onClick={() => {
              setFilter("consulting");
              router.push("/articles?branch=consulting");
            }}
          >
            Consulting
          </Button>
          <Button
            variant={filter === "finance" ? "default" : "outline"}
            onClick={() => {
              setFilter("finance");
              router.push("/articles?branch=finance");
            }}
          >
            Finance
          </Button>
          <Button
            variant={filter === "communication" ? "default" : "outline"}
            onClick={() => {
              setFilter("communication");
              router.push("/articles?branch=communication");
            }}
          >
            Communication
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <Card key={i} className="h-full overflow-hidden flex flex-col py-0">
              <Skeleton className="h-48 w-full" />
              <CardHeader className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <Card className="hover:shadow-lg hover:bg-gray-50 transition-all cursor-pointer h-full overflow-hidden flex flex-col py-0">
                <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl flex-1 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ml-2 ${getBranchColor(
                        article.branch.name
                      )}`}
                    >
                      {article.branch.name.replace("OFRASAT ", "")}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt || getPreviewText(article.content)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <div className="text-sm text-muted-foreground">
                    <div>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </div>
                    <div>Par {article.author.name}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          Aucun article publié pour le moment.
        </p>
      )}
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Chargement...</div>
          </div>
        }
      >
        <ArticlesContent />
      </Suspense>
    </>
  );
}
