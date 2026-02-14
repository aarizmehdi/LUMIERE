<div align="center">
  <img src="./public/git_banner.png" width="100%" alt="Lumiere Banner" />
  <h1>Lumiere | Premium E-Commerce Platform</h1>
</div>

> A state-of-the-art, premium e-commerce solution engineered for performance, aesthetics, and seamless user experience.

## 🚀 Overview

**Lumiere** is a modern e-commerce application built with React, TypeScript, and Tailwind CSS. It features a sophisticated glassmorphism design system, advanced animations (GSAP & Framer Motion), and a fully responsive layout with a dedicated mobile-first experience.

Every interaction is crafted to feel premium, from the staggered product entrances to the tactile mobile touch feedback.

## ✨ Key Features

### 🎨 Premium UI/UX
-   **Glassmorphism Design System**: Custom blur effects, gradients, and translucent layers for a modern look.
-   **Advanced Animations**: Powered by **GSAP** (ScrollTrigger) and **Framer Motion** for smooth transitions and scroll effects.
-   **Dark/Light Mode**: Full theme support with persistent state management and seamless switching.
-   **Smooth Scrolling**: Integrated smooth scroll behavior for a fluid browsing experience.

### 📱 Mobile-First Experience
-   **Dedicated Mobile Layout**: A completely custom mobile interface separate from the desktop view.
-   **Bottom Navigation**: Native-app style bottom navigation bar for easy access on mobile devices.
-   **Touch Optimizations**: Tactile feedback (scale effects) on product cards and buttons.
-   **Global Mobile Header**: Persistent header with search and notifications across all mobile pages.

### 🛍️ Functionality
-   **Dynamic Product Grid**: Filtering, sorting, and category management.
-   **Quick View Modal**: Instant product preview without leaving the catalog.
-   **Cart & Wishlist**: Global state management using React Context API.
-   **Interactive Checkout**: A polished checkout flow with form validation.
-   **Search System**: Real-time search modal with category suggestions.

## 🛠️ Technology Stack

This project leverages the latest frontend technologies:

-   **Core**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/) (High-performance tooling)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
-   **Animation**:
    -   [GSAP](https://greensock.com/gsap/) (Complex scroll animations)
    -   [Framer Motion](https://www.framer.com/motion/) (Layout transitions and interactions)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather Icons)
-   **State Management**: React Context API (Shop, Theme)

## 📦 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── cart/           # Shopping cart related components
│   ├── home/           # Home page specific sections
│   ├── layout/         # Layout components (Navbar, Footer, MobileHeader)
│   ├── product/        # Product display components (Card, Grid)
│   └── ui/             # Core UI elements (Modal, Button, Inputs)
├── context/            # Global state providers (ShopContext, ThemeContext)
├── data/               # Static data and mock products
├── pages/              # Route components (HomePage, ShopPage, ProductPage)
└── lib/                # Utilities and helper functions
```

## 👨‍💻 Author

**Engineered by [Aariz Mehdi](https://github.com/aarizmehdi)**

Front End Engineer passionate about creating immersive and high-performance web experiences.

---

Quick Start:

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Start development server: `npm run dev`
