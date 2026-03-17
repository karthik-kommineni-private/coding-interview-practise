# Source Code Structure

This document explains the organization of the codebase following React industry standards.

## Directory Structure

```
src/
├── main.jsx                    # Application entry point
├── App.jsx                     # Root component with routing logic
├── App.css                     # Root component styles
│
├── styles/                     # Global styles
│   └── index.css              # Global CSS variables & base styles
│
├── components/                 # Reusable components organized by feature
│   ├── layout/                # Layout components
│   │   └── Sidebar/           # Navigation sidebar
│   │       ├── Sidebar.jsx
│   │       ├── Sidebar.css
│   │       └── index.js       # Barrel export
│   │
│   ├── code/                  # Code display components
│   │   ├── CodeBlock/         # Basic code block
│   │   ├── CodeBlockAnnotated/ # Code with annotations
│   │   ├── CodeBlockComplexity/ # Code with complexity info
│   │   ├── CodeBlockFlow/     # Code with execution flow
│   │   └── CodeBlockHybrid/   # Combined code display
│   │
│   ├── zen/                   # Peaceful/focus features
│   │   ├── AmbientSound/      # Background ambient sounds
│   │   ├── BackgroundPattern/ # Animated background patterns
│   │   ├── BreathingExercise/ # Guided breathing animation
│   │   ├── MatrixRain/        # Matrix-style background effect
│   │   ├── PomodoroTimer/     # Focus timer
│   │   └── ZenSettings/       # Settings panel for zen features
│   │
│   ├── games/                 # Interactive learning games
│   │   ├── BrowserHistory/    # Stack pattern game
│   │   ├── CoffeeQueue/       # Queue pattern game
│   │   ├── CoffeeShopWalk/    # Two pointers game
│   │   ├── EmergencyRoom/     # Priority queue game
│   │   ├── GuessTheNumber/    # Binary search game
│   │   ├── MazeExplorer/      # DFS/BFS game
│   │   └── NetflixWindow/     # Sliding window game
│   │
│   ├── AlgorithmVisualizer.jsx  # Algorithm visualization
│   └── CodePractice.jsx          # Code practice component
│
├── pages/                     # Page-level components
│   ├── HomePage/              # Landing page with pattern categories
│   │   ├── HomePage.jsx
│   │   └── HomePage.css
│   │
│   ├── SlideViewer/           # Pattern slide viewer
│   │   ├── SlideViewer.jsx
│   │   └── SlideViewer.css
│   │
│   └── TestPage/              # Interactive games page
│       ├── TestPage.jsx
│       └── TestPage.css
│
├── data/                      # Static data and constants
│   └── patterns.js            # All coding patterns data
│
└── assets/                    # Static assets
    └── sounds/                # Audio files for ambient sounds
        └── README.md          # Instructions for adding sounds
```

## Design Principles

### 1. Component Co-location
Each component lives in its own folder with all related files:
- Component file (`.jsx`)
- Styles (`.css`)
- Barrel export (`index.js`)

**Benefits:**
- Easy to find everything related to a component
- Simple to move or delete components
- Clear ownership and boundaries

### 2. Feature-Based Organization
Components are grouped by their domain/feature:
- `layout/` - Structure and navigation
- `code/` - Code display variants
- `zen/` - Focus and wellness features
- `games/` - Interactive learning

**Benefits:**
- Logical grouping makes navigation intuitive
- Easier to onboard new developers
- Natural place for new features

### 3. Pages vs Components
- **Pages** (`pages/`): Route-level components that compose other components
- **Components** (`components/`): Reusable building blocks

**Benefits:**
- Clear separation of concerns
- Easier to manage routing
- Components are more reusable

### 4. Barrel Exports
Each component folder includes an `index.js`:
```js
export { default } from './ComponentName';
```

**Benefits:**
- Cleaner imports: `from '../../components/zen/MatrixRain'` instead of `'../../components/zen/MatrixRain/MatrixRain'`
- Flexibility to export multiple items from one folder
- Standard pattern in React community

