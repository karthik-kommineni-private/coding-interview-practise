import { useState } from 'react';
import './CodePractice.css';

function CodePractice({ template, patternTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const normalizeCode = (code) => {
    return code
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s*([(){}[\]:,])\s*/g, '$1')
      .toLowerCase();
  };

  const checkAnswer = () => {
    const normalizedTemplate = normalizeCode(template);
    const normalizedUserCode = normalizeCode(userCode);

    if (normalizedUserCode === normalizedTemplate) {
      setFeedback({
        type: 'success',
        message: '🎉 Perfect! You got it right!',
        details: 'Your code matches the template exactly. Great job!'
      });
    } else {
      const similarity = calculateSimilarity(normalizedUserCode, normalizedTemplate);
      if (similarity > 80) {
        setFeedback({
          type: 'close',
          message: '🔥 Almost there!',
          details: `You're ${similarity.toFixed(0)}% correct. Check for small differences.`
        });
      } else if (similarity > 50) {
        setFeedback({
          type: 'partial',
          message: '💪 Good progress!',
          details: `You're ${similarity.toFixed(0)}% there. Keep going!`
        });
      } else {
        setFeedback({
          type: 'try-again',
          message: '🤔 Not quite right',
          details: 'Try again or use the hint to see the first few lines.'
        });
      }
    }
  };

  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 100;

    const editDistance = levenshteinDistance(longer, shorter);
    return ((longer.length - editDistance) / longer.length) * 100;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  const getNextHint = () => {
    const lines = template.split('\n');
    const maxHints = Math.min(lines.length, 5);
    if (hintLevel < maxHints) {
      setHintLevel(hintLevel + 1);
    }
  };

  const getCurrentHint = () => {
    const lines = template.split('\n');
    return lines.slice(0, hintLevel).join('\n');
  };

  const resetPractice = () => {
    setUserCode('');
    setFeedback(null);
    setHintLevel(0);
    setShowSolution(false);
  };

  if (!isOpen) {
    return (
      <button className="practice-trigger-btn" onClick={() => setIsOpen(true)}>
        ✍️ Practice Writing This Code
      </button>
    );
  }

  return (
    <div className="practice-modal">
      <div className="practice-header">
        <h3>Practice: {patternTitle}</h3>
        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
      </div>

      <div className="practice-content">
        <div className="practice-instructions">
          <p>Type the code from memory. Try to match the template exactly!</p>
        </div>

        <textarea
          className="practice-editor"
          value={showSolution ? template : userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="Start typing the code here..."
          spellCheck={false}
          disabled={showSolution}
        />

        {hintLevel > 0 && !showSolution && (
          <div className="hint-box">
            <div className="hint-header">
              <strong>💡 Hint {hintLevel} - First {hintLevel} line{hintLevel > 1 ? 's' : ''}:</strong>
              <span className="hint-count">
                {hintLevel} / {Math.min(template.split('\n').length, 5)}
              </span>
            </div>
            <pre>{getCurrentHint()}</pre>
          </div>
        )}

        {showSolution && (
          <div className="solution-box">
            <strong>📖 Full Solution Revealed</strong>
            <p>Study the solution above. Click Reset to try again!</p>
          </div>
        )}

        {feedback && (
          <div className={`feedback feedback-${feedback.type}`}>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-details">{feedback.details}</div>
          </div>
        )}

        <div className="practice-actions">
          <button className="action-btn reset-btn" onClick={resetPractice}>
            ↺ Reset
          </button>
          {!showSolution && hintLevel < Math.min(template.split('\n').length, 5) && (
            <button className="action-btn hint-btn" onClick={getNextHint}>
              💡 {hintLevel === 0 ? 'Show Hint' : 'Next Hint'}
            </button>
          )}
          {!showSolution && (
            <button
              className="action-btn solution-btn"
              onClick={() => setShowSolution(true)}
              title="Reveal full solution"
            >
              📖 Show Solution
            </button>
          )}
          {!showSolution && (
            <button className="action-btn check-btn" onClick={checkAnswer}>
              ✓ Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodePractice;
