#  FitLog — Train with Intent. Log Every Set.

A dark, high-performance, no-nonsense gym companion and workout tracker built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Pick a lift from the library, lock it into today's plan, track live session metrics, and build consistent momentum.

---

##  Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Modern React framework with dynamic routing (`/workout/[id]`), static generation, and Turbopack |
| **React 19** | Component architecture, state management, and modern concurrent hooks (`React.use`) |
| **TypeScript** | Strict compile-time type safety with centralized domain models (`Workout`, `PlanWorkout`) |
| **Tailwind CSS v4 & DaisyUI** | Sleek, dark gym-aesthetic styling, responsive design tokens, and smooth transitions |
| **React Context API** | Centralized shared state across navbar, hero, library, details, and planning dashboard |
| **Local Storage** | Robust client-side data persistence with hydration guard to eliminate SSR mismatch |
| **React Hot Toast** | Non-intrusive toast notifications styled with custom dark-neon theme |
| **Google Fonts** | `Oswald` for bold athletic typography and `Inter` for clean tabular stats |

---

##  Key Features

### 1.  Curated Exercise Library & Responsive Grid
Explore 12 fundamental lifts covering chest, back, legs, arms, shoulders, and core. Each workout card showcases an athletic illustration, category badges, equipment specifications, and a key stats row (Duration, Calories Burned, Community Rating). Automatically adapts from a single column on mobile to a clean 3x4 grid on large displays.

### 2.  Dynamic Workout Details & Form Instructions
Each exercise features a dedicated dynamic page (`/workout/[id]`) with a split-column layout. The left column highlights the workout visual with floating category pills, while the right provides an in-depth breakdown: full description, a **Key Specs** grid (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and a numbered 4-step exercise execution guide.

### 3.  Smart Daily Plan Management (5-Lift Cap)
Fitness is about focus. FitLog enforces a strict cap of 5 lifts per daily workout. The application automatically detects duplicates and plan limits, updating the CTA buttons in real-time (*"Already in Plan"*, *"Plan Full (Max 5)"*, or *"Saved"*) with instant user toast feedback.

### 4.  Live Training Metrics Dashboard
The `/my-plan` dashboard computes and displays real-time cumulative stats across three primary metrics cards:
- **Exercises**: Current lifts loaded vs. the 5-exercise cap.
- **Minutes**: Total workout duration calculated dynamically.
- **Calories**: Total estimated energy expenditure in kcal.

### 5.  Dual Tabs, Multi-Criteria Sorting & Completion Tracking
- **Tab Navigation**: Seamlessly switch between **Today's Plan** and **Saved** workouts with dynamic counter badges.
- **Sorting**: Instant client-side re-sorting by **Duration**, **Calories**, or **Rating** without mutating original state.
- **Mark as Done**: Mark lifts complete with an interactive check button, striking through the title and stamping a green completed badge.
- **Quick Removal**: One-click removal for both planned and saved workouts with undo-ready toast alerts.

### 6.  LocalStorage Persistence with Hydration Safety
All planned and saved workouts persist across browser tabs, page reloads, and sessions. Implemented using an `isHydrated` lifecycle pattern that completely prevents Next.js SSR hydration mismatches.

### 7.  Figma-Fidelity Dark Gym Aesthetic & Custom 404 Route
Designed following modern gym branding with deep `#0d0d0d` surfaces, `#ccff00` electric lime accents, glassmorphic sticky navigation with counter pills, and a rep-themed **404 Not Found** page routing users back to the gym floor.

---

## 📂 Project Structure

```
fitlog/
├── public/
│   ├── banner.png          # Official hero banner illustration
│   ├── logo.png            # FitLog brand icon
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 theme, fonts, custom scrollbars
│   │   ├── layout.tsx      # Root layout with PlanProvider, Navbar, Footer, Toaster
│   │   ├── page.tsx        # Home page (Hero + LibrarySection)
│   │   ├── not-found.tsx   # Custom 404 page
│   │   ├── my-plan/
│   │   │   └── page.tsx    # My Plan dashboard (Metrics, Tabs, Sorting, Actions)
│   │   └── workout/
│   │       └── [id]/
│   │           └── page.tsx# Dynamic Workout Details page
│   ├── components/
│   │   ├── Navbar.tsx      # Sticky header with active links and counter pills
│   │   ├── Hero.tsx        # Hero banner with Oswald typography and scroll CTA
│   │   ├── WorkoutCard.tsx # Reusable lift card with hover effects
│   │   ├── LibrarySection.tsx # Workout grid with skeleton loaders
│   │   └── Footer.tsx      # Footer with logo and copyright notice
│   ├── context/
│   │   └── PlanContext.tsx # Shared state, localStorage sync, metrics calculation
│   ├── types/
│   │   └── index.ts        # TypeScript schemas (Workout, PlanWorkout, SortOption)
│   └── utils/
│       └── api.ts          # Cloudflare Worker API fetch methods
├── next.config.ts          # Remote image domains configuration
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/imranonweb/fitlog.git
cd fitlog
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

