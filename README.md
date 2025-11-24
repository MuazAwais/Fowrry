## Next.js Commerce Portal Plan

### Project Skeleton & Tooling
- **Scaffold**: `npx create-next-app@latest fowrry --ts --eslint --src-dir --app --tailwind --use-npm`
- **Packages**: `npm i @radix-ui/react-* @reduxjs/toolkit react-redux @tanstack/react-query @reduxjs/toolkit/query react-hook-form zod lucide-react class-variance-authority tailwind-merge axios msw`
- **Fonts**: configure `next/font` with Open Sans in `src/app/layout.tsx`
- **State**: configure `store` in `src/store/index.ts`, RTK Query slice for products/order/auth, RTK slice for cart/UI.
- **Fake API**: use MSW to mock endpoints (`src/mocks/handlers.ts`, `src/mocks/browser.ts`). Structure resources: `/categories`, `/products?category=`, `/product/:id`, `/offers`, `/orders/track`, `/auth/login`, `/auth/signup`, `/auth/reset`, `/checkout/*`, `/locations`.
- **Scripts**: `npm run dev`, `npm run lint`, `npm run mock` (start msw), `npm run test`.
- **Configs**:
  - `tailwind.config.ts`: extend theme (colors, spacing, shadows, fonts, screens); register Radix + custom utilities.
  - `postcss.config.js` standard.
  - `tsconfig.json`: base paths (`@/*` → `./src`).
  - `.env.local`: base URL for fake API, map API key placeholder.

### Folder Structure
```
src/
  app/
    layout.tsx
    page.tsx                // Home
    offers/page.tsx
    favorites/page.tsx
    track-order/page.tsx
    auth/
      login/page.tsx
      signup/page.tsx
      forgot-password/page.tsx
    about/page.tsx
    help/page.tsx
    contact/page.tsx
    faqs/page.tsx
    checkout/
      page.tsx              // orchestrator w/tabs
      order-review/page.tsx
      delivery-options/page.tsx
      confirm-address/page.tsx
      payment/page.tsx
      confirmation/page.tsx
    location/page.tsx
    category/[slug]/page.tsx
    product/[id]/page.tsx
  components/
    layout/
      header/
        index.tsx
        welcome-strip.tsx
        nav-links.tsx
        hamburger.tsx
        cart-button.tsx
        nav-drawer.tsx
      footer/
        index.tsx
        link-columns.tsx
        social-icons.tsx
    ui/                      // Radix-based primitives
      button.tsx
      card.tsx
      badge.tsx
      sheet.tsx
      modal.tsx
      tooltip.tsx
      separator.tsx
    shared/
      container.tsx
      section-heading.tsx
      product-card.tsx
      category-tabs.tsx
      hero-banner.tsx
      testimonial.tsx
      map-picker.tsx
  features/
    home/
    cart/
    products/
    auth/
    checkout/
    location/
  hooks/
  lib/
    api/
      base.ts
      productApi.ts
      orderApi.ts
      authApi.ts
      locationApi.ts
    forms/
      resolvers.ts
    constants.ts
  store/
    index.ts
    slices/
      cartSlice.ts
      uiSlice.ts
  mocks/
    handlers.ts
    data/
      categories.json
      products.json
      offers.json
      faqs.json
  styles/
    globals.css
    tokens.css
```

---

### 1. Installation & Setup Details
- **Next.js + TypeScript**: already scaffolded; enable `strict: true`.
- **Tailwind**:
  - `globals.css`: `@tailwind base; components; utilities;` import `tokens.css`.
  - Create `tokens.css` for CSS variables (colors typography spacing).
  - Extend theme: `colors` (primary, accent, neutrals), `fontFamily: { sans: ['var(--font-open-sans)'] }`, custom `boxShadow` tokens, `spacing`, `borderRadius`.
  - Add plugins: `tailwindcss-animate`.
- **Radix UI**:
  - Install needed primitives: `react-dialog`, `react-sheet`, `react-dropdown-menu`, `react-navigation-menu`.
  - Wrap interactive components with accessible primitives; ensure `aria-*`.
