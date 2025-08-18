'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  branch: { name: string }
  author: { name: string }
}

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(searchParams.get('branch') || 'all')

  useEffect(() => {
    fetchArticles()
  }, [filter])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const url = filter === 'all' 
        ? '/api/articles/public' 
        : `/api/articles/public?branch=${filter}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles')
    } finally {
      setLoading(false)
    }
  }

  const getBranchColor = (branchName: string) => {
    if (branchName.includes('Consulting')) return 'bg-blue-100 text-blue-800'
    if (branchName.includes('Finance')) return 'bg-green-100 text-green-800'
    if (branchName.includes('Communication')) return 'bg-purple-100 text-purple-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-6">Tous les articles</h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => {
                setFilter('all')
                router.push('/articles')
              }}
            >
              Tous
            </Button>
            <Button 
              variant={filter === 'consulting' ? 'default' : 'outline'}
              onClick={() => {
                setFilter('consulting')
                router.push('/articles?branch=consulting')
              }}
            >
              Consulting
            </Button>
            <Button 
              variant={filter === 'finance' ? 'default' : 'outline'}
              onClick={() => {
                setFilter('finance')
                router.push('/articles?branch=finance')
              }}
            >
              Finance
            </Button>
            <Button 
              variant={filter === 'communication' ? 'default' : 'outline'}
              onClick={() => {
                setFilter('communication')
                router.push('/articles?branch=communication')
              }}
            >
              Communication
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
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
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <Card className="hover:shadow-lg hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl flex-1">{article.title}</CardTitle>
                      <span className={`px-2 py-1 text-xs rounded-full ${getBranchColor(article.branch.name)}`}>
                        {article.branch.name.replace('OFRASAT ', '')}
                      </span>
                    </div>
                    {article.excerpt && (
                      <CardDescription>{article.excerpt}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <div>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</div>
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
    </div>
  )
}