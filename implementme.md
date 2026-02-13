# Master UI/UX Refinement Prompt for Evora E-commerce Website

As a master UI designer and frontend developer analyzing your Evora e-commerce site, here's my comprehensive refinement vision:

## Core Design Philosophy
Create a hyper-premium, Apple-esque shopping experience where every scroll reveals intentional micro-interactions. The site should breathe luxury through restraint—using sophisticated animations that guide attention without overwhelming, typography scaled to the Fibonacci sequence (13px, 21px, 34px, 55px, 89px), and a spatial hierarchy that feels inevitable rather than designed.

## Scroll Experience & Visual Hierarchy

**Progressive Darkening Effect:**
- Implement GSAP ScrollTrigger with vertical parallax where scrolled sections fade to 85% opacity with a subtle dark overlay
- Active viewport section remains at 100% brightness with a gentle spotlight effect
- Create depth by applying different scroll speeds to background gradients (0.3x), product cards (0.5x), and foreground text (1x)

**Dynamic Typography Animation:**
- Hero headline "Objects that enhance life" should:
  - Start at 89px (Fibonacci), split into individual characters
  - Stagger-animate on scroll with elastic easing
  - Each word scales slightly (1.0 → 1.05 → 1.0) as it enters viewport center
  - Apply subtle text-shadow that intensifies with scroll position
  - Letters have micro-rotation variance (-2° to 2°) creating organic rhythm

**Subheading Treatment:**
- "Discover pieces designed with intention..." should use 21px base
- Implement morphing gradient text effect (champagne gold → warm silver)
- Characters fade in with staggered delay (30ms intervals)
- Subtle letter-spacing increase on hover (0.02em → 0.05em)

## Product Card Refinement

**Layout & Interaction:**
- Cards elevate on scroll-into-view with 3D tilt effect
- Glassmorphic backdrop-blur on hover with crisp 1px border
- Price typography: 34px Fibonacci scale with tabular-nums
- Star ratings animate sequentially (left to right fill)
- "Add to my space" button morphs to show subtle shimmer on hover

**Image Treatment:**
- Product images with 16:10 aspect ratio (more cinematic)
- On scroll reveal: mask-clip animation from center outward
- Subtle ken-burns zoom on viewport intersection
- Grayscale to color transition on hover

## Background & Atmosphere

**Gradient System:**
- Base: Sophisticated multi-stop radial gradient
  ```
  Primary: #F8F6F4 → #E8E5E1 → #D4CFC8
  Accent mesh: Whisper of warm terracotta (#FFF5F1) and cool sage (#F1F4F3)
  ```
- Gradient shifts 15° rotation per scroll section
- Animated grain texture overlay (10% opacity, subtle motion)
- Floating orbs with blur (200px radius) that parallax at 0.2x speed

**Depth Layers:**
1. Background gradient (slowest parallax)
2. Noise texture (static)
3. Floating orbs (slow drift)
4. Content containers (normal scroll)
5. Typography (slight forward parallax)

## Navigation & Header

**Smart Header Behavior:**
- Starts transparent, becomes frosted glass on scroll (backdrop-blur: 20px)
- Logo scales down (100% → 85%) and moves left smoothly
- Navigation items fade in sequentially
- Search icon morphs to full search bar on click with fluid width animation
- Cart icon shows quantity with bounce animation

## Micro-interactions

**Cursor Enhancement:**
- Custom cursor that scales on interactive elements
- Magnetic effect on CTAs (buttons attract cursor within 40px radius)
- Trail effect with 3 delayed circles (decreasing opacity)

**Loading States:**
- Skeleton screens with shimmer wave animation
- Product images load with blur-up technique
- Staggered content reveal (faster-than-scroll illusion)

## Technical Implementation Stack

**Animation Libraries:**
- GSAP 3.x with ScrollTrigger, ScrollSmoother plugins
- Lenis for buttery smooth scrolling
- Framer Motion for React component animations

**Typography:**
- Primary: SF Pro Display (Apple system) or Inter for web
- Fibonacci scale: 13/21/34/55/89px
- Fluid typography with clamp() for responsive scaling
- Variable font weights (300, 400, 500, 600)

**Color Psychology:**
- Warm neutrals convey approachability + luxury
- Avoid pure black/white (use #1A1816 and #FDFCFB)
- Accent gold: #C9A962 for premium touches
- Interactive blues: #4A5568 for subtle CTAs

## Accessibility & Performance

- Reduced motion fallbacks for users with vestibular disorders
- Intersection Observer for scroll triggers (performance)
- GPU-accelerated transforms (translate3d, scale)
- Lazy loading with blur-up placeholders
- 60fps scroll animations (will-change hints)

---

**The North Star:** Every interaction should feel like unfolding origami—deliberate, satisfying, and revealing something beautiful. The user shouldn't notice the design; they should simply feel that this is the most natural way to explore premium products.

