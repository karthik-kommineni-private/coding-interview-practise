import { useState } from 'react';
import './games.css';

export default function CoffeeQueue() {
  const customerNames = [
    { name: 'Alice', order: '☕ Latte', time: 3 },
    { name: 'Bob', order: '☕ Espresso', time: 2 },
    { name: 'Charlie', order: '🍰 Cake & Coffee', time: 4 },
    { name: 'Diana', order: '🥤 Iced Coffee', time: 3 },
    { name: 'Eve', order: '☕ Cappuccino', time: 3 },
    { name: 'Frank', order: '🥐 Croissant & Tea', time: 4 }
  ];

  const [queue, setQueue] = useState([]);
  const [served, setServed] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([...customerNames]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isServing, setIsServing] = useState(false);

  const addCustomer = (customer) => {
    setQueue([...queue, { ...customer, arrivalTime: currentTime }]);
    setAvailableCustomers(availableCustomers.filter(c => c.name !== customer.name));
    setCurrentTime(currentTime + 1);
  };

  const serveCustomer = () => {
    if (queue.length === 0) return;

    const [first, ...rest] = queue;
    const waitTime = currentTime - first.arrivalTime;

    setIsServing(true);
    setTimeout(() => {
      setQueue(rest);
      setServed([...served, { ...first, waitTime, servedTime: currentTime }]);
      setCurrentTime(currentTime + first.time);
      setIsServing(false);
    }, 500);
  };

  const reset = () => {
    setQueue([]);
    setServed([]);
    setAvailableCustomers([...customerNames]);
    setCurrentTime(0);
    setIsServing(false);
  };

  const averageWaitTime = served.length > 0
    ? (served.reduce((sum, c) => sum + c.waitTime, 0) / served.length).toFixed(1)
    : 0;

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>☕ Coffee Shop Line</h2>
        <div className="pattern-badge">Pattern: Queue (FIFO)</div>
      </div>

      <div className="game-description">
        <p>Manage a coffee shop queue. Add customers to the line and serve them in order.</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Like a real coffee shop line - first person in line is first to be served (FIFO - First In, First Out)
        </p>
      </div>

      <div className="game-board">
        {/* Time Display */}
        <div className="queue-time-header">
          <h3>☕ Brew & Bean Coffee Shop</h3>
          <div className="time-display">⏰ Time: {currentTime} min</div>
        </div>

        {/* Barista Section */}
        <div className="queue-barista-area">
          <div className="barista-icon">👨‍🍳</div>
          <h4>Barista Counter</h4>
          {isServing && <p className="serving-indicator">Preparing order...</p>}
          {!isServing && queue.length === 0 && <p className="barista-idle">Waiting for customers...</p>}
          {queue.length > 0 && (
            <button
              onClick={serveCustomer}
              disabled={isServing}
              className="btn-primary"
            >
              ✅ Serve Next Customer
            </button>
          )}
        </div>

        {/* Queue Display */}
        <div className="queue-display-area">
          <h4>📋 Queue ({queue.length} waiting):</h4>
          {queue.length === 0 ? (
            <div className="empty-queue-msg">No customers in line</div>
          ) : (
            <div className="queue-customers">
              {queue.map((customer, i) => (
                <div key={i} className={`queue-customer-item ${i === 0 ? 'next-customer' : ''}`}>
                  <div className="customer-number">{i + 1}</div>
                  <div className="customer-avatar">👤</div>
                  <div className="customer-details">
                    <strong>{customer.name}</strong>
                    <div className="customer-order-text">{customer.order}</div>
                    <div className="customer-meta">
                      ⏱️ {customer.time} min | Waiting: {currentTime - customer.arrivalTime} min
                    </div>
                  </div>
                  {i === 0 && <div className="next-label">NEXT</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Customers Section */}
        <div className="queue-add-section">
          <h4>👥 Walk-in Customers:</h4>
          <div className="queue-customer-grid">
            {availableCustomers.map((customer, i) => (
              <button
                key={i}
                onClick={() => addCustomer(customer)}
                className="add-customer-btn"
              >
                <span className="add-customer-avatar">👤</span>
                <span className="add-customer-name">{customer.name}</span>
                <span className="add-customer-order">{customer.order}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={reset} className="btn-secondary">
            🔄 Reset
          </button>
        </div>

        {/* FIFO Visualization */}
        <div className="queue-fifo-viz">
          <h4>🔄 FIFO Queue Visualization:</h4>
          <div className="fifo-container">
            <div className="fifo-arrow left">← ENQUEUE (add to back)</div>
            <div className="fifo-items">
              {queue.length === 0 ? (
                <div className="fifo-empty">Empty Queue</div>
              ) : (
                queue.map((customer, i) => (
                  <div key={i} className={`fifo-box ${i === 0 ? 'fifo-front' : ''}`}>
                    {customer.name}
                  </div>
                ))
              )}
            </div>
            <div className="fifo-arrow right">DEQUEUE (remove from front) →</div>
          </div>
          <div className="fifo-info">
            <p><strong>Queue Operations:</strong></p>
            <p>• <code>enqueue(customer)</code> - Add to back of line</p>
            <p>• <code>dequeue()</code> - Remove from front of line</p>
            <p>• <code>peek()</code> - View next without removing</p>
          </div>
        </div>

        {/* Served Customers */}
        {served.length > 0 && (
          <div className="queue-served-section">
            <h4>✅ Served Customers ({served.length}):</h4>
            <div className="served-customers-list">
              {served.map((customer, i) => (
                <div key={i} className="served-customer">
                  <span className="served-num">#{i + 1}</span>
                  <span className="served-avatar">👤</span>
                  <span className="served-name">{customer.name}</span>
                  <span className="served-order">{customer.order}</span>
                  <span className="served-wait">Waited: {customer.waitTime} min</span>
                </div>
              ))}
            </div>
            <div className="served-stats">
              <p>Average wait time: <strong>{averageWaitTime} min</strong></p>
              <p>Total served: <strong>{served.length}</strong> customers</p>
            </div>
          </div>
        )}
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Queue (FIFO) Works:</h4>
        <ul>
          <li><strong>Enqueue</strong>: Add element to the back of the queue</li>
          <li><strong>Dequeue</strong>: Remove and return element from the front</li>
          <li><strong>FIFO</strong>: First In, First Out - fair ordering, first come first served</li>
          <li><strong>Real uses</strong>: Task scheduling, printer queues, breadth-first search (BFS)</li>
          <li>Time Complexity: <code>O(1)</code> for enqueue/dequeue operations</li>
          <li>Opposite of Stack (LIFO) - Stack is like a pile of plates, Queue is like a line</li>
        </ul>
      </div>
    </div>
  );
}