- **Icon Library**: `lucide-react` (tree-shakable, TypeScript ready). Create `components/ui/icon.tsx` for consistent sizing.
- **Open Sans**:
  ```ts
  import { Open_Sans } from 'next/font/google';
  const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
  export const metadata = { ... };
  <html className={openSans.variable}>
  ```
- **Redux Toolkit + RTK Query**:
  - `configureStore({ reducer: { cart: cartReducer, ui: uiReducer, [api.reducerPath]: api.reducer }, middleware: gDM => gDM().concat(api.middleware) })`.
  - `ProductApi` with endpoints: `getCategories`, `getProductsByCategory`, `getProduct`.
  - `CheckoutApi`: `postOrderReview`, etc.
- **Fake API (MSW)**:
  - `handlers.ts`: define `rest.get('/api/categories', ...)`.
  - Start in dev: `if (process.env.NODE_ENV === 'development') worker.start();`.
- **Best Practices**: enforce ESLint + Prettier, use absolute imports, add testing (React Testing Library) for key components, commit hooks optional.

---

### 2. Global Styling Plan
- **CSS Variables** (`styles/tokens.css`):
  - Colors: `--color-primary`, `--color-secondary`, `--color-success`, neutrals `--color-gray-100..900`.
  - Shadows: `--shadow-soft`, `--shadow-card`, `--shadow-elevated`.
  - Typography: `--font-size-xs..4xl`, `--line-height-*`.
  - Spacing: `--space-1 .. 12`.
- **Container Utility** (`components/shared/container.tsx`):
  - `maxWidth` per breakpoint (`sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1440`), horizontal padding `px-4 md:px-6 lg:px-8`.
- **Tailwind Extensions**:
  - `screens`: `xs` for 475px.
  - `animation`: fade-in, slide, skeleton shimmer.
  - `colors`: map to CSS vars `primary: 'hsl(var(--color-primary))'`.
  - `backgroundImage`: gradient tokens.
- **Reusable Patterns**:
  - `Card` component for product tiles.
  - `SectionHeading` with label + CTA.
  - `Grid` utilities for responsive product lists.
  - Form controls (input, select) wrapping Radix primitives; consistent focus ring.
  - `Skeleton` component for loading states.

---

### 3. Header & Footer Components
- **Header Hierarchy**:
  - `Header` (layout wrapper)
    - `WelcomeStrip`: top promo text, optional CTA, `aria-live="polite"`.
    - `NavBar`: logo, nav links, search input, account, cart.
      - `NavLinks`: Desktop navigation.
      - `HamburgerButton`: toggles mobile drawer (Radix `Sheet`), `aria-expanded`.
      - `CartButton`: badge using cart count from RTK, `aria-label="Cart (3 items)"`.
    - `NavDrawer`: full-screen overlay with categories, quick links, CTA buttons.
- **Accessibility**:
  - Use `header` landmark, `nav` with `aria-label`.
  - Keyboard traps in drawer; focus management via Radix.
  - Buttons labeled for screen readers.
- **Footer Hierarchy**:
  - `Footer`
    - `BrandSummary`
    - `LinkColumns`: arrays for `Shop`, `Support`, `Company`.
    - `QuickActions`: newsletter form, CTA buttons.
    - `SocialIcons`: `aria-label="Visit us on X"`.
  - Ensure contrast, large tap targets, `footer` semantic tag.

---

### 4. Pages & Feature Planning

#### Home (`/`)
- **Sections**:
  - `HeroBanner`: Radix `Carousel` optional.
  - `CategoryTabs`: electronics / grocery / restaurants; fetch via RTK Query `getCategories`.
  - `DynamicProductGrid`: `ProductCard` reusing same component; data from `/products?category`.
  - `RestaurantsHighlight`: list with ratings.
  - `OffersStrip`, `Testimonials`, `CallToAction`.
- **State**: `useGetCategoriesQuery`, local UI state for tab; `cartSlice` for add-to-cart.
- **Data**: `mocks/products.json` with `type`, `price`, `rating`, `tag`.

#### Category Page (`/category/[slug]`)
- Server component fetch or RTK Query; uses filters, sorting (Radix `DropdownMenu`).
- Show skeletons while loading; fallback for unknown slug.

