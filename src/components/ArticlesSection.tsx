"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  author: { name: string };
}

interface ArticlesSectionProps {
  branchType: "consulting" | "finance" | "communication";
  linkColor?: string;
}

export default function ArticlesSection({
  branchType,
  linkColor = "text-blue-600 hover:text-blue-800",
}: ArticlesSectionProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`/api/articles/public?branch=${branchType}`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.slice(0, 3));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des articles");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Articles</h2>
        {articles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {articles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <Card className="hover:shadow-lg hover:bg-gray-50 transition-all cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      {article.excerpt && (
                        <CardDescription>{article.excerpt}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm text-muted-foreground">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href={`/articles?branch=${branchType}`}>
                  Voir tous les articles
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Aucun article publié pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}
