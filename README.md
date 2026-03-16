# 🚀 Coding Interview Revision Platform

A modern, interactive React application for studying and mastering coding interview patterns. Learn algorithms through structured, slide-based presentations with code templates and examples.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-8.0-purple)

## ✨ Features

- 📚 **Comprehensive Pattern Library** - Sliding Window, Two Pointers, Monotonic Stack, Prefix Sum, and more
- 🎯 **Slide-Based Learning** - Each pattern broken down into digestible slides
- ⌨️ **Keyboard Navigation** - Quick navigation with arrow keys and shortcuts
- 🎨 **Beautiful UI** - Clean, modern design with dark mode support
- 💻 **Code Templates** - Ready-to-use implementations for each pattern
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

## 🎯 Current Patterns

### 1. Sliding Window (6 variations)
- Character constraints
- Fixed window length
- Sum constraints
- Product constraints
- Counting patterns

### 2. Two Pointers
- Palindrome checking
- Two sum variations
- Array manipulation

### 3. Monotonic Stack
- Next greater/smaller element
- Daily temperatures problem

### 4. Prefix Sum
- Range sum queries
- Subarray problems

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `↓` | Next pattern |
| `↑` | Previous pattern |
| `Home` | First slide |
| `End` | Last slide |

## 📁 Project Structure

```
src/
├── components/
│   ├── SlideViewer.jsx    # Main slide display
│   ├── SlideViewer.css
│   ├── Sidebar.jsx        # Navigation sidebar
│   └── Sidebar.css
├── data/
│   └── patterns.js        # All pattern data
├── App.jsx                # Main app logic
└── main.jsx              # Entry point
```

## 🎨 Adding New Patterns

Edit `src/data/patterns.js` and add a new pattern object:

```javascript
{
  id: 'pattern-name',
  title: 'Pattern Name',
  slides: [
    {
      title: 'Slide Title',
      concept: 'What this pattern does',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyPoints: ['Point 1', 'Point 2'],
      template: `// Your code template`,
      problems: []
    }
  ]
}
```

## 🔮 Roadmap

- [ ] Add more patterns (Binary Search, DFS/BFS, DP, Backtracking)
- [ ] Practice problems with LeetCode links
- [ ] Progress tracking
- [ ] Personal notes feature
- [ ] Code playground
- [ ] Search functionality
- [ ] Spaced repetition system

## 🛠️ Built With

- [React](https://react.dev/) - UI framework
- [Vite](https://vite.dev/) - Build tool
- CSS Variables - Theming and dark mode

## 📝 Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed project context and architecture.

## 📄 License

MIT

---

**Happy Coding! 🎉** Master those interview patterns!
