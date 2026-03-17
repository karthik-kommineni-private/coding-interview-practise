import './TestPage.css';
import GuessTheNumber from '../../components/games/GuessTheNumber/GuessTheNumber';
import CoffeeShopWalk from '../../components/games/CoffeeShopWalk/CoffeeShopWalk';
import BrowserHistory from '../../components/games/BrowserHistory/BrowserHistory';
import CoffeeQueue from '../../components/games/CoffeeQueue/CoffeeQueue';
import NetflixWindow from '../../components/games/NetflixWindow/NetflixWindow';
import EmergencyRoom from '../../components/games/EmergencyRoom/EmergencyRoom';
import MazeExplorer from '../../components/games/MazeExplorer/MazeExplorer';

function TestPage({ onBack }) {
  return (
    <div className="test-page">
      <header className="test-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <div className="test-title-section">
          <h1 className="test-title">🎮 Interactive Pattern Games</h1>
          <p className="test-subtitle">
            Learn algorithm patterns through real-life examples and interactive games!
          </p>
          <p className="test-note">
            Each game maps an algorithm pattern to a relatable, everyday scenario to make learning intuitive and memorable.
          </p>
          <div className="integration-note">
            💡 <strong>Tip:</strong> These games are also available directly in their corresponding pattern slides on the home page!
            Learn the theory first, then practice with the game.
          </div>
        </div>
      </header>

      <div className="test-content">
        {/* Game 1: Binary Search */}
        <section className="game-section" id="guess-number">
          <div className="section-header">
            <h2 className="section-title">1️⃣ Binary Search: Guess the Number ⭐</h2>
            <p className="section-description">
              Learn binary search by guessing a number. See how you eliminate half the possibilities with each guess!
            </p>
          </div>
          <GuessTheNumber />
        </section>

        {/* Game 2: Two Pointers */}
        <section className="game-section" id="coffee-walk">
          <div className="section-header">
            <h2 className="section-title">2️⃣ Two Pointers: Walking to Coffee Shop ⭐⭐</h2>
            <p className="section-description">
              You and a friend walk from opposite ends of a street. Find the perfect meeting spot using two pointers!
            </p>
          </div>
          <CoffeeShopWalk />
        </section>

        {/* Game 3: Stack */}
        <section className="game-section" id="browser-history">
          <div className="section-header">
            <h2 className="section-title">3️⃣ Stack (LIFO): Browser History ⭐⭐</h2>
            <p className="section-description">
              Navigate between web pages and use the back button. See how stacks work with Last In, First Out!
            </p>
          </div>
          <BrowserHistory />
        </section>

        {/* Game 4: Queue */}
        <section className="game-section" id="coffee-queue">
          <div className="section-header">
            <h2 className="section-title">4️⃣ Queue (FIFO): Coffee Shop Line ⭐⭐</h2>
            <p className="section-description">
              Manage a coffee shop queue. First customer in line is first to be served - that's First In, First Out!
            </p>
          </div>
          <CoffeeQueue />
        </section>

        {/* Game 5: Sliding Window */}
        <section className="game-section" id="netflix-window">
          <div className="section-header">
            <h2 className="section-title">5️⃣ Sliding Window: Netflix Watchlist ⭐⭐⭐</h2>
            <p className="section-description">
              You have 3 hours to binge-watch shows. Find the maximum number of shows you can watch using sliding window!
            </p>
          </div>
          <NetflixWindow />
        </section>

        {/* Game 6: Heap */}
        <section className="game-section" id="emergency-room">
          <div className="section-header">
            <h2 className="section-title">6️⃣ Heap (Priority Queue): Emergency Room ⭐⭐⭐⭐</h2>
            <p className="section-description">
              Manage an ER where the most critical patient is always treated first, regardless of arrival order!
            </p>
          </div>
          <EmergencyRoom />
        </section>

        {/* Game 7: DFS */}
        <section className="game-section" id="maze-explorer">
          <div className="section-header">
            <h2 className="section-title">7️⃣ DFS (Depth-First Search): Maze Explorer ⭐⭐⭐⭐</h2>
            <p className="section-description">
              Navigate through a maze to find treasure. Go deep down paths and backtrack when you hit dead ends!
            </p>
          </div>
          <MazeExplorer />
        </section>
      </div>

      <footer className="test-footer">
        <div className="footer-content">
          <h3>🎯 What's Next?</h3>
          <p>
            These are interactive prototypes to help you learn algorithm patterns through real-life examples.
            Try each game and see which patterns make the most sense to you!
          </p>
          <div className="pattern-summary">
            <h4>Patterns Covered:</h4>
            <ul>
              <li>🎯 <strong>Binary Search</strong> - Eliminate half each time (finding pages in a book)</li>
              <li>☕ <strong>Two Pointers</strong> - Move from both ends toward middle (two people meeting)</li>
              <li>🌐 <strong>Stack (LIFO)</strong> - Last in, first out (browser back button, undo)</li>
              <li>☕ <strong>Queue (FIFO)</strong> - First in, first out (waiting in line)</li>
              <li>📺 <strong>Sliding Window</strong> - Expand/shrink range (time-limited binge watching)</li>
              <li>🏥 <strong>Heap (Priority Queue)</strong> - Always serve highest priority (ER triage)</li>
              <li>🗺️ <strong>DFS</strong> - Go deep then backtrack (maze exploration)</li>
            </ul>
          </div>
          <p className="footer-note">
            Each game uses everyday scenarios to help you understand when and how to use these patterns in coding interviews!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TestPage;
