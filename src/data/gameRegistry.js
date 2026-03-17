import GuessTheNumber from '../components/games/GuessTheNumber/GuessTheNumber';
import CoffeeShopWalk from '../components/games/CoffeeShopWalk/CoffeeShopWalk';
import BrowserHistory from '../components/games/BrowserHistory/BrowserHistory';
import CoffeeQueue from '../components/games/CoffeeQueue/CoffeeQueue';
import NetflixWindow from '../components/games/NetflixWindow/NetflixWindow';
import EmergencyRoom from '../components/games/EmergencyRoom/EmergencyRoom';
import MazeExplorer from '../components/games/MazeExplorer/MazeExplorer';

/**
 * Maps pattern IDs to interactive game components
 * Each game teaches the pattern through a real-world, interactive scenario
 */
export const gameRegistry = {
  'sliding-window': {
    component: NetflixWindow,
    title: 'Netflix Watchlist Window',
    description: 'Find the best viewing window in your Netflix queue using the sliding window pattern',
    difficulty: 'medium',
    learningObjectives: [
      'Understand how to maintain a dynamic window',
      'Practice expanding and contracting windows',
      'See real-time window state changes'
    ]
  },
  'two-pointers': {
    component: CoffeeShopWalk,
    title: 'Coffee Shop Walk',
    description: 'Navigate through coffee shops using two pointers to find the optimal path',
    difficulty: 'easy',
    learningObjectives: [
      'Master the two-pointer technique',
      'Understand pointer movement strategies',
      'Solve problems with O(n) efficiency'
    ]
  },
  'stacks-queues': {
    component: BrowserHistory,
    title: 'Browser History Navigation',
    description: 'Implement browser back/forward functionality using stacks',
    difficulty: 'medium',
    learningObjectives: [
      'Understand Last-In-First-Out (LIFO) operations',
      'Practice stack operations (push, pop, peek)',
      'See how stacks power browser history'
    ]
  },
  'queue': {
    component: CoffeeQueue,
    title: 'Coffee Shop Queue',
    description: 'Manage customer orders using First-In-First-Out queue operations',
    difficulty: 'easy',
    learningObjectives: [
      'Understand First-In-First-Out (FIFO) operations',
      'Practice enqueue and dequeue operations',
      'Learn queue applications in real systems'
    ]
  },
  'binary-search': {
    component: GuessTheNumber,
    title: 'Guess the Number',
    description: 'Find the target number efficiently by repeatedly dividing the search space in half',
    difficulty: 'easy',
    learningObjectives: [
      'Master binary search intuition',
      'Understand logarithmic time complexity',
      'Practice divide-and-conquer thinking'
    ]
  },
  'heaps': {
    component: EmergencyRoom,
    title: 'Emergency Room Priority Queue',
    description: 'Triage patients using a heap-based priority queue to handle the most urgent cases first',
    difficulty: 'hard',
    learningObjectives: [
      'Understand priority queue operations',
      'Learn heap data structure mechanics',
      'See how heaps enable efficient priority-based processing'
    ]
  },
  'graphs': {
    component: MazeExplorer,
    title: 'Maze Explorer (DFS)',
    description: 'Navigate through a maze using Depth-First Search to find the exit path',
    difficulty: 'medium',
    learningObjectives: [
      'Visualize Depth-First Search traversal',
      'Understand recursive exploration',
      'Learn backtracking in graph traversal'
    ]
  },
  'trees': {
    component: MazeExplorer,
    title: 'Tree Traversal Maze',
    description: 'Explore tree structures using DFS traversal patterns',
    difficulty: 'medium',
    learningObjectives: [
      'Practice tree traversal techniques',
      'Understand DFS in tree contexts',
      'Learn about tree exploration strategies'
    ]
  }
};

/**
 * Get game information for a specific pattern
 * @param {string} patternId - The pattern ID to look up
 * @returns {object|null} Game info object or null if no game exists
 */
export function getGameForPattern(patternId) {
  return gameRegistry[patternId] || null;
}

/**
 * Get all available games
 * @returns {Array} Array of [patternId, gameInfo] pairs
 */
export function getAllGames() {
  return Object.entries(gameRegistry);
}

/**
 * Check if a pattern has an associated game
 * @param {string} patternId - The pattern ID to check
 * @returns {boolean} True if game exists
 */
export function hasGame(patternId) {
  return patternId in gameRegistry;
}
