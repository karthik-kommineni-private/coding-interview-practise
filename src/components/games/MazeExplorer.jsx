import { useState } from 'react';
import './games.css';

export default function MazeExplorer() {
  const GRID_SIZE = 6;
  const TREASURE_POS = { row: 5, col: 5 };

  const initialMaze = [
    [1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1]
  ];

  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });
  const [visited, setVisited] = useState(new Set(['0,0']));
  const [path, setPath] = useState([{ row: 0, col: 0 }]);
  const [found, setFound] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const [explorationLog, setExplorationLog] = useState(['Started at (0,0)']);

  const addLog = (message) => {
    setExplorationLog(prev => [...prev, message]);
  };

  const isValid = (row, col) => {
    return (
      row >= 0 &&
      row < GRID_SIZE &&
      col >= 0 &&
      col < GRID_SIZE &&
      initialMaze[row][col] === 1
    );
  };

  const isVisited = (row, col) => {
    return visited.has(`${row},${col}`);
  };

  const isTreasure = (row, col) => {
    return row === TREASURE_POS.row && col === TREASURE_POS.col;
  };

  const move = (direction) => {
    if (found || isExploring) return;

    const directions = {
      up: { row: -1, col: 0 },
      down: { row: 1, col: 0 },
      left: { row: 0, col: -1 },
      right: { row: 0, col: 1 }
    };

    const delta = directions[direction];
    const newRow = currentPos.row + delta.row;
    const newCol = currentPos.col + delta.col;

    if (!isValid(newRow, newCol)) {
      addLog(`❌ Can't move ${direction} - wall or out of bounds!`);
      return;
    }

    if (isVisited(newRow, newCol)) {
      addLog(`⚠️ Already visited (${newRow},${newCol})`);
      return;
    }

    // Valid move
    setCurrentPos({ row: newRow, col: newCol });
    const newVisited = new Set(visited);
    newVisited.add(`${newRow},${newCol}`);
    setVisited(newVisited);
    setPath([...path, { row: newRow, col: newCol }]);

    if (isTreasure(newRow, newCol)) {
      addLog(`🎉 Treasure found at (${newRow},${newCol})!`);
      setFound(true);
    } else {
      addLog(`✅ Moved ${direction} to (${newRow},${newCol})`);
    }
  };

  const backtrack = () => {
    if (path.length <= 1 || found || isExploring) return;

    const newPath = [...path];
    newPath.pop(); // Remove current position

    const previousPos = newPath[newPath.length - 1];
    setCurrentPos(previousPos);
    setPath(newPath);

    addLog(`⬅️ Backtracked to (${previousPos.row},${previousPos.col})`);
  };

  const autoSolveDFS = async () => {
    reset();
    setIsExploring(true);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const dfs = async (row, col, visitedSet, currentPath, logMessages) => {
      // Check if treasure found
      if (row === TREASURE_POS.row && col === TREASURE_POS.col) {
        logMessages.push(`🎉 Treasure found at (${row},${col})!`);
        setExplorationLog([...logMessages]);
        setCurrentPos({ row, col });
        setPath([...currentPath, { row, col }]);
        setVisited(new Set(visitedSet));
        setFound(true);
        await sleep(500);
        return true;
      }

      // Mark as visited
      visitedSet.add(`${row},${col}`);
      currentPath.push({ row, col });

      // Update visualization
      setCurrentPos({ row, col });
      setVisited(new Set(visitedSet));
      setPath([...currentPath]);

      if (currentPath.length > 1) {
        logMessages.push(`Exploring (${row},${col})`);
        setExplorationLog([...logMessages]);
      }

      await sleep(400);

      // Try all four directions (DFS order: right, down, left, up)
      const directions = [
        { row: 0, col: 1, name: 'right' },   // Right
        { row: 1, col: 0, name: 'down' },    // Down
        { row: 0, col: -1, name: 'left' },   // Left
        { row: -1, col: 0, name: 'up' }      // Up
      ];

      for (const dir of directions) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        if (
          isValid(newRow, newCol) &&
          !visitedSet.has(`${newRow},${newCol}`)
        ) {
          logMessages.push(`Trying ${dir.name} to (${newRow},${newCol})`);
          setExplorationLog([...logMessages]);

          const foundTreasure = await dfs(newRow, newCol, visitedSet, currentPath, logMessages);

          if (foundTreasure) {
            return true;
          }
        }
      }

      // Backtrack
      currentPath.pop();
      logMessages.push(`⬅️ Backtracking from (${row},${col})`);
      setExplorationLog([...logMessages]);

      if (currentPath.length > 0) {
        const prevPos = currentPath[currentPath.length - 1];
        setCurrentPos(prevPos);
        setPath([...currentPath]);
      }

      await sleep(400);

      return false;
    };

    await dfs(0, 0, new Set(), [], ['Started DFS from (0,0)']);
    setIsExploring(false);
  };

  const reset = () => {
    setCurrentPos({ row: 0, col: 0 });
    setVisited(new Set(['0,0']));
    setPath([{ row: 0, col: 0 }]);
    setFound(false);
    setIsExploring(false);
    setExplorationLog(['Started at (0,0)']);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>🗺️ Maze Explorer</h2>
        <div className="pattern-badge">Pattern: DFS (Depth-First Search)</div>
      </div>

      <div className="game-description">
        <p>Navigate through the maze to find the treasure! You can only move through open paths (green). Walls (gray) block your way.</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Like exploring a maze - go as deep as possible down one path, then backtrack when you hit a dead end!
        </p>
      </div>

      <div className="game-board">
        <div className="maze-container">
          {/* Maze Grid */}
          <div className="maze-grid" style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`
          }}>
            {initialMaze.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isCurrentPos = currentPos.row === rowIndex && currentPos.col === colIndex;
                const isInPath = path.some(p => p.row === rowIndex && p.col === colIndex);
                const isVisitedCell = isVisited(rowIndex, colIndex);
                const isTreasureCell = isTreasure(rowIndex, colIndex);
                const isStart = rowIndex === 0 && colIndex === 0;

                let cellClass = 'maze-cell';
                if (cell === 0) cellClass += ' wall';
                if (cell === 1) cellClass += ' path';
                if (isVisitedCell) cellClass += ' visited';
                if (isInPath && !isCurrentPos) cellClass += ' in-path';
                if (isCurrentPos) cellClass += ' current';
                if (isTreasureCell && !found) cellClass += ' treasure-hidden';

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={cellClass}
                  >
                    {isStart && <span className="start-marker">START</span>}
                    {isCurrentPos && <span className="explorer">🧭</span>}
                    {isTreasureCell && found && <span className="treasure">💎</span>}
                    {isTreasureCell && !found && <span className="treasure-hint">?</span>}
                  </div>
                );
              })
            )}
          </div>

          {/* Legend */}
          <div className="maze-legend">
            <div className="legend-item">
              <div className="legend-box wall"></div>
              <span>Wall (can't pass)</span>
            </div>
            <div className="legend-item">
              <div className="legend-box path"></div>
              <span>Open path</span>
            </div>
            <div className="legend-item">
              <div className="legend-box visited"></div>
              <span>Visited</span>
            </div>
            <div className="legend-item">
              <div className="legend-box in-path"></div>
              <span>Current path</span>
            </div>
            <div className="legend-item">
              <div className="legend-box current"></div>
              <span>Your position</span>
            </div>
          </div>

          {/* Manual Controls */}
          {!found && !isExploring && (
            <div className="maze-controls">
              <div className="direction-pad">
                <button onClick={() => move('up')} className="dir-btn up">↑</button>
                <div className="middle-row">
                  <button onClick={() => move('left')} className="dir-btn left">←</button>
                  <div className="center-info">
                    <div>({currentPos.row}, {currentPos.col})</div>
                  </div>
                  <button onClick={() => move('right')} className="dir-btn right">→</button>
                </div>
                <button onClick={() => move('down')} className="dir-btn down">↓</button>
              </div>

              <div className="maze-actions">
                <button onClick={backtrack} className="btn-secondary">
                  ⬅️ Backtrack
                </button>
                <button onClick={autoSolveDFS} className="btn-hint">
                  🤖 Auto Solve (DFS)
                </button>
                <button onClick={reset} className="btn-secondary">
                  🔄 Reset
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="maze-stats">
            <div className="stat">
              <span className="stat-label">Cells Visited:</span>
              <span className="stat-value">{visited.size}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Path Length:</span>
              <span className="stat-value">{path.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Status:</span>
              <span className="stat-value">
                {found ? '🎉 Found!' : isExploring ? '🔍 Exploring...' : '🗺️ Searching'}
              </span>
            </div>
          </div>

          {/* Exploration Log */}
          {explorationLog.length > 1 && (
            <div className="exploration-log">
              <h4>📝 Exploration Log:</h4>
              <div className="log-entries">
                {explorationLog.slice(-10).map((log, i) => (
                  <div key={i} className="log-entry">
                    <span className="log-number">{explorationLog.length - 10 + i + 1}.</span>
                    <span className="log-message">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {found && (
            <div className="game-stats">
              <h4>🎉 Treasure Found!</h4>
              <p>Cells visited: <strong>{visited.size}</strong> out of {GRID_SIZE * GRID_SIZE}</p>
              <p>Path length: <strong>{path.length}</strong> moves</p>
              <button onClick={reset} className="btn-primary">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How DFS (Depth-First Search) Works:</h4>
        <ul>
          <li><strong>Go Deep</strong>: Explore as far as possible along each branch before backtracking</li>
          <li><strong>Stack-based</strong>: Uses recursion (call stack) or explicit stack data structure</li>
          <li><strong>Backtrack</strong>: When you hit a dead end or visited cell, go back to try other paths</li>
          <li><strong>Mark Visited</strong>: Keep track of explored cells to avoid infinite loops</li>
          <li><strong>Real uses</strong>: Maze solving, detecting cycles in graphs, topological sorting, pathfinding</li>
          <li>Time Complexity: <code>O(V + E)</code> where V = vertices (cells), E = edges (connections)</li>
          <li><strong>DFS vs BFS</strong>: DFS goes deep first (stack), BFS goes wide first (queue)</li>
        </ul>
      </div>
    </div>
  );
}
