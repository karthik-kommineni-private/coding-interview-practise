# Quick Reference Guide

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# View the app
open http://localhost:5174
```

## File Locations

### Data
- **All patterns**: `src/data/patterns.js`

### Components
- **Main app**: `src/App.jsx`
- **Slide viewer**: `src/components/SlideViewer.jsx`
- **Sidebar**: `src/components/Sidebar.jsx`

### Styles
- **Global styles**: `src/index.css`
- **App layout**: `src/App.css`
- **Slide styles**: `src/components/SlideViewer.css`
- **Sidebar styles**: `src/components/Sidebar.css`

### Documentation
- **User README**: `README.md`
- **AI Context**: `CLAUDE.md`
- **This file**: `.claude/QUICK_REFERENCE.md`

## Adding Content

### Add a new pattern
1. Open `src/data/patterns.js`
2. Add to the `patterns` array
3. Save (hot reload will update UI)

### Add a new slide to existing pattern
1. Open `src/data/patterns.js`
2. Find the pattern object
3. Add to the `slides` array

### Add practice problems
```javascript
problems: [
  {
    name: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy'
  }
]
```

## Pattern Template

```javascript
{
  id: 'unique-id',
  title: 'Pattern Name',
  slides: [
    {
      title: 'Slide Title',
      concept: 'Brief explanation',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyPoints: [
        'Important point 1',
        'Important point 2',
        'Important point 3'
      ],
      template: `function patternName(arr) {
  // Your code here
  return result;
}`,
      problems: [
        {
          name: 'Problem Name',
          link: 'https://leetcode.com/...',
          difficulty: 'Medium'
        }
      ]
    }
  ]
}
```

## Styling Tips

### CSS Variables (in `src/index.css`)
```css
--accent          # Purple accent color
--text            # Body text
--text-h          # Heading text
--bg              # Background
--border          # Border color
--code-bg         # Code background
--accent-bg       # Light purple background
--accent-border   # Purple border
```

### Dark Mode
Automatically handled via `@media (prefers-color-scheme: dark)`

## Common Tasks

### Change accent color
Edit `--accent` in `src/index.css`:
```css
:root {
  --accent: #YOUR_COLOR;
}
```

### Add a new keyboard shortcut
Edit the `handleKeyPress` function in `src/App.jsx`

### Modify navigation behavior
Check `nextSlide`, `prevSlide`, `nextPattern`, `prevPattern` in `src/App.jsx`

## Troubleshooting

### Port already in use
Vite will automatically try the next port (5173 → 5174 → 5175...)

### CSS not updating
1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Clear Vite cache: `rm -rf node_modules/.vite`

### Component not rendering
1. Check browser console for errors
2. Verify data structure in `patterns.js`
3. Check component props in `App.jsx`

## Best Practices

### When adding patterns:
- ✅ Use descriptive slide titles
- ✅ Include time/space complexity
- ✅ Add 3-5 key points per slide
- ✅ Provide working code examples
- ✅ Use consistent code formatting

### When writing code templates:
- ✅ Use clear variable names
- ✅ Add comments for complex logic
- ✅ Keep examples focused and minimal
- ✅ Test code before adding

### When organizing content:
- ✅ Group related patterns together
- ✅ Order from simple to complex
- ✅ Each slide should cover one concept
- ✅ Use multiple slides for complex patterns

## Performance Tips

- Each pattern is lazy-loaded (no performance impact from adding more)
- Code blocks are rendered as plain text (no syntax highlighting library needed)
- Navigation is handled in state (no page reloads)
- CSS uses hardware-accelerated properties for animations

## Future AI Assistants

When working with this project:
1. Read `CLAUDE.md` for full project context
2. Check `src/data/patterns.js` for current content
3. Follow the existing data structure when adding patterns
4. Maintain consistent styling with existing components
5. Test navigation after making changes
