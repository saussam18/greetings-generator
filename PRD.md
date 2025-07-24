# Greetings App

A personalized greeting application that welcomes users with contextual messages based on time of day and user preferences.

**Experience Qualities**: 
1. Warm - Creates a welcoming atmosphere with friendly, personalized messages
2. Adaptive - Intelligently adjusts greetings based on time of day and user context  
3. Delightful - Includes subtle animations and thoughtful micro-interactions

**Complexity Level**: Light Application (multiple features with basic state)
- Combines time-based logic, user customization, and persistent preferences with elegant visual presentation

## Essential Features

**Time-Based Greetings**
- Functionality: Displays contextually appropriate greetings (Good morning, afternoon, evening, night)
- Purpose: Creates personal connection by acknowledging the user's current time context
- Trigger: Automatic on app load and updates throughout the day
- Progression: App loads → Detects current time → Displays appropriate greeting → Updates automatically
- Success criteria: Greeting accurately reflects time period and feels natural

**Personalized Messages**
- Functionality: Allows users to set their name and customize greeting preferences
- Purpose: Makes the experience feel personal and tailored to individual users
- Trigger: User clicks personalization button or first-time setup
- Progression: User opens settings → Enters name → Selects preferences → Saves → Sees personalized greeting
- Success criteria: Name persists between sessions and appears in all greetings

**Greeting Customization**
- Functionality: Users can choose from different greeting styles (formal, casual, inspirational)
- Purpose: Accommodates different personality types and moods
- Trigger: User accesses style preferences in settings
- Progression: User opens style menu → Previews options → Selects preferred style → Greeting updates immediately
- Success criteria: Style choice persists and consistently applies to all time-based greetings

## Edge Case Handling

- **Empty Name**: Show friendly default greeting when no name is set
- **Midnight Transitions**: Gracefully handle time changes between greeting periods
- **Invalid Time**: Fallback to general greeting if time detection fails
- **Long Names**: Truncate or wrap very long names elegantly in the display

## Design Direction

The design should feel warm and welcoming like a cozy morning coffee shop - approachable yet refined, with soft curves and gentle animations that create moments of joy without overwhelming the core greeting experience.

## Color Selection

Analogous (adjacent colors on color wheel) - Using warm sunrise colors that transition subtly to create a comforting, natural feeling that mirrors the progression of day to evening.

- **Primary Color**: Warm coral `oklch(0.75 0.15 25)` - Communicates friendliness and energy
- **Secondary Colors**: Soft peach `oklch(0.85 0.08 35)` and warm cream `oklch(0.95 0.04 45)` - Supporting warmth without overwhelming
- **Accent Color**: Golden sunrise `oklch(0.8 0.12 65)` - Attention-grabbing highlight for interactive elements and important CTAs
- **Foreground/Background Pairings**: 
  - Background (Warm Cream #FAF8F5): Dark charcoal text `oklch(0.2 0.02 25)` - Ratio 12.8:1 ✓
  - Card (Soft Peach #F5F0EA): Dark charcoal text `oklch(0.2 0.02 25)` - Ratio 11.2:1 ✓
  - Primary (Warm Coral): White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Accent (Golden Sunrise): Dark brown text `oklch(0.25 0.05 35)` - Ratio 4.7:1 ✓

## Font Selection

Typography should feel friendly and approachable like handwritten notes while maintaining excellent readability - Inter provides the perfect balance of warmth and professionalism.

- **Typographic Hierarchy**: 
  - H1 (Main Greeting): Inter Bold/48px/tight letter spacing
  - H2 (User Name): Inter Medium/32px/normal spacing  
  - Body (Settings/UI): Inter Regular/16px/relaxed line height
  - Caption (Time Display): Inter Light/14px/wide letter spacing

## Animations

Animations should feel like gentle morning sunlight filtering through windows - subtle, purposeful, and enhancing the warm welcoming experience without calling attention to themselves.

- **Purposeful Meaning**: Gentle fade-ins mirror the natural progression of dawn, reinforcing the time-based greeting concept
- **Hierarchy of Movement**: Main greeting gets primary animation focus, with secondary elements following in a cascade that guides the eye naturally

## Component Selection

- **Components**: Card for main greeting display, Button for settings access, Dialog for customization options, Select for style choices, Input for name entry, Badge for time period indicators
- **Customizations**: Custom greeting card with subtle gradient backgrounds, time-aware styling that shifts throughout the day
- **States**: Buttons should have gentle hover elevations, inputs should have warm focus glows, selections should provide satisfying confirmation feedback
- **Icon Selection**: Sun/moon icons for time periods, user icon for personalization, settings gear for options, heart for favorites
- **Spacing**: Generous padding (p-8, p-6) with breathing room, consistent gap-6 between related elements
- **Mobile**: Single column layout with touch-friendly spacing, collapsible settings panel, optimized text sizing for readability