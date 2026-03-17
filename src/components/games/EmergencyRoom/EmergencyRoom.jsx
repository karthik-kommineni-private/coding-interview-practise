import { useState } from 'react';
import '../games.css';

export default function EmergencyRoom() {
  const patientTypes = [
    { severity: 5, condition: 'Heart Attack', emoji: '🚑', color: '#ef4444' },
    { severity: 4, condition: 'Severe Bleeding', emoji: '🩸', color: '#f97316' },
    { severity: 3, condition: 'Broken Bone', emoji: '🦴', color: '#fbbf24' },
    { severity: 2, condition: 'Sprained Ankle', emoji: '🤕', color: '#84cc16' },
    { severity: 1, condition: 'Minor Cut', emoji: '🩹', color: '#22c55e' }
  ];

  const [heap, setHeap] = useState([]);
  const [treated, setTreated] = useState([]);
  const [nextPatientId, setNextPatientId] = useState(1);
  const [isTreating, setIsTreating] = useState(false);

  const addPatient = (patientType) => {
    const newPatient = {
      id: nextPatientId,
      ...patientType,
      arrivalTime: Date.now()
    };

    // Add to heap and maintain max-heap property
    const newHeap = [...heap, newPatient];
    heapifyUp(newHeap, newHeap.length - 1);

    setHeap(newHeap);
    setNextPatientId(nextPatientId + 1);
  };

  const heapifyUp = (arr, index) => {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (arr[parentIndex].severity >= arr[index].severity) {
        break;
      }

      // Swap
      [arr[parentIndex], arr[index]] = [arr[index], arr[parentIndex]];
      index = parentIndex;
    }
  };

  const heapifyDown = (arr, index) => {
    const length = arr.length;

    while (true) {
      let largest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && arr[leftChild].severity > arr[largest].severity) {
        largest = leftChild;
      }

      if (rightChild < length && arr[rightChild].severity > arr[largest].severity) {
        largest = rightChild;
      }

      if (largest === index) {
        break;
      }

      // Swap
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      index = largest;
    }
  };

  const treatPatient = () => {
    if (heap.length === 0) return;

    setIsTreating(true);

    setTimeout(() => {
      const patient = heap[0]; // Get highest priority (root)
      const newHeap = [...heap];

      // Replace root with last element
      newHeap[0] = newHeap[newHeap.length - 1];
      newHeap.pop();

      // Restore heap property
      if (newHeap.length > 0) {
        heapifyDown(newHeap, 0);
      }

      setHeap(newHeap);
      setTreated([...treated, patient]);
      setIsTreating(false);
    }, 500);
  };

  const addRandomPatient = () => {
    const randomType = patientTypes[Math.floor(Math.random() * patientTypes.length)];
    addPatient(randomType);
  };

  const autoSimulate = () => {
    reset();

    // Add several random patients
    const simulation = [];
    for (let i = 0; i < 8; i++) {
      simulation.push({
        time: i * 1000,
        action: 'add',
        patient: patientTypes[Math.floor(Math.random() * patientTypes.length)]
      });
    }

    // Treat some patients
    for (let i = 0; i < 5; i++) {
      simulation.push({
        time: (i + 8) * 1000,
        action: 'treat'
      });
    }

    simulation.forEach(step => {
      setTimeout(() => {
        if (step.action === 'add') {
          addPatient(step.patient);
        } else {
          treatPatient();
        }
      }, step.time);
    });
  };

  const reset = () => {
    setHeap([]);
    setTreated([]);
    setNextPatientId(1);
    setIsTreating(false);
  };

  const getTreePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const positionInLevel = index - (Math.pow(2, level) - 1);
    const maxInLevel = Math.pow(2, level);

    return {
      level,
      position: positionInLevel,
      maxInLevel
    };
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>🏥 Emergency Room</h2>
        <div className="pattern-badge">Pattern: Heap (Priority Queue)</div>
      </div>

      <div className="game-description">
        <p>Manage an ER where patients must be treated by <strong>severity level</strong>, not arrival order.</p>
        <p className="game-hint">
          💡 <strong>Real-life connection:</strong> Emergency rooms always treat the most critical patient first, regardless of who arrived first. This is a priority queue (max-heap)!
        </p>
      </div>

      <div className="game-board">
        <div className="er-layout">
          {/* Control Panel */}
          <div className="er-controls">
            <h4>Incoming Patients:</h4>
            <div className="patient-types">
              {patientTypes.map((type, i) => (
                <button
                  key={i}
                  onClick={() => addPatient(type)}
                  className="patient-type-btn"
                  style={{ borderColor: type.color }}
                >
                  <span className="patient-emoji">{type.emoji}</span>
                  <span className="patient-condition">{type.condition}</span>
                  <span className="severity-badge" style={{ background: type.color }}>
                    Priority: {type.severity}
                  </span>
                </button>
              ))}
            </div>

            <div className="action-btns">
              <button onClick={addRandomPatient} className="btn-secondary">
                🎲 Random Patient
              </button>
              <button onClick={autoSimulate} className="btn-hint">
                🤖 Auto Simulate
              </button>
              <button onClick={reset} className="btn-secondary">
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Waiting Room (Heap Visualization) */}
          <div className="waiting-room">
            <div className="room-header">
              <h4>⏳ Waiting Room ({heap.length} patients)</h4>
              {heap.length > 0 && (
                <button
                  onClick={treatPatient}
                  disabled={isTreating}
                  className="btn-primary treat-btn"
                >
                  ✅ Treat Highest Priority
                </button>
              )}
            </div>

            {heap.length === 0 ? (
              <div className="empty-waiting-room">
                <p>No patients waiting</p>
              </div>
            ) : (
              <div>
                {/* Priority List View */}
                <div className="priority-list">
                  <div className="next-patient" style={{ borderColor: heap[0].color }}>
                    <span className="next-label">NEXT TO TREAT</span>
                    <span className="patient-emoji-large">{heap[0].emoji}</span>
                    <strong>{heap[0].condition}</strong>
                    <div className="severity-badge" style={{ background: heap[0].color }}>
                      Priority: {heap[0].severity}
                    </div>
                  </div>

                  <div className="other-patients">
                    {heap.slice(1).map((patient, i) => (
                      <div
                        key={patient.id}
                        className="patient-in-queue"
                        style={{ borderColor: patient.color }}
                      >
                        <span>{patient.emoji}</span>
                        <span>{patient.condition}</span>
                        <span className="severity-badge" style={{ background: patient.color }}>
                          {patient.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heap Tree Visualization */}
                <div className="heap-tree">
                  <h4>Heap Tree (Max-Heap):</h4>
                  <div className="tree-container">
                    {heap.map((patient, index) => {
                      const pos = getTreePosition(index);
                      const leftPos = `${(pos.position / pos.maxInLevel) * 100 + (50 / pos.maxInLevel)}%`;

                      return (
                        <div
                          key={patient.id}
                          className="tree-node"
                          style={{
                            top: `${pos.level * 80}px`,
                            left: leftPos
                          }}
                        >
                          <div className="node-content" style={{ borderColor: patient.color }}>
                            <div className="node-severity" style={{ background: patient.color }}>
                              {patient.severity}
                            </div>
                            <div className="node-emoji">{patient.emoji}</div>
                          </div>
                          {index === 0 && <span className="root-label">ROOT</span>}
                        </div>
                      );
                    })}
                  </div>
                  <p className="heap-explanation">
                    Max-Heap Property: Parent &gt;= Children (highest priority at root)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Treated Patients */}
          {treated.length > 0 && (
            <div className="treated-patients">
              <h4>✅ Treated Patients ({treated.length}):</h4>
              <div className="treated-list">
                {treated.map((patient, i) => (
                  <div key={patient.id} className="treated-item">
                    <span className="treatment-order">#{i + 1}</span>
                    <span>{patient.emoji}</span>
                    <span>{patient.condition}</span>
                    <span className="severity-badge" style={{ background: patient.color }}>
                      Priority {patient.severity}
                    </span>
                  </div>
                ))}
              </div>
              <p className="treatment-note">
                Notice: Patients treated in order of <strong>severity</strong>, not arrival!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pattern-explanation">
        <h4>🧠 How Heap (Priority Queue) Works:</h4>
        <ul>
          <li><strong>Max-Heap</strong>: Parent node is always ≥ children (root = maximum)</li>
          <li><strong>Insert</strong>: Add to end, then "bubble up" to maintain heap property</li>
          <li><strong>Extract Max</strong>: Remove root, replace with last element, "bubble down"</li>
          <li><strong>Always O(log n)</strong>: Tree height determines operations cost</li>
          <li><strong>Real uses</strong>: Priority queues, task scheduling, Dijkstra's algorithm, merge K sorted lists</li>
          <li><strong>Heap vs Queue</strong>: Queue is FIFO, Heap is "highest priority first"</li>
          <li>Time Complexity: <code>O(log n)</code> insert/delete, <code>O(1)</code> peek max</li>
        </ul>
      </div>
    </div>
  );
}
