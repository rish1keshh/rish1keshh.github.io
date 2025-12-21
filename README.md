# Cybersecurity Portfolio - Blue Team Fortress

A modern, interactive portfolio website designed for cybersecurity professionals with a focus on Blue Team operations, defense, and security engineering. Built with React and Tailwind CSS.

## Theme & Design Philosophy

This portfolio embraces a **Blue Team Fortress** aesthetic - professional, trustworthy, and corporate-ready. The design focuses on:

- **Defense & Structure**: Emphasizing protection and stability
- **Analytical Approach**: Clean, organized information architecture
- **Corporate Ready**: Professional appearance suitable for security engineering roles
- **Interactive Elements**: Engaging animations inspired by security operations

### Visual Elements

- **Shapes**: Hexagons and shields symbolizing structure and protection
- **Colors**: Deep Navy Blue (#0A192F) with Electric Blue (#64FFDA) accents
- **Effects**: Glassmorphism cards with frosted glass aesthetics
- **Animations**: Subtle radar sweeps, floating hexagons, and smooth transitions
- **Inspiration**: Incorporates puzzle-like elements inspired by Rubik's Cube and Sudoku

## Features

### Sections

1. **Summary** - Personal introduction, core competencies, and key skills
2. **Education** - Academic background with coursework details
3. **Work Experience** - Professional experience and internships
4. **Projects** - Cybersecurity projects with technologies and highlights
5. **Certifications** - Professional certifications and credentials
6. **Extra-Curriculars** - Hobbies, interests, and activities (Rubik's Cube, Sudoku, clubs)

### Interactive Components

- **Navigation**: Smooth scroll navigation with active section highlighting
- **Glassmorphism Cards**: Frosted glass effect with hover interactions
- **Animated Radar**: Rotating radar sweep visualization
- **Floating Hexagons**: Animated hexagonal shapes in background
- **Puzzle Grid**: Interactive 3x3 grid with hover effects
- **Smooth Transitions**: All sections feature smooth scroll behavior

### Technical Features

- Fully responsive design (mobile, tablet, desktop)
- Reusable React components
- Tailwind CSS for styling
- Custom animations and transitions
- Optimized performance with Vite
- Clean, maintainable code structure

## Project Structure

```
cybersecurity-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx       # Styled button component
│   │   ├── Card.jsx         # Glassmorphism card component
│   │   ├── Section.jsx      # Section wrapper component
│   │   ├── Navigation.jsx   # Navigation bar
│   │   ├── ShieldIcon.jsx   # Shield SVG icon
│   │   ├── HexagonGrid.jsx  # Animated hexagon background
│   │   ├── RadarSweep.jsx   # Animated radar component
│   │   └── PuzzleGrid.jsx   # Interactive puzzle grid
│   ├── sections/            # Page sections
│   │   ├── Summary.jsx
│   │   ├── Education.jsx
│   │   ├── WorkExperience.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   └── ExtraCurriculars.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles & Tailwind
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**

```bash
cd cybersecurity-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization Guide

### Adding Your Content

1. **Summary Section** (`src/sections/Summary.jsx`)
   - Update the personal introduction text
   - Modify the skills array to match your competencies
   - Update button links for resume and contact

2. **Education Section** (`src/sections/Education.jsx`)
   - Edit the `educationData` array with your academic background
   - Add coursework, GPA, and dates

3. **Work Experience** (`src/sections/WorkExperience.jsx`)
   - Update the `experiences` array with your professional background
   - Add achievements, technologies used, and dates

4. **Projects** (`src/sections/Projects.jsx`)
   - Modify the `projects` array with your cybersecurity projects
   - Add GitHub links, demo links, and project highlights

5. **Certifications** (`src/sections/Certifications.jsx`)
   - Update `certifications` array with your credentials
   - Add certifications in progress to the `inProgress` array

6. **Extra-Curriculars** (`src/sections/ExtraCurriculars.jsx`)
   - Customize activities, hobbies, and interests
   - Update stats and transferable skills

### Styling Customization

**Colors** - Edit `tailwind.config.js`:
```javascript
colors: {
  'navy-dark': '#0A192F',      // Primary background
  'electric-blue': '#64FFDA',  // Accent color
  // Add more custom colors
}
```

**Animations** - Modify animation speeds in `tailwind.config.js`:
```javascript
animation: {
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'radar-sweep': 'radar 4s linear infinite',
}
```

**Glassmorphism Effect** - Adjust in `src/index.css`:
```css
.glass {
  @apply bg-white/5 backdrop-blur-lg border border-white/10;
}
```

### Adding New Sections

1. Create a new component in `src/sections/YourSection.jsx`
2. Import and use the `Section`, `Card`, and other components
3. Import your section in `src/App.jsx`
4. Add it to the main content area
5. Add a navigation item in `src/components/Navigation.jsx`

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism effects and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Lazy loading for images (implement as needed)
- Optimized animations using CSS transforms
- Minimal dependencies
- Fast builds with Vite

## Future Enhancements

Consider adding:
- Dark/light theme toggle
- Blog section for security writeups
- Contact form with email integration
- CTF achievements timeline
- Terminal widget for interactive commands
- More puzzle-inspired interactive elements

## License

This project is open source and available for personal use.

## Credits

Design inspired by cybersecurity operations centers, puzzle mechanics, and modern glassmorphism UI trends.

---

**Note**: Remember to replace all placeholder content with your actual information before deploying!
