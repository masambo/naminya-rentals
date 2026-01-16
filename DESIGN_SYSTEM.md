# Design System - Text Sizes & Typography

This document outlines the standardized text sizes and design consistency across the Ndunda app.

## Typography Scale

### Headings
- **H1 (Page Titles)**: `text-2xl md:text-3xl lg:text-4xl font-bold`
  - Used for main page headings
  - Examples: "Verified Agents", "My Listings", "Saved Properties"

- **H2 (Section Headings)**: `text-xl md:text-2xl lg:text-3xl font-bold`
  - Used for major section headings
  - Examples: "Featured Listings", "Verified Agents" (home page)

- **H3 (Subsection Headings)**: `text-lg md:text-xl font-semibold`
  - Used for subsections and card titles
  - Examples: Empty state headings, dialog titles

### Body Text
- **Large Body**: `text-base md:text-lg`
  - Used for important descriptions and primary content
  - Examples: Empty state messages, descriptions

- **Standard Body**: `text-base`
  - Default body text size
  - Used for most content

- **Small Body**: `text-sm md:text-base`
  - Used for secondary information
  - Examples: Metadata, labels, helper text

- **Extra Small**: `text-xs md:text-sm`
  - Used only for labels, captions, and very small metadata
  - Examples: Badge text, timestamps

## Component-Specific Standards

### Navigation
- **Nav Items**: `text-base font-medium`
- **Icons**: `w-5 h-5` to `w-6 h-6`
- **Nav Bar Height**: `h-20` (increased from h-16)

### Property Cards
- **Title**: `text-base md:text-lg font-semibold`
- **Location**: `text-sm md:text-base`
- **Details (Beds/Baths/Size)**: `text-sm`
- **Price**: `text-xl md:text-2xl font-bold`
- **Price Unit**: `text-sm md:text-base`

### Agent Cards
- **Name**: `text-base font-semibold` (mobile), `text-lg font-semibold` (desktop)
- **Speciality**: `text-sm` (mobile), `text-sm` (desktop)
- **Stats**: `text-sm`
- **Avatar Size**: `w-20 h-20 md:w-24 md:h-24` (home page), `w-24 h-24 md:w-28 md:h-28` (agents page)

### Buttons
- **Standard**: `text-sm md:text-base font-medium`
- **Large**: `text-base md:text-lg font-medium`
- **Icon Size**: `w-4 h-4` to `w-6 h-6` depending on context

### Forms & Inputs
- **Labels**: `text-base font-semibold`
- **Input Text**: `text-base`
- **Helper Text**: `text-sm md:text-base`

### Empty States
- **Icon Size**: `w-12 h-12 md:w-16 md:h-16`
- **Heading**: `text-lg md:text-xl font-semibold`
- **Description**: `text-base md:text-lg`

## Spacing Standards

### Section Padding
- **Mobile**: `px-4 py-4`
- **Desktop**: `px-0 py-8` or `md:px-0 md:py-8`

### Component Gaps
- **Small Gap**: `gap-2` to `gap-3`
- **Medium Gap**: `gap-4` to `gap-6`
- **Large Gap**: `gap-6 md:gap-8`

### Margins
- **Section Margins**: `mb-4 md:mb-6` or `mb-6 md:mb-8`
- **Element Margins**: `mb-2` to `mb-4`

## Updated Components

### ✅ Home Page (Index.tsx)
- Section headings: `text-xl md:text-2xl lg:text-3xl`
- "View all" links: `text-base md:text-lg`

### ✅ Featured Agents Component
- Heading: `text-xl md:text-2xl lg:text-3xl`
- Agent avatars: `w-20 h-20 md:w-24 md:h-24`
- Agent names: `text-sm md:text-base font-semibold`
- Listings count: `text-xs md:text-sm`

### ✅ Accommodation Types
- Labels: `text-sm md:text-base font-semibold`

### ✅ Property Cards
- Title: `text-base md:text-lg`
- Location: `text-sm md:text-base`
- Details: `text-sm`
- Price: `text-xl md:text-2xl`
- Icons: `w-4 h-4`

### ✅ Agents Page
- Mobile agent names: `text-base`
- Mobile speciality: `text-sm`
- Mobile stats: `text-sm`
- Rating badges: Larger icons and text

### ✅ Search Page
- Empty state heading: `text-lg md:text-xl`
- Empty state description: `text-base md:text-lg`

### ✅ Nearby Scan Page
- All text sizes increased
- Distance filter buttons: `text-base md:text-lg`
- Distance badges: `text-sm`

## Consistency Rules

1. **Never use `text-[10px]`** - Minimum is `text-xs` (12px)
2. **Avoid `text-xs` for important content** - Use `text-sm` minimum
3. **Headings should scale** - Always include responsive sizes (`md:`, `lg:`)
4. **Icons should match text size** - Larger text = larger icons
5. **Spacing should scale** - Use responsive padding/margins

## Responsive Breakpoints

- **Mobile (default)**: Base sizes
- **Tablet (`md:`)**: 768px+ - Slightly larger
- **Desktop (`lg:`)**: 1024px+ - Largest sizes

## Examples

### Good ✅
```tsx
<h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Section Title</h2>
<p className="text-base md:text-lg text-muted-foreground">Description text</p>
<span className="text-sm font-semibold">Label</span>
```

### Bad ❌
```tsx
<h2 className="text-lg font-bold">Section Title</h2>  // Too small
<p className="text-xs text-muted-foreground">Description</p>  // Too small
<span className="text-[10px]">Label</span>  // Never use
```

---

**Last Updated**: All pages have been standardized with consistent text sizes and spacing.
