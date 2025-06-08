# We Want Waste - Skip Hire Redesign

## Overview

This project is a redesign of the "We Want Waste" skip hire page. It is built with React and Vite, using TypeScript and Tailwind CSS. The goal was to enhance the user experience through improved UI, better filtering, accessibility, and performance optimizations.

---

## Why React and Vite?

- **React** was chosen because it was the requested framework and offers a powerful, declarative way to build interactive UIs.
- **Vite** was used as the build tool due to its lightning-fast development startup and optimized production builds, improving developer experience and performance.

---

## Styling with Tailwind CSS

I used **Tailwind CSS** because it allows writing styles directly in the markup, avoiding the need for separate CSS files and speeding up development while keeping styles consistent and maintainable.

---

## TypeScript & JavaScript

The project uses **TypeScript** alongside JavaScript for strong typing and type safety. This helps catch errors early, improves code readability, and facilitates easier maintenance.

---

## No Component Libraries

I deliberately avoided using component libraries to showcase my frontend skills by building custom UI components from scratch. This provides full control over the design and behavior while demonstrating my ability to handle UI challenges independently.

---

## Folder Structure

- `components/` — Contains all reusable UI components.
- `hooks/` — Custom React hooks for data fetching and other logic.
- `models/` — TypeScript types and interfaces to define data structures.

This separation of concerns keeps the code organized and easier to maintain.

---

## Redesign Highlights

- **Green color scheme:** Instead of the original blue, I used green to visually connect with the environment and waste management theme.
- **Advanced filters:** Added filtering options to help users easily find the right skip by size, location, price, and duration.
- **Skeleton loaders:** Implemented skeleton UI during data fetching for a smoother user experience while waiting.
- **Error and no-result handling:** Provided clear UI feedback when loading data fails or no skips match the selected filters.
- **404 not handled:** I assumed that when a user selects a postcode, skips for that postcode exist, so explicit 404 handling was not implemented.
- **Dark/Light mode:** Added theme toggling for user preference.
- **Multi-selection of skips:** Users can select multiple skips at once, with an expanded details panel showing their selections.
- **Help button:** Added a “Need help choosing the right skip size?” button at the end of the skip list to assist users unsure about their choice.
- **Skip card button replaced with checkbox:** To reduce clutter, the original "Select Skip" button in each card was replaced with a compact checkbox for selection.
- **Accessibility & contrast:** Ensured good color contrast and added aria-labels to buttons for better accessibility.

---

## Accessibility and Performance

I ensured that both **SEO** and **performance** scores consistently exceed **90%** in Lighthouse audits by:

- Optimizing loading states with skeleton screens
- Minimizing DOM complexity
- Using semantic HTML and ARIA attributes for accessibility
- Using Tailwind to minimize CSS bloat

---

## Why no 404 Handling?

The project assumes the API will always return skips for the given postcode. Thus, I focused on handling loading states and empty results rather than 404 pages.

---

## How to Run

```bash
npm install
npm run dev