## Import Patterns

### Absolute vs Relative Imports

**Current approach (Relative):**
```jsx
import MatrixRain from '../../components/zen/MatrixRain';
```

**Future enhancement (Absolute with path aliases):**
```jsx
// Add to vite.config.js:
// resolve: { alias: { '@': '/src' } }
import MatrixRain from '@/components/zen/MatrixRain';
```

### Component Import Examples

```jsx
// Pages
import HomePage from './pages/HomePage/HomePage';
import SlideViewer from './pages/SlideViewer/SlideViewer';

// Layout
import Sidebar from './components/layout/Sidebar';

// Code components
import CodeBlock from './components/code/CodeBlock';

// Zen features
import AmbientSound from './components/zen/AmbientSound';
import PomodoroTimer from './components/zen/PomodoroTimer';

// Games
import GuessTheNumber from './components/games/GuessTheNumber/GuessTheNumber';
```

## Adding New Components

### Creating a New Component

1. **Choose the right location:**
   - Reusable UI → `components/`
   - Page-level → `pages/`
   - Feature-specific → appropriate subfolder

2. **Create folder structure:**
   ```bash
   mkdir -p src/components/feature/NewComponent
   cd src/components/feature/NewComponent
   touch NewComponent.jsx NewComponent.css index.js
   ```

3. **Create barrel export** (`index.js`):
   ```js
   export { default } from './NewComponent';
   ```

4. **Import and use:**
   ```jsx
   import NewComponent from './components/feature/NewComponent';
   ```

### Example: Adding a New Zen Feature

```bash
# 1. Create folder
mkdir -p src/components/zen/SoundscapePlayer

# 2. Create files
touch src/components/zen/SoundscapePlayer/SoundscapePlayer.jsx
touch src/components/zen/SoundscapePlayer/SoundscapePlayer.css
touch src/components/zen/SoundscapePlayer/index.js

# 3. Add barrel export
echo "export { default } from './SoundscapePlayer';" > src/components/zen/SoundscapePlayer/index.js

# 4. Use in HomePage
import SoundscapePlayer from '../../components/zen/SoundscapePlayer';
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `AmbientSound.jsx`)
- **Styles**: Match component name (e.g., `AmbientSound.css`)
- **Utilities**: camelCase (e.g., `formatTime.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)
- **Data files**: camelCase (e.g., `patterns.js`)

## Best Practices

### Do ✅
- Keep components focused and single-purpose
- Co-locate related files (JSX + CSS)
- Use barrel exports for cleaner imports
- Group by feature/domain, not by file type
- Document complex logic with comments

### Don't ❌
- Mix page and component logic
- Create deeply nested folder structures (max 3-4 levels)
- Have circular dependencies
- Put business logic in components (extract to utilities)
- Duplicate code across components (create shared utilities)

## Migration Checklist

When moving components:
- [ ] Move `.jsx` file to new location
- [ ] Move `.css` file to new location
- [ ] Create `index.js` barrel export
- [ ] Update all imports in files that use the component
- [ ] Test the application
- [ ] Update documentation

## Future Improvements

### Path Aliases
Configure Vite/Webpack to use absolute imports:
```js
// vite.config.js
export default {
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
    }
  }
}
```

### Shared Component Library
Extract common components:
```
components/
  ui/                 # Generic UI components
    Button/
    Modal/
    Tooltip/
```

### Utilities and Hooks
Add dedicated folders:
```
utils/               # Pure utility functions
  formatTime.js
  localStorage.js

hooks/               # Custom React hooks
  useLocalStorage.js
  useKeyboardNav.js
```

## Resources

- [React File Structure Best Practices](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy)
- [Component Co-location](https://kentcdodds.com/blog/colocation)
- [Feature-based Organization](https://dev.to/bnevilleoneill/structuring-your-react-application-3kl1)
