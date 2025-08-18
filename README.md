# OFRASAT Website

Site web officiel d'OFRASAT - Entreprise congolaise d'ingénierie, d'études et de conseils, pluridisciplinaire et indépendante à vocation internationale.

## À propos d'OFRASAT

OFRASAT intervient dans des domaines diversifiés :
- Agroalimentaire, infrastructures, bâtiment, travaux publics
- Informatique, immobilier, finance, mines, logistique
- Eau, hygiène, assainissement, MPME
- Marketing, communication, télécommunications, audiovisuel

### Nos Branches
- **OFRASAT Consulting** : Ingénierie numérique et conseil stratégique
- **OFRASAT Finance** : Services financiers et microfinance
- **OFRASAT Communication** : Communication globale et production audiovisuelle

## Technologies

- **Framework** : Next.js 15 avec App Router
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js
- **Validation** : Zod
- **Styling** : Tailwind CSS
- **Déploiement** : Vercel

## Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd ofrasat
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.local.example .env.local
```
Mettre à jour les variables :
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL="postgresql://username:password@localhost:5432/ofrasat"
```

4. **Configuration de la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Créer et migrer la base de données
npx prisma migrate dev

# Seeder les données initiales (superadmin + branches)
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Utilisation

### Accès Administrateur
- **URL** : `/auth/signin`
- **Superadmin** : pangolongomo@gmail.com / buxrif-cudda9-ravsAc
- **Dashboard** : `/dashboard`

### Rôles Utilisateurs
- **SUPERADMIN** : Accès complet (développeur)
- **ADMIN** : Gestion des utilisateurs et contenu (propriétaire)
- **EDITOR** : Création et édition d'articles

### Gestion du Contenu
1. Se connecter au dashboard
2. Créer des utilisateurs (ADMIN/SUPERADMIN uniquement)
3. Gérer les articles par branche
4. Configurer les paramètres de l'entreprise

## Structure du Projet

```
src/
├── app/
│   ├── (pages)/
│   │   ├── consulting/     # Page OFRASAT Consulting
│   │   ├── finance/        # Page OFRASAT Finance
│   │   └── communication/  # Page OFRASAT Communication
│   ├── auth/
│   │   └── signin/         # Page de connexion
│   ├── dashboard/          # Interface d'administration
│   └── api/
│       ├── auth/           # API NextAuth
│       └── users/          # API gestion utilisateurs
├── lib/
│   ├── auth.ts            # Configuration NextAuth
│   └── prisma.ts          # Client Prisma
prisma/
├── schema.prisma          # Schéma de base de données
└── seed.ts               # Données initiales
```

## Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npm run db:seed      # Seeder la base de données
```

## Base de Données

### Commandes Prisma
```bash
npx prisma studio           # Interface graphique
npx prisma migrate dev      # Nouvelle migration
npx prisma migrate reset    # Reset complet
npx prisma generate         # Générer le client
```

## Déploiement

1. **Vercel** (recommandé)
```bash
npm i -g vercel
vercel
```

2. **Variables d'environnement de production**
- `NEXTAUTH_URL` : URL de production
- `NEXTAUTH_SECRET` : Clé secrète sécurisée
- `DATABASE_URL` : URL PostgreSQL de production

## Contact

**OFRASAT**
- Email : contact@ofrasat.com
- Téléphone : +243 840 736 765
- Site web : www.ofrasat.com
