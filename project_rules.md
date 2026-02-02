# Project Tech Stack & Rules

## Core Technologies

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with `tailwindcss-animate`)
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **State/Data**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts

## Design System

- **Colors**: Defined in `tailwind.config.ts` and CSS variables.
- **Typography**: Inter and Plus Jakarta Sans.
- **Components**: Reusable components located in `src/components/ui`.

## Agent Guidelines

1. **Styling**: Always use Tailwind utility classes. Avoid inline styles.
2. **Components**: Use `src/components/ui` for primitives. Create new composite components in `src/components`.
3. **Imports**: Use `@/` alias for imports from `src`.
4. **Icons**: Use `lucide-react` for all icons.
