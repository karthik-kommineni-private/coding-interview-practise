# Coding Interview Revision Platform

## Project Overview
This is a **React-based revision platform** for organizing and studying coding interview patterns. It's designed to help developers prepare for technical interviews by providing structured, slide-based content on common algorithm patterns.

## What We're Building
A comprehensive, interactive learning platform that presents coding patterns in a presentation-style format with:
- Slide-based navigation for each pattern
- Code templates and examples
- Multiple variations of each pattern
- Keyboard shortcuts for quick navigation
- Clean, professional UI with dark mode support

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: CSS with CSS variables (supports light/dark mode)
- **Language**: JavaScript (JSX)
- **Development Server**: Vite dev server
- **Port**: http://localhost:5174/ (or 5173)

## Project Structure
```
src/
├── App.jsx                 # Main app component with navigation logic
├── App.css                 # App layout styles
├── index.css               # Global styles and CSS variables
├── main.jsx               # React entry point
├── data/
│   └── patterns.js        # All coding patterns data
└── components/
    ├── SlideViewer.jsx    # Displays pattern slides with code/examples
    ├── SlideViewer.css    # Slide viewer styling
    ├── Sidebar.jsx        # Navigation sidebar
    └── Sidebar.css        # Sidebar styling
```

## Data Structure

### Pattern Object Format
```javascript
{
  id: 'pattern-id',           // Unique identifier
  title: 'Pattern Name',       // Display name
  slides: [                    // Array of slides
    {
      title: 'Slide Title',
      concept: 'What this pattern does',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyPoints: [             // Array of bullet points
        'Key point 1',
        'Key point 2'
      ],
      template: `code template`, // Code example (string)
      problems: []             // Array of practice problems (optional)
    }
  ]
}
```

## Current Patterns (Extracted from PowerPoint)

### 1. Sliding Window (6 slides)
- Overview of 5 variations
- Variation 1: Character constraint (no duplicate characters)
- Variation 2: Fixed window length (subarray of size k)
- Variation 3: Sum constraint (sum <= k)
- Variation 4: Product constraint (counting subarrays)
- Variation 5: Number constraint (at most k occurrences)

### 2. Two Pointers (3 slides)
- General pattern overview
- Example 1: Palindrome check
- Example 2: Two sum on sorted array

### 3. Monotonic Stack (2 slides)
- General pattern overview
- Example: Daily temperatures problem

### 4. Prefix Sum (2 slides)
- General pattern overview
- Class-based implementation

## Features Implemented

### Navigation
- ✅ Keyboard navigation (arrows, space, home, end)
- ✅ Click navigation via sidebar
- ✅ Slide counter showing progress
- ✅ Next/Previous buttons

### UI/UX
- ✅ Responsive design (mobile + desktop)
- ✅ Dark mode support (auto-detects system preference)
- ✅ Syntax-highlighted code blocks
- ✅ Color-coded sections (concept, complexity, key points, template)
- ✅ Smooth transitions and hover effects

### Content Display
- ✅ Pattern title and slide counter
- ✅ Concept explanation
- ✅ Time/space complexity badges
- ✅ Key points with checkmarks
- ✅ Code templates in monospace font
- ✅ Practice problems section (ready for links)

## How to Run
```bash
npm install          # Install dependencies
npm run dev          # Start development server
```
Access at: http://localhost:5174/

## Source Material
Patterns were extracted from: `/Users/kakomminen/Desktop/coding_patterns_grouped.pptx`

The PowerPoint contained:
- 15 slides total
- 4 main pattern categories
- Images with code examples and explanations
- NeetCode branding (coding interview prep content)

## Future Enhancements (Planned)

### Content
- [ ] Add more patterns (Binary Search, DFS/BFS, Dynamic Programming, Backtracking, Graphs, Trees, Heaps)
- [ ] Add LeetCode/HackerRank problem links to each pattern
- [ ] Add difficulty ratings (Easy/Medium/Hard)
- [ ] Add real interview questions for each pattern
- [ ] Add visual diagrams/animations for patterns

### Features
- [ ] Search functionality across all patterns
- [ ] Progress tracking (mark patterns as learned/reviewed)
- [ ] Personal notes feature for each slide
- [ ] Favorites/bookmarks system
- [ ] Export notes as markdown/PDF
- [ ] Practice mode with random problems
- [ ] Spaced repetition system
- [ ] Code playground to test templates
- [ ] Multiple themes (not just dark/light)

### Technical
- [ ] Add TypeScript for better type safety
- [ ] Add unit tests
- [ ] Add local storage for user preferences
- [ ] Add analytics to track study patterns
- [ ] PWA support for offline access
- [ ] Mobile app version

## Design System

### Colors (CSS Variables)
- `--accent`: Primary purple color (#aa3bff / #c084fc)
- `--text`: Body text color
- `--text-h`: Heading text color
- `--bg`: Background color
- `--border`: Border color
- `--code-bg`: Code block background
- `--accent-bg`: Accent background (transparent purple)
- `--accent-border`: Accent border color

### Fonts
- `--sans`: System UI fonts for body text
- `--heading`: System UI fonts for headings
- `--mono`: Monospace fonts for code

## Keyboard Shortcuts
- `→` or `Space`: Next slide
- `←`: Previous slide
- `↓`: Next pattern/topic
- `↑`: Previous pattern/topic
- `Home`: Jump to first slide of current pattern
- `End`: Jump to last slide of current pattern

## Common Tasks

### Adding a New Pattern
1. Open `src/data/patterns.js`
2. Add new pattern object to the array
3. Follow the data structure format above
4. Save and the UI will auto-update

### Adding Practice Problems
```javascript
problems: [
  {
    name: 'Problem Name',
    link: 'https://leetcode.com/problems/...',
    difficulty: 'Easy' // 'Easy', 'Medium', or 'Hard'
  }
]
```

### Modifying Styles
- Global styles: `src/index.css`
- Layout: `src/App.css`
- Sidebar: `src/components/Sidebar.css`
- Slide viewer: `src/components/SlideViewer.css`

## Notes for Future Sessions
- All coding patterns are stored in `src/data/patterns.js` as a JavaScript array
- Each pattern can have multiple slides (like a presentation)
- The platform uses a presentation-style navigation model
- Design follows modern web app conventions with clean, minimal UI
- Code examples use JavaScript/Python syntax
- Focus is on interview preparation, not production code
