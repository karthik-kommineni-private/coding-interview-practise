import { useState, useEffect, useRef } from 'react';
import './AmbientSound.css';

function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [selectedSound, setSelectedSound] = useState('rain');
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  const sounds = [
    { id: 'rain', name: 'Rain', emoji: '🌧️', file: '/src/assets/sounds/rain.mp3' },
    { id: 'forest', name: 'Forest', emoji: '🌲', file: '/src/assets/sounds/forest.mp3' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊', file: '/src/assets/sounds/ocean.mp3' },
    { id: 'cafe', name: 'Cafe', emoji: '☕', file: '/src/assets/sounds/cafe.mp3' },
    { id: 'whitenoise', name: 'White Noise', emoji: '📻', file: '/src/assets/sounds/whitenoise.mp3' }
  ];

  // Load preferences from localStorage
  useEffect(() => {
    const savedSound = localStorage.getItem('ambientSound');
    const savedVolume = localStorage.getItem('ambientVolume');
    const savedPlaying = localStorage.getItem('ambientPlaying');

    if (savedSound) setSelectedSound(savedSound);
    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedPlaying === 'true') setIsPlaying(true);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('ambientSound', selectedSound);
    localStorage.setItem('ambientVolume', volume.toString());
    localStorage.setItem('ambientPlaying', isPlaying.toString());
  }, [selectedSound, volume, isPlaying]);

  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Audio play failed:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, selectedSound, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSoundChange = (soundId) => {
    setSelectedSound(soundId);
    setShowControls(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const currentSound = sounds.find(s => s.id === selectedSound);

  return (
    <div
      className="ambient-sound-widget"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={currentSound?.file || ''}
        onError={(e) => {
          console.warn(`Sound file not found: ${currentSound?.file}. Add sound files to src/assets/sounds/`);
        }}
      />

      <button
        className={`ambient-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        title={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>

      {showControls && (
        <div className="ambient-controls">
          <div className="ambient-volume">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>

          <div className="ambient-sounds">
            <label>Sound</label>
            <div className="sound-options">
              {sounds.map(sound => (
                <button
                  key={sound.id}
                  className={`sound-option ${selectedSound === sound.id ? 'active' : ''}`}
                  onClick={() => handleSoundChange(sound.id)}
                  title={sound.name}
                >
                  <span className="sound-emoji">{sound.emoji}</span>
                  <span className="sound-name">{sound.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmbientSound;
