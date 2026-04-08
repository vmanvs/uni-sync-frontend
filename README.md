# 🎓 UniSync — Campus Resource Management Dashboard

<div align="center">

**Built for Management. Designed for Students.**

A modern, real-time campus resource management platform built with Next.js 16, React 19, and Tailwind CSS. UniSync gives students, faculty, and administrators a unified dashboard to monitor and manage university resources — from water coolers and library seats to playgrounds and health rooms.

[Live Demo](https://uni-sync-frontend.vercel.app) · [Report Bug](/report) · [Request Feature](https://github.com/your-username/uni-sync-frontend/issues)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Pages & Routes](#-pages--routes)
- [Backend Integration](#-backend-integration-django--supabase)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### 🏠 Dashboard
- **Card Carousel** — Overlapping, swipeable resource cards with next/prev navigation
- **Recent Activity Feed** — Live campus-wide updates (faculty availability, playground status, cooler reports)
- **Notification System** — User-specific alerts via bell icon modal (mark as read, unread count badge)

### 🚰 Water Coolers (`/coolers`)
- Building selector (AB-1 / AB-2)
- Floor selector (Ground / First / Second / Third)
- Dynamic cooler info table filtered by building + floor
- Functional status with color-coded indicators (Working / Not Working)

### 👨‍🏫 Faculty (`/faculty`)
- Searchable faculty table with live filtering
- Available slots, duration, and faculty name
- Empty state handling

### 📚 Library (`/library`)
- Building selector cards with total seat counts
- **Interactive sitting chart** — Click any seat to toggle occupied/available
- Live availability counter (available vs occupied)
- Per-building seating data

### 🏥 Health Room (`/health`)
- Summary stat cards (Available / Busy / Closed)
- Expandable doctor rows with status badges, specialization, and location
- "Book Appointment" button for available doctors
- Emergency contact banner

### 🏀 Play Grounds (`/playgrounds`)
- Card grid of all sports facilities (Basketball, Badminton, Cricket, Football, Tennis, Volleyball, Athletics)
- Filter tabs: All / Free / Occupied / Maintenance
- Expandable cards showing event details, booking info, or maintenance status
- Sport-specific icons

### 🛡️ Admin Panel (`/admin`)
- Campus overview stat cards (students, faculty, issues, resource health)
- Resource health table with progress bars
- Filterable issue tracker with priority dots and status badges

### 👨‍🏫 Teachers Panel (`/teachers`)
- Faculty profile card with gradient header
- Interactive slot management (toggle Open/Blocked)
- Student request approval/rejection system
- Announcement posting

### 🚩 Report an Issue (`/report`)
- Category picker with emoji icons (6 categories)
- Location input, description textarea, priority selector
- Real-time form validation
- "My Reports" sidebar with status tracking
- Success toast animation on submission

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
| ----------- | ------------------------------ |
| Framework   | Next.js 16.2 (App Router)     |
| UI          | React 19, TypeScript 5        |
| Styling     | Tailwind CSS 4                 |
| Fonts       | Inter, Lato, Mukta Malar       |
| Icons       | Custom SVGs in `/public/icons` |
| Deployment  | Vercel                         |

---

## 📁 Project Structure

```
uni-sync-frontend/
├── public/
│   └── icons/                    # SVG icons for sidebar, cards, and UI
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Dashboard (home)
│   │   ├── layout.tsx            # Root layout (fonts, globals)
│   │   ├── globals.css           # Design system (CSS variables + Tailwind)
│   │   ├── admin/page.tsx        # Admin panel
│   │   ├── coolers/page.tsx      # Water coolers
│   │   ├── faculty/page.tsx      # Faculty directory
│   │   ├── health/page.tsx       # Health rooms
│   │   ├── library/page.tsx      # Library sitting chart
│   │   ├── playgrounds/page.tsx  # Sports grounds
│   │   ├── report/page.tsx       # Report an issue
│   │   └── teachers/page.tsx     # Teachers panel
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── CardCarousel.tsx   # Overlapping card carousel
│   │   │   ├── ResourceCard.tsx   # Individual resource card
│   │   │   └── ReservationsTable.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Header with notification modal
│   │   │   └── Sidebar.tsx        # Route-aware sidebar navigation
│   │   └── ui/
│   │       ├── BuildingCard.tsx   # Reusable building selector
│   │       ├── NavItem.tsx        # Sidebar navigation item
│   │       └── SectionLabel.tsx   # Section heading component
│   └── lib/
│       └── mockData.ts           # All mock data & TypeScript interfaces
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/uni-sync-frontend.git
cd uni-sync-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📄 Pages & Routes

| Route          | Page              | Description                              |
| -------------- | ----------------- | ---------------------------------------- |
| `/`            | Dashboard         | Card carousel, recent activity feed      |
| `/coolers`     | Water Coolers     | Building/floor selectors, info table     |
| `/faculty`     | Faculty           | Searchable faculty directory             |
| `/health`      | Health Room       | Doctor availability, appointments        |
| `/library`     | Library           | Interactive sitting chart                |
| `/playgrounds` | Play Grounds      | Sports facilities, status filters        |
| `/admin`       | Admin Panel       | Campus stats, issue tracker              |
| `/teachers`    | Teachers Panel    | Slot management, student requests        |
| `/report`      | Report Issue      | Issue submission form, tracking          |

---

## 🔗 Backend Integration (Django + Supabase)

UniSync is designed as a frontend that connects to a **Django REST API** backend with **Supabase** for authentication and database. Here's how to wire it up:

### Architecture Overview

```
┌─────────────────┐     REST API      ┌─────────────────┐     DB/Auth     ┌──────────────┐
│  UniSync        │ ──────────────►   │  Django Backend  │ ──────────────► │   Supabase   │
│  (Next.js)      │   JWT tokens      │  (DRF)           │   PostgreSQL    │   (Auth+DB)  │
│  Port 3000      │ ◄──────────────   │  Port 8000       │ ◄────────────── │              │
└─────────────────┘                   └─────────────────┘                  └──────────────┘
```

### Step 1: Environment Variables

Create a `.env.local` file in the frontend root:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Supabase (for client-side auth)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 3: Create Supabase Client (`src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Step 4: Create API Client (`src/lib/api.ts`)

```typescript
import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token || ''}`,
  };
}

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: await getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: await getAuthHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
};
```

### Step 5: Replace Mock Data with API Calls

Example — replacing the faculty mock data:

```typescript
// src/lib/api.ts (add endpoint)
export async function getFaculty(search?: string): Promise<FacultyRow[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return api.get(`/faculty/${query}`);
}