#### Product Detail (`/product/[id]`)
- Components: `Gallery`, `DetailsPanel`, `NutritionInfo`, `DeliveryTime`, `AddToCart`.
- API: `getProduct(id)`.
- State: share `cartSlice`, `favorites` via RTK.

#### Offers (`/offers`)
- List of promotions; `OfferCard` pattern; data from `/offers`.

#### Favorites (`/favorites`)
- Use RTK slice for saved items; fallback message.

#### Track Order (`/track-order`)
- Form to enter order number; `useLazyGetOrderStatusQuery`.
- Timeline component.

#### Auth Pages (`/auth/*`)
- **Form Strategy**: React Hook Form + Zod for schema validation.
- Shared `AuthLayout`, `FormField` component.
- Endpoints: `/auth/login`, `/auth/signup`, `/auth/reset`.
- Manage auth state via RTK slice (tokens stored in cookie/local storage abstraction).

#### About / Help / Contact / FAQs
- Content sections; `FAQs` uses accordion (Radix `Accordion`).
- Contact form: react-hook-form + API call `/support/contact`.

#### Checkout Flow (`/checkout` + step pages)
- `CheckoutLayout` with progress tracker.
- API calls:
  - `Order Review`: fetch cart summary.
  - `Delivery Options`: endpoints for slots/shipping.
  - `Confirm Address`: uses `Location` data.
  - `Payment`: mock vault; integrate Radix `Dialog` for payment modal.
  - `Confirmation`: order id, share CTA.
- State: `checkoutSlice` storing form data between steps; persisted via `redux-persist` or session storage.

#### Location Selection (`/location`)
- Map/selector using placeholder map (Leaflet/Mapbox optional later). For now, list + search.
- `MapPicker` component with list + interactive map placeholder.
- API: `/locations` for suggestions.

---

### Component Trees & Reusable Patterns
- **ProductCard**: image → details → price → add button.
- **CategoryTabs**: Radix `Tabs` binding categories.
- **CartDrawer**: Radix `Sheet`, shows line items.
- **Form Controls**: `Form`, `FormField`, `Input`, `Select`, `Checkbox`, `RadioGroup`.
- **Feedback**: `Toast` provider (Radix) for success/error.

---

### State Management Overview
- **Slices**:
  - `cart`: `items`, `subtotal`, `addItem`, `updateQuantity`.
  - `ui`: `isNavOpen`, `theme`.
  - `auth`: `user`, `token`.
  - `checkout`: `stepsData`.
- **RTK Query APIs**:
  - `productApi`: categories/products/product detail.
  - `orderApi`: track order, checkout steps.
  - `authApi`: login/signup/reset.
  - `locationApi`: addresses.
- **Integration**: components use hooks like `const { data, isLoading } = useGetProductsQuery(category)`.

---

### Data Mocking
- `mocks/data/*.json`: structured objects with IDs, descriptions, CTA copy.
- Handlers convert JSON to responses, add delay to simulate latency.
- Provide error cases for testing.

---

### Reusable UI Patterns
- **Skeleton loaders** for cards.
- **Badges** for status (In Stock, Bestseller).
- **CTA buttons** (primary, secondary, ghost).
- **Cards** (product, info, testimonial) share shadow/spacing tokens.
- **Navigation Drawer** and **Sheet** reused for cart and mobile nav.
- **Form Layout** uses grid for desktop, stacked on mobile.

---

### Accessibility & Testing
- Ensure focus outlines, keyboard nav, descriptive `aria` labels.
- Use semantic HTML sections.
- Tests: component tests for Header, NavDrawer, ProductCard; integration tests for checkout steps using MSW.

---

### Next Steps
1. Run scaffold + install dependencies.
2. Configure Tailwind/theming + CSS tokens.
3. Implement mock server + API layer.
4. Build layout components (Header/Footer).
5. Develop home + category/product flows.
6. Implement auth + checkout forms.
7. Wire location selector & track order.
8. Final QA with MSW scenarios.

Let me know if you want executable scaffolding commands or initial config files checked in.