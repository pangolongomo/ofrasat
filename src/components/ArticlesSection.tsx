"use client";

import { useState, useEffect } from "react";
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
import { FileText, Loader2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  author: { name: string };
}

interface ArticlesSectionProps {
  branchType: "consulting" | "finance" | "communication";
  linkColor?: string;
}

export default function ArticlesSection({ branchType }: ArticlesSectionProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const getPreviewText = (content: string, maxLength: number = 120) => {
    const textOnly = content.replace(/<[^>]*>/g, "");
    return textOnly.length > maxLength
      ? textOnly.substring(0, maxLength) + "..."
      : textOnly;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `/api/articles/public?branch=${branchType}`
        );
        if (response.ok) {
          const data = await response.json();
          setArticles(data.slice(0, 6));
        }
      } catch {
        console.error("Erreur lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [branchType]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Articles</h2>
          <div className="flex justify-center items-center py-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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
                      <CardTitle className="text-xl line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.excerpt || getPreviewText(article.content)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-6">
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
