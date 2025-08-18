# Déploiement sur Vercel

## 1. Préparer la base de données PostgreSQL

### Option A: Vercel Postgres (Recommandé)
1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Créer un nouveau projet ou sélectionner le projet existant
3. Aller dans l'onglet "Storage"
4. Créer une nouvelle base de données Postgres
5. Copier la `DATABASE_URL` fournie

### Option B: Autres fournisseurs
- **Neon**: https://neon.tech (gratuit)
- **Supabase**: https://supabase.com (gratuit)
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

## 2. Configuration des variables d'environnement

Dans Vercel Dashboard > Settings > Environment Variables, ajouter:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters
DATABASE_URL=postgresql://username:password@host:5432/database
```

**Important**: Générer un `NEXTAUTH_SECRET` sécurisé:
```bash
openssl rand -base64 32
```

## 3. Déploiement

### Via Vercel CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ou déployer en production
vercel --prod
```

### Via GitHub (Recommandé)
1. Pousser le code sur GitHub
2. Connecter le repo à Vercel
3. Vercel déploiera automatiquement

## 4. Initialiser la base de données

Après le premier déploiement:

```bash
# Pousser le schéma vers la DB
npx prisma db push

# Seeder les données initiales
npm run db:seed
```

Ou via Vercel CLI:
```bash
vercel env pull .env.local
npx prisma db push
npm run db:seed
```

## 5. Vérification

1. Aller sur votre URL Vercel
2. Tester la connexion: `/auth/signin`
3. Utiliser les identifiants superadmin:
   - Email: pangolongomo@gmail.com
   - Password: buxrif-cudda9-ravsAc

## 6. Post-déploiement

- Configurer un nom de domaine personnalisé si nécessaire
- Activer les analytics Vercel
- Configurer les redirections si nécessaire

## Troubleshooting

### Erreur Prisma
Si erreur de génération Prisma:
```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

### Erreur NextAuth
Vérifier que `NEXTAUTH_URL` correspond exactement à l'URL de production.

### Erreur de base de données
Vérifier la `DATABASE_URL` et la connectivité réseau.