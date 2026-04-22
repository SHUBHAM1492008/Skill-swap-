# SkillSwap Studio Merge Architecture Plan

Local continuation of the cloud merge task.

## Current Local Task State

- Local branch: `codex/continue-skillswap-cloud-task`
- Workspace inspected: `C:\Users\SHUBHAM\OneDrive\Documents\New project`
- Nearby archive inspected: `C:\Users\SHUBHAM\OneDrive\Documents\New project.rar`
- Second archive inspected: `E:\b_aXG2hcrfPt6-1773841548905.rar`
- Archive finding: `New project.rar` contains another copy of the current `New project` tree.
- Verified second codebase: `E:\b_aXG2hcrfPt6-1773841548905.rar` contains the missing product areas at `app/(dashboard)/dashboard`, `wallet`, `challenges`, `projects`, and `settings`.
- Merge risk: the verified second codebase is an Expo Router / NativeWind app, while the current local architecture is React Navigation / typed services. Port product concepts, data, and screens into the local architecture rather than replacing the router/provider/theme stack.

This means the local app remains the stronger architecture/service base, and the second codebase is now the product-area donor for the missing tabs.

## Original Merge Direction

The final app must be one responsive web app that keeps the breadth of the second project and the deeper engineering of the first project.

- Codebase 2 remains the primary base because it contains the broader visible product surface.
- Codebase 1 is the architecture donor because it contains stronger services, state, providers, theme, and backend-oriented structure.
- No risky merge edits should happen until the product surface from Codebase 2 is available and mapped.

## Local App Inventory

The current local app is an Expo React Native web app with:

- Entry/provider shell: `App.tsx`, `src/providers/AppProviders.tsx`
- Navigation shell: `src/navigation/AppNavigator.tsx`, `src/navigation/AppTabsNavigator.tsx`
- Auth flow: onboarding, login, register
- Current app tabs:
  - Marketplace (`Discover`)
  - Matches
  - Messages
  - Sessions
  - Free Courses
  - Profile
- Detail flows:
  - Skill detail
  - Match detail
  - Chat
  - Book session
  - Edit profile
- State and domain layers:
  - `AppStateContext`
  - `AuthContext`
  - `SkillsContext`
  - `MatchesContext`
  - `SessionsContext`
  - `NotificationsContext`
  - `CoursesContext`
- Service layer:
  - `services/contracts.ts`
  - `services/createDefaultServices.ts`
  - `services/mock/createMockServices.ts`
  - `services/supabase/createSupabaseServices.ts`
  - `services/appDataSnapshot.ts`
- Backend assets:
  - Supabase profiles migration
  - Supabase notifications migration
  - Supabase notification edge function

## Keep From Codebase 2

These must remain in the final merged app now that Codebase 2 is verified:

- Dashboard tab/screen and its dashboard-specific cards, metrics, and shortcuts.
- Wallet tab/screen, including balances, credit transactions, earning/spending history, and wallet actions.
- Challenges tab/screen, including active challenges, progress, rewards, and completion states.
- Projects tab/screen, including project list/detail flows and project progress/status.
- Settings tab/screen, including account, notification, privacy, display, and app preferences.
- Any wider second-codebase product areas not visible in the local app.
- The broader navigation information architecture from Codebase 2, adjusted only enough to plug into the stronger local providers and services.

The second codebase should remain the visible app shell unless a screen is clearly lower quality and can be replaced without losing behavior.

Verified product files in Codebase 2:

- `app/(dashboard)/dashboard/index.tsx`
- `app/(dashboard)/wallet/index.tsx`
- `app/(dashboard)/challenges/index.tsx`
- `app/(dashboard)/projects/index.tsx`
- `app/(dashboard)/settings/index.tsx`
- Supporting domain source:
  - `lib/skillswap/models.ts`
  - `lib/skillswap/seed.ts`
  - `lib/skillswap/selectors.ts`
  - `lib/skillswap/store.ts`

## Port From Codebase 1 / Current Local App

These local pieces are strong candidates to port into the final merged shell:

- Provider composition from `AppProviders`.
- Service boundary from `AppServices` and `services/contracts.ts`.
- Runtime service switching from `createDefaultServices`:
  - Supabase services when configured.
  - Mock services as the local/dev fallback.
- Auth restore and auth action result pattern from `AuthContext`.
- App data snapshot pattern from `readAppDataSnapshot`.
- Profile hydration and profile update flow from `AppStateContext`.
- Skill/session booking domain behavior:
  - credit checks
  - duplicate booking prevention
  - session completion rewards
  - XP/streak updates
- Matchmaking state from `MatchesContext` and `utils/matchmaking.ts`.
- Notification service abstractions:
  - permission state
  - Expo token handling
  - match/message/session reminder events
  - Supabase notification persistence
- Theme system:
  - palette
  - semantic colors
  - spacing
  - radius
  - typography
  - shadows
- Responsive primitives:
  - `useBreakpoint`
  - `Screen`
  - `PageContainer`
  - `ResponsiveGrid`
  - `ResponsiveRow`
  - shared cards, states, banners, tabs, inputs, and buttons.

## Ignore Or Remove As Redundant

Once both codebases are present, remove or ignore:

- Duplicate app entry points.
- Duplicate navigation containers.
- Duplicate provider roots.
- Duplicate theme constants if they conflict with the chosen final design system.
- Mock data copies that overlap without adding unique product surface.
- Duplicate auth clients, API clients, or Supabase clients.
- Duplicate primitive components that only restyle an existing component without adding behavior.
- Generated build output such as `dist`.
- Dependency folders such as `node_modules`.
- Archive copies of the same project tree.

## Final Merged Architecture

Target structure:

- `App.tsx`
  - `AppProviders`
  - `NavigationContainer`
  - root navigator
- `src/providers`
  - final provider composition
- `src/services`
  - stable app service contracts
  - mock implementation
  - Supabase implementation
  - future service modules for wallet, challenges, projects, and settings
- `src/context`
  - high-level app state
  - domain contexts for dashboard, wallet, challenges, projects, settings, skills, matches, sessions, messages, courses, notifications, auth
- `src/navigation`
  - auth navigator
  - app shell navigator
  - tab/rail navigation based on Codebase 2 product breadth
  - detail stacks for each product area
- `src/screens`
  - preserve Codebase 2 screen breadth
  - plug screens into the local service/context layer
- `src/components`
  - shared responsive primitives and reusable cards
- `src/theme`
  - single semantic token system
- `supabase`
  - migrations/functions needed by the service layer

## Merge Phases

1. Intake both codebases.
   - Confirm Codebase 2 exists locally.
   - List screens, tabs, routes, providers, services, data models, and backend files from both codebases.
   - Produce a route-by-route and service-by-service comparison.

2. Stabilize the primary shell.
   - Keep Codebase 2 navigation/product areas as the visible base.
   - Add missing route types and detail stacks only after mapping the screens.
   - Preserve dashboard, wallet, challenges, projects, and settings before porting internals.

3. Port architecture inward.
   - Introduce the local service contracts behind Codebase 2 screens.
   - Move Codebase 2 data access into service methods rather than inline screen state.
   - Add service domains for wallet, challenges, projects, settings, and dashboard.

4. Reconcile domain models.
   - Extend `types/models.ts` rather than creating parallel type systems.
   - Add wallet transactions, challenge records, project records, settings preferences, and dashboard summaries.

5. Connect backend behavior.
   - Reuse Supabase client/runtime config.
   - Add or reconcile migrations for wallet/challenges/projects/settings if Codebase 2 has persistence needs.
   - Keep mock services complete enough for offline local development.

6. Responsive regression pass.
   - Validate phone, tablet, and desktop layouts.
   - Confirm the tab/rail pattern still exposes all final product areas.
   - Check text overflow and nested-card issues.

7. Cleanup.
   - Remove redundant routers/providers/theme files.
   - Remove copied placeholder screens.
   - Keep `dist`, `node_modules`, and archive artifacts out of committed source changes.

## Controlled Merge Decision

Use the current local app as the final app root.

- Do not import Expo Router into the local app.
- Do not import NativeWind/Tailwind UI components into the local app.
- Do not replace `AppProviders`, `ServicesProvider`, or the Supabase/mock service boundary.
- Add the missing product areas as React Navigation tabs/stacks using local responsive primitives.
- Extend the existing service contracts, mock services, app snapshot, and model types for wallet, challenges, projects, and settings.
- Keep the second codebase project routes as source references only.

## Current Local Task

1. Import dashboard, wallet, challenges, projects, and settings into the existing React Navigation app.
2. Add local model/data/service support for the imported product areas.
3. Keep existing marketplace, matches, messages, sessions, courses, profile, auth, Supabase fallback, and notification behavior intact.
4. Validate with `npm run typecheck`.
