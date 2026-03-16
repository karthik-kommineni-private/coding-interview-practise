import { useState, useEffect } from 'react';
import './HomePage.css';
import MatrixRain from './MatrixRain';
import BreathingExercise from './BreathingExercise';
import AmbientSound from './AmbientSound';
import BackgroundPattern from './BackgroundPattern';
import PomodoroTimer from './PomodoroTimer';
import ZenSettings from './ZenSettings';

function HomePage({ patterns, onPatternSelect, onViewTest }) {
  const [showBreathing, setShowBreathing] = useState(false);
  const [backgroundPattern, setBackgroundPattern] = useState('none');
  const [matrixEnabled, setMatrixEnabled] = useState(true);

  // Load background pattern preference
  useEffect(() => {
    const savedPattern = localStorage.getItem('backgroundPattern');
    const savedMatrix = localStorage.getItem('matrixEnabled');

    if (savedPattern) setBackgroundPattern(savedPattern);
    if (savedMatrix !== null) setMatrixEnabled(savedMatrix === 'true');
  }, []);
  // Group patterns by category
  const categories = [
    {
      name: 'Arrays & Strings',
      patterns: [
        { index: 0, name: 'Sliding Window', subTopics: ['Character Constraint', 'Length Constraint', 'Sum Constraint', 'Product Constraint', 'Number Constraint'] },
        { index: 1, name: 'Two Pointers', subTopics: ['Opposite Direction', 'Same Direction', 'Palindrome Check', 'Two Sum'] },
        { index: 4, name: 'Prefix Sum', subTopics: ['Range Sum', 'Subarray Sum', 'Class-Based'] }
      ]
    },
    {
      name: 'Linked Lists',
      patterns: [
        { index: 6, name: 'Fast & Slow Pointers', subTopics: ['Cycle Detection', 'Middle Node', 'Palindrome'] },
        { index: 6, name: 'Reverse Linked List', subTopics: ['Iterative', 'Recursive', 'Reverse in Groups'] },
        { index: 6, name: 'Merge Lists', subTopics: ['Merge Two Lists', 'Merge K Lists'] }
      ]
    },
    {
      name: 'Stacks & Queues',
      patterns: [
        { index: 2, name: 'Monotonic Stack', subTopics: ['Next Greater', 'Next Smaller', 'Daily Temperatures'] },
        { index: 2, name: 'Stack Problems', subTopics: ['Valid Parentheses', 'Min Stack', 'Evaluate Expression'] }
      ]
    },
    {
      name: 'Trees',
      patterns: [
        { index: 7, name: 'DFS Traversal', subTopics: ['Inorder', 'Preorder', 'Postorder'] },
        { index: 7, name: 'BFS Traversal', subTopics: ['Level Order', 'Zigzag', 'Right Side View'] },
        { index: 7, name: 'Path Problems', subTopics: ['Path Sum', 'Max Path Sum', 'Lowest Common Ancestor'] }
      ]
    },
    {
      name: 'Graphs',
      patterns: [
        { index: 8, name: 'DFS & BFS', subTopics: ['Connected Components', 'Shortest Path', 'Islands'] },
        { index: 8, name: 'Topological Sort', subTopics: ['Kahn\'s Algorithm', 'Course Schedule'] },
        { index: 8, name: 'Union Find', subTopics: ['Disjoint Sets', 'Cycle Detection'] }
      ]
    },
    {
      name: 'Dynamic Programming',
      patterns: [
        { index: 9, name: '1D DP', subTopics: ['Climbing Stairs', 'House Robber', 'Coin Change'] },
        { index: 9, name: '2D DP', subTopics: ['Unique Paths', 'LCS', 'Edit Distance'] },
        { index: 9, name: 'Knapsack', subTopics: ['0/1 Knapsack', 'Unbounded', 'Partition'] }
      ]
    },
    {
      name: 'Backtracking',
      patterns: [
        { index: 10, name: 'Combinations', subTopics: ['Combinations', 'Combination Sum'] },
        { index: 10, name: 'Permutations', subTopics: ['Permutations', 'Next Permutation'] },
        { index: 10, name: 'Subsets', subTopics: ['Subsets', 'Subsets with Duplicates'] }
      ]
    },
    {
      name: 'Heaps',
      patterns: [
        { index: 11, name: 'Top K Elements', subTopics: ['Kth Largest', 'K Frequent', 'K Closest'] },
        { index: 11, name: 'Merge K', subTopics: ['Merge K Lists', 'Smallest Range'] },
        { index: 11, name: 'Median', subTopics: ['Find Median', 'Sliding Window Median'] }
      ]
    },
    {
      name: 'Binary Search',
      patterns: [
        { index: 5, name: 'Classic Binary Search', subTopics: ['Basic Search', 'Left-most', 'Right-most'] },
        { index: 5, name: 'Search in Rotated', subTopics: ['Rotated Array', 'Find Minimum'] },
        { index: 5, name: 'Search Range', subTopics: ['Range Search', 'Binary Answer'] }
      ]
    },
    {
      name: 'Advanced',
      patterns: [
        { index: 12, name: 'Tries', subTopics: ['Insert', 'Search', 'Prefix Search', 'Word Dictionary'] },
        { index: 13, name: 'Intervals', subTopics: ['Merge Intervals', 'Insert Interval', 'Meeting Rooms'] }
      ]
    }
  ];

  return (
    <div className="home-page">
      {showBreathing && <BreathingExercise onComplete={() => setShowBreathing(false)} />}

      {/* Zen Features */}
      <button
        className="breathing-trigger-btn"
        onClick={() => setShowBreathing(true)}
        title="Take a mindful breath"
      >
        🌿
      </button>

      <AmbientSound />
      <PomodoroTimer />
      <ZenSettings
        currentPattern={backgroundPattern}
        onPatternChange={setBackgroundPattern}
      />

      {/* Background Effects */}
      {matrixEnabled && <MatrixRain />}
      <BackgroundPattern pattern={backgroundPattern} opacity={0.15} />
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Coding Interview Patterns</h1>
            <p className="page-subtitle">{patterns.length} patterns • {patterns.reduce((acc, p) => acc + p.slides.length, 0)} slides</p>
          </div>
          {onViewTest && (
            <button className="test-page-button" onClick={onViewTest}>
              🎨 View Code Styles Test
            </button>
          )}
        </div>
      </header>

      <div className="categories-grid">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="category-section">
            <h2 className="category-title">{category.name}</h2>
            <div className="category-card">
              <div className="patterns-list">
                {category.patterns.map((pattern, idx) => (
                  <button
                    key={idx}
                    className="pattern-block"
                    onClick={() => onPatternSelect(pattern.index)}
                  >
                    <span className="pattern-block-name">{pattern.name}</span>
                    {pattern.subTopics && pattern.subTopics.length > 0 && (
                      <span className="pattern-block-count">
                        {pattern.subTopics.length} variations
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