// src/app/faculty/page.tsx (use it)
'use client';
import { useEffect, useState } from 'react';
import { getFaculty } from '@/lib/api';
import { FacultyRow } from '@/lib/mockData';

export default function FacultyPage() {
  const [data, setData] = useState<FacultyRow[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getFaculty(search).then(setData).catch(console.error);
  }, [search]);

  // ... rest of the component
}
```

### Step 6: Django Backend API Endpoints

Your Django DRF backend should expose these endpoints:

| Method | Endpoint                          | Description                          |
| ------ | --------------------------------- | ------------------------------------ |
| GET    | `/api/v1/faculty/`                | List faculty (supports `?search=`)   |
| GET    | `/api/v1/library/buildings/`      | List library buildings + seat counts |
| GET    | `/api/v1/library/seats/:id/`      | Get sitting chart for a building     |
| PATCH  | `/api/v1/library/seats/:id/`      | Toggle a seat's status               |
| GET    | `/api/v1/coolers/`                | List coolers (supports `?building=&floor=`) |
| GET    | `/api/v1/health-rooms/`           | List health rooms + doctor info      |
| GET    | `/api/v1/playgrounds/`            | List grounds (supports `?status=`)   |
| GET    | `/api/v1/notifications/`          | User's notifications                 |
| PATCH  | `/api/v1/notifications/:id/read/` | Mark notification as read            |
| GET    | `/api/v1/activity/`               | Recent campus activity feed          |
| GET    | `/api/v1/admin/stats/`            | Admin dashboard stats                |
| GET    | `/api/v1/admin/issues/`           | Issue tracker list                   |
| POST   | `/api/v1/issues/`                 | Submit a new issue                   |
| GET    | `/api/v1/issues/mine/`            | User's submitted issues              |
| GET    | `/api/v1/teachers/slots/`         | Teacher's slots for today            |
| PATCH  | `/api/v1/teachers/slots/:id/`     | Toggle slot availability             |
| GET    | `/api/v1/teachers/requests/`      | Pending student requests             |
| PATCH  | `/api/v1/teachers/requests/:id/`  | Approve/reject a request             |
| POST   | `/api/v1/teachers/announcements/` | Post an announcement                 |

### Step 7: Django Backend Setup (Quick Start)

```bash
# Create Django project
pip install django djangorestframework django-cors-headers supabase

# settings.py additions
INSTALLED_APPS += ['rest_framework', 'corsheaders']
MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",        # Next.js dev
    "https://your-app.vercel.app",  # Production
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'your_app.auth.SupabaseAuthentication',
    ],
}

# Database: point to Supabase PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': 'db.your-project.supabase.co',
        'PORT': '5432',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'your-db-password',
    }
}
```

### Step 8: Supabase Auth in Django (`auth.py`)

```python
from rest_framework.authentication import BaseAuthentication
from supabase import create_client
import os

supabase = create_client(
    os.environ['SUPABASE_URL'],
    os.environ['SUPABASE_SERVICE_KEY']
)

class SupabaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', '').replace('Bearer ', '')
        if not token:
            return None

        try:
            user_response = supabase.auth.get_user(token)
            user_data = user_response.user
            # Get or create Django user linked to Supabase UID
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user, _ = User.objects.get_or_create(
                username=user_data.id,
                defaults={'email': user_data.email}
            )
            return (user, token)
        except Exception:
            return None
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Option 1: Via GitHub (recommended)
# Push to GitHub → vercel.com → New Project → Import repo → Deploy

# Option 2: Via CLI
npx vercel --prod
```

### Backend (Railway / Render / Fly.io)

```bash
# Example with Railway
railway init
railway add --database postgresql  # or use Supabase's DB
railway up
```

### Environment Variables on Vercel

Set these in your Vercel project settings → Environment Variables:

| Variable                          | Value                          |
| --------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL`             | `https://your-api.railway.app` |
| `NEXT_PUBLIC_SUPABASE_URL`        | `https://xxx.supabase.co`      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | `eyJhbG...`                    |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Made with ❤️ for campus life</p>
</div>
