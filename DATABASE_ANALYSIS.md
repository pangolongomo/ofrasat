# OFRASAT Database Model Analysis

## Company Overview
OFRASAT is a Congolese engineering, consulting, and advisory company operating internationally across multiple sectors including:
- Agro-food, infrastructure, construction, public works
- IT, real estate, finance, mining, logistics, transport
- Water, hygiene, sanitation, SMEs, rural/urban development
- Institutional support, marketing, communication, telecommunications, audiovisual, Internet

## Database Architecture

### Core Business Structure

#### Branches (3 main divisions)
- **OFRASAT Consulting**: Engineering and advisory services
- **OFRASAT Finance**: Financial services and consulting  
- **OFRASAT Communication**: Marketing, communication, audiovisual services

#### Key Models

1. **User Management** (NextAuth integration)
   - User roles: ADMIN, EDITOR
   - Authentication via NextAuth with Account/Session models
   - Users can author articles

2. **Content Management**
   - **Branch**: Represents the 3 company divisions
   - **Article**: Content pieces linked to specific branches
   - **Tag**: Categorization system for articles
   - Article statuses: DRAFT, PUBLISHED, ARCHIVED

3. **Company Information**
   - **CompanyInfo**: Mission, vision, values, contact details
   - **Service**: Company services with ordering and activation

### Data Relationships

```
User (1) -----> (N) Article
Branch (1) ---> (N) Article  
Article (N) <---> (N) Tag
```

### Key Features Supported

1. **Multi-branch Content**: Each article belongs to one of the 3 branches
2. **Role-based Access**: Admin and Editor roles for content management
3. **Article Management**: Full CRUD with draft/publish workflow
4. **SEO-friendly**: Slug fields for clean URLs
5. **Tagging System**: Flexible categorization
6. **Company Profile**: Centralized company information management

### Technical Specifications

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Validation**: Zod (to be implemented in application layer)
- **Framework**: Next.js

### Indexes for Performance
- Articles indexed by status and publication date
- Articles indexed by branch for efficient filtering
- Services ordered by priority

This model supports the complete OFRASAT website requirements with proper separation of concerns between the three business branches while maintaining a unified content management system.