import { useState, useEffect } from 'react'
import { patterns } from './data/patterns'
import SlideViewer from './components/SlideViewer'
import Sidebar from './components/Sidebar'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('home'); // 'home' or 'pattern'
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentPattern = patterns[currentPatternIndex];
  const currentSlide = currentPattern.slides[currentSlideIndex];
  const totalSlides = currentPattern.slides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent navigation when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          if (viewMode === 'pattern') {
            nextSlide();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (viewMode === 'pattern') {
            prevSlide();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (viewMode === 'pattern') {
            nextPattern();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (viewMode === 'pattern') {
            prevPattern();
          }
          break;
        case 'Home':
          e.preventDefault();
          if (viewMode === 'pattern') {
            setCurrentSlideIndex(0);
          }
          break;
        case 'End':
          e.preventDefault();
          if (viewMode === 'pattern') {
            setCurrentSlideIndex(totalSlides - 1);
          }
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          goToHome();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPatternIndex, currentSlideIndex, totalSlides, viewMode]);

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (currentPatternIndex < patterns.length - 1) {
      setCurrentPatternIndex(currentPatternIndex + 1);
      setCurrentSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else if (currentPatternIndex > 0) {
      setCurrentPatternIndex(currentPatternIndex - 1);
      setCurrentSlideIndex(patterns[currentPatternIndex - 1].slides.length - 1);
    }
  };

  const nextPattern = () => {
    if (currentPatternIndex < patterns.length - 1) {
      setCurrentPatternIndex(currentPatternIndex + 1);
      setCurrentSlideIndex(0);
    }
  };

  const prevPattern = () => {
    if (currentPatternIndex > 0) {
      setCurrentPatternIndex(currentPatternIndex - 1);
      setCurrentSlideIndex(0);
    }
  };

  const goToPattern = (patternIndex) => {
    setCurrentPatternIndex(patternIndex);
    setCurrentSlideIndex(0);
    setViewMode('pattern');
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlideIndex(slideIndex);
  };

  const goToHome = () => {
    setViewMode('home');
  };

  if (viewMode === 'home') {
    return (
      <div className="app">
        <HomePage patterns={patterns} onPatternSelect={goToPattern} />
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        patterns={patterns}
        currentPatternIndex={currentPatternIndex}
        currentSlideIndex={currentSlideIndex}
        onPatternClick={goToPattern}
        onSlideClick={goToSlide}
      />
      <main className="main-content">
        <SlideViewer
          pattern={currentPattern}
          slide={currentSlide}
          slideIndex={currentSlideIndex}
          totalSlides={totalSlides}
          onNext={nextSlide}
          onPrev={prevSlide}
          isFirstSlide={currentPatternIndex === 0 && currentSlideIndex === 0}
          onBackToHome={goToHome}
        />
        <div className="keyboard-hints">
          <span>← → Navigate slides</span>
          <span>↑ ↓ Navigate topics</span>
          <span>Space Next</span>
          <span>H Home page</span>
        </div>
      </main>
    </div>
  );
}

export default App
