'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import RichTextEditor from '@/components/RichTextEditor'

interface Article {
  id: string
  title: string
  excerpt?: string
  content: string
  featuredImage?: string
  status: string
  branchId: string
}

interface Branch {
  id: string
  name: string
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    branchId: '',
    status: 'DRAFT'
  })

  useEffect(() => {
    fetchArticle()
    fetchBranches()
  }, [])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle({
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          featuredImage: data.featuredImage || '',
          branchId: data.branchId,
          status: data.status
        })
      }
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'article')
    }
  }

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches')
      if (response.ok) {
        const data = await response.json()
        setBranches(data)
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des branches')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      })

      if (response.ok) {
        toast.success('Article modifié avec succès')
        router.push('/dashboard/articles')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erreur lors de la modification')
      }
    } catch (error) {
      toast.error('Erreur lors de la modification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modifier l'article</h1>
        <p className="text-muted-foreground">Mettre à jour les informations de l'article</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'article</CardTitle>
          <CardDescription>Modifiez les détails de votre article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                required
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                placeholder="Titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Image principale</Label>
              <Input
                id="featuredImage"
                type="url"
                value={article.featuredImage}
                onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait</Label>
              <Textarea
                id="excerpt"
                value={article.excerpt}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                placeholder="Résumé de l'article"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Contenu *</Label>
              <RichTextEditor
                content={article.content}
                onChange={(content) => setArticle({ ...article, content })}
                placeholder="Rédigez le contenu de votre article..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Branche *</Label>
                <Select value={article.branchId} onValueChange={(value) => setArticle({ ...article, branchId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une branche" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={article.status} onValueChange={(value) => setArticle({ ...article, status: value })}>
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
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Modification...' : 'Modifier l\'article'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}