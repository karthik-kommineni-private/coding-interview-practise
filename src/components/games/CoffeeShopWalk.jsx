import { useState, useEffect } from 'react';
import './games.css';

export default function CoffeeShopWalk() {
  const streetLength = 1000; // meters
  const targetDistance = 500; // total distance from both ends
  const coffeeShops = [
    { position: 200, name: '☕ Brew Haven' },
    { position: 400, name: '☕ Java House' },
    { position: 500, name: '☕ Perfect Spot' },
    { position: 600, name: '☕ Bean There' },
    { position: 800, name: '☕ Last Call' }
  ];

  const [youPosition, setYouPosition] = useState(0);
  const [friendPosition, setFriendPosition] = useState(streetLength);
  const [steps, setSteps] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);

  const calculateTotalDistance = () => {
    return youPosition + (streetLength - friendPosition);
  };

  const getCurrentStatus = () => {
    const total = calculateTotalDistance();
    if (total === targetDistance) return { message: '✅ Perfect! This is the meeting spot!', class: 'success' };
    if (total < targetDistance) return { message: '❌ Too close! Need to be 500m total distance', class: 'error' };
    if (total > targetDistance) return { message: '⚠️ Too far! Need to get closer', class: 'warning' };
  };

  const findNearestCoffeeShop = (position) => {
    return coffeeShops.reduce((nearest, shop) => {
      const distance = Math.abs(shop.position - position);
      return distance < Math.abs(nearest.position - position) ? shop : nearest;
    });
  };

  const moveYou = () => {
    if (youPosition >= streetLength) return;

    const newPosition = Math.min(youPosition + 100, streetLength);
    setYouPosition(newPosition);
    addStep(`You walked to ${newPosition}m`);

    checkCompletion(newPosition, friendPosition);
  };

  const moveFriend = () => {
    if (friendPosition <= 0) return;

    const newPosition = Math.max(friendPosition - 100, 0);
    setFriendPosition(newPosition);
    addStep(`Friend walked back to ${newPosition}m`);

    checkCompletion(youPosition, newPosition);
  };

  const checkCompletion = (youPos, friendPos) => {
    const total = youPos + (streetLength - friendPos);
    if (total === targetDistance) {
      const meetingPoint = youPos;
      const shop = findNearestCoffeeShop(meetingPoint);
      addStep(`🎉 You both met at ${meetingPoint}m near ${shop.name}!`);
      setIsComplete(true);
      setAutoPlaying(false);
    }
  };

  const addStep = (message) => {
    setSteps(prev => [...prev, { message, total: calculateTotalDistance() }]);
  };

  const reset = () => {
    setYouPosition(0);
    setFriendPosition(streetLength);
    setSteps([]);
    setIsComplete(false);
    setAutoPlaying(false);
  };

  const autoSolve = () => {
    setAutoPlaying(true);
    reset();

    // Simulate optimal two-pointer approach
    let you = 0;
    let friend = streetLength;
    let stepCount = 0;

    const interval = setInterval(() => {
      const total = you + (streetLength - friend);

      if (total === targetDistance) {
        clearInterval(interval);
        setYouPosition(you);
        setFriendPosition(friend);
        setIsComplete(true);
        setAutoPlaying(false);
        return;
      }

      if (total > targetDistance) {
        // Too far, move closer
        if (you > (streetLength - friend)) {
          you = Math.max(0, you - 100);
          setYouPosition(you);
          addStep(`Auto: You stepped back to ${you}m`);
        } else {
          friend = Math.min(streetLength, friend + 100);
          setFriendPosition(friend);
          addStep(`Auto: Friend stepped forward to ${friend}m`);
        }
      } else {
        // Too close, spread out
        if (you < (streetLength - friend)) {
          you = Math.min(streetLength, you + 100);
          setYouPosition(you);
          addStep(`Auto: You walked to ${you}m`);
        } else {
          friend = Math.max(0, friend - 100);
          setFriendPosition(friend);
          addStep(`Auto: Friend walked back to ${friend}m`);
        }
      }

      stepCount++;
      if (stepCount > 20) {
        clearInterval(interval);
        setAutoPlaying(false);
      }
    }, 800);
  };

  const status = getCurrentStatus();

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>☕ Walking to Coffee Shop</h2>
        <div className="pattern-badge">Pattern: Two Pointers</div>
      </div>

      <div className="game-description">
        <p>You and your friend are at opposite ends of a 1000m street. You want to meet at a coffee shop where your <strong>total walking distance equals exactly 500m</strong>.</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Two people walking toward each other - adjust positions based on a condition (distance sum = 500m)
        </p>
      </div>

      <div className="game-board">
        <div className="street-view">
          <div className="street-markers">
            {[0, 200, 400, 500, 600, 800, 1000].map(pos => (
              <div key={pos} className="marker" style={{ left: `${(pos / streetLength) * 100}%` }}>
                {pos}m
              </div>
            ))}
          </div>

          <div className="street-line">
            {coffeeShops.map((shop, i) => (
              <div
                key={i}
                className="coffee-shop"
                style={{ left: `${(shop.position / streetLength) * 100}%` }}
                title={shop.name}
              >
                ☕
              </div>
            ))}

            <div className="person you" style={{ left: `${(youPosition / streetLength) * 100}%` }}>
              🚶 You
            </div>

            <div className="person friend" style={{ left: `${(friendPosition / streetLength) * 100}%` }}>
              🚶 Friend
            </div>
          </div>

          <div className="distance-display">
            <div className="distance-box">
              <span>Your distance: <strong>{youPosition}m</strong></span>
            </div>
            <div className="distance-box">
              <span>Friend's distance: <strong>{streetLength - friendPosition}m</strong></span>
            </div>
            <div className={`distance-box total ${status?.class}`}>
              <span>Total: <strong>{calculateTotalDistance()}m</strong></span>
              <span className="target"> (target: {targetDistance}m)</span>
            </div>
          </div>
        </div>

        {status && (
          <div className={`feedback ${status.class}`}>
            {status.message}
          </div>
        )}

        {!isComplete && (
          <div className="controls">
            <button onClick={moveYou} disabled={autoPlaying} className="btn-primary">
              → Move You (+100m)
            </button>
            <button onClick={moveFriend} disabled={autoPlaying} className="btn-primary">
              ← Move Friend (-100m)
            </button>
            <button onClick={autoSolve} disabled={autoPlaying} className="btn-hint">
              🤖 Auto Solve
            </button>
            <button onClick={reset} className="btn-secondary">
              🔄 Reset
            </button>
          </div>
        )}

        {isComplete && (
          <div className="game-stats">
            <h4>🎉 Success!</h4>
            <p>You found the perfect meeting spot in {steps.length} moves!</p>
            <button onClick={reset} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {steps.length > 0 && (
          <div className="steps-history">
            <h4>Steps Taken:</h4>
            <div className="step-list">
              {steps.map((step, i) => (
                <div key={i} className="step-item">
                  <span className="step-number">{i + 1}.</span>
                  <span className="step-message">{step.message}</span>
                  <span className="step-total">Total: {step.total}m</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Two Pointers Works:</h4>
        <ul>
          <li>Start with two pointers at opposite ends of a range</li>
          <li>Move pointers based on a condition (in this case: distance sum)</li>
          <li>When sum is too large, move one pointer; when too small, move the other</li>
          <li>Converge to the solution efficiently without checking every possibility</li>
          <li>Time Complexity: <code>O(n)</code> - linear scan, much better than brute force!</li>
        </ul>
      </div>
    </div>
  );
}
