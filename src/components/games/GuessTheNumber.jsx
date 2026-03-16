import { useState, useEffect } from 'react';
import './games.css';

export default function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [range, setRange] = useState({ min: 1, max: 100 });
  const [showBinarySearch, setShowBinarySearch] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGuess('');
    setGuesses([]);
    setFeedback('');
    setGameWon(false);
    setRange({ min: 1, max: 100 });
  };

  const makeGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setFeedback('Please enter a number between 1 and 100');
      return;
    }

    const newGuesses = [...guesses, guessNum];
    setGuesses(newGuesses);

    if (guessNum === targetNumber) {
      setFeedback(`🎉 Correct! You found it in ${newGuesses.length} guesses!`);
      setGameWon(true);
    } else if (guessNum < targetNumber) {
      setFeedback('📈 Higher! Try a bigger number.');
      setRange({ min: guessNum, max: range.max });
    } else {
      setFeedback('📉 Lower! Try a smaller number.');
      setRange({ min: range.min, max: guessNum });
    }

    setGuess('');
  };

  const useBinarySearch = () => {
    const midPoint = Math.floor((range.min + range.max) / 2);
    setGuess(midPoint.toString());
    setShowBinarySearch(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameWon) {
      makeGuess();
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>🎯 Guess the Number</h2>
        <div className="pattern-badge">Pattern: Binary Search</div>
      </div>

      <div className="game-description">
        <p>I'm thinking of a number between 1 and 100. Can you find it?</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Like finding a page in a book - you don't start at page 1, you jump to the middle and eliminate half each time!
        </p>
      </div>

      <div className="game-board">
        <div className="number-range">
          <div className="range-display">
            <span className="range-min">{range.min}</span>
            <div className="range-bar">
              <div className="range-marker" style={{ left: `${((targetNumber - range.min) / (range.max - range.min)) * 100}%` }}>
                {gameWon ? '🎯' : '?'}
              </div>
            </div>
            <span className="range-max">{range.max}</span>
          </div>
          <p className="range-text">Current range: {range.min} to {range.max}</p>
        </div>

        {!gameWon && (
          <div className="guess-input-area">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              className="guess-input"
              min="1"
              max="100"
            />
            <button onClick={makeGuess} className="btn-primary">
              Guess
            </button>
            <button onClick={useBinarySearch} className="btn-hint">
              💡 Use Binary Search
            </button>
          </div>
        )}

        {showBinarySearch && !gameWon && (
          <div className="binary-search-hint">
            <p>Binary Search suggests: {Math.floor((range.min + range.max) / 2)}</p>
            <p className="hint-explanation">
              This is the middle of {range.min} and {range.max}, eliminating half the possibilities!
            </p>
          </div>
        )}

        {feedback && (
          <div className={`feedback ${gameWon ? 'success' : ''}`}>
            {feedback}
          </div>
        )}

        {guesses.length > 0 && (
          <div className="guesses-history">
            <h4>Your Guesses ({guesses.length}):</h4>
            <div className="guess-list">
              {guesses.map((g, i) => (
                <span key={i} className={`guess-chip ${g === targetNumber ? 'correct' : ''}`}>
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        {gameWon && (
          <div className="game-stats">
            <h4>📊 Game Stats:</h4>
            <p>Guesses needed: <strong>{guesses.length}</strong></p>
            <p>Binary Search would need: <strong>{Math.ceil(Math.log2(100))} guesses max</strong></p>
            <p>Linear search would need: <strong>50 guesses average</strong></p>
            <button onClick={startNewGame} className="btn-primary">
              🔄 Play Again
            </button>
          </div>
        )}
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Binary Search Works:</h4>
        <ul>
          <li>Always guess the middle number of your current range</li>
          <li>If too high, eliminate upper half; if too low, eliminate lower half</li>
          <li>Each guess eliminates 50% of possibilities</li>
          <li>Time Complexity: <code>O(log n)</code> - incredibly efficient!</li>
        </ul>
      </div>
    </div>
  );
}
