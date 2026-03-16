# Ambient Sound Files

This directory should contain ambient sound files for the peaceful study environment.

## Required Sound Files

Place the following MP3 files in this directory:

### Ambient Sounds (looping background)
- `rain.mp3` - Gentle rainfall sounds
- `forest.mp3` - Forest ambience with birds
- `ocean.mp3` - Ocean waves
- `cafe.mp3` - Cafe background noise
- `whitenoise.mp3` - White/brown noise

### Notification Sounds (Pomodoro)
- `bell-soft.mp3` - Soft bell for work → break transition
- `chime-soft.mp3` - Gentle chime for break → work transition

## Where to Get Royalty-Free Sounds

### Option 1: Freesound.org (Recommended)
1. Visit https://freesound.org
2. Search for each sound type
3. Filter by "CC0" license (public domain)
4. Download and rename to match the filenames above
5. Convert to MP3 if needed

**Recommended searches:**
- Rain: "gentle rain loop" or "rainfall ambience"
- Forest: "forest birds loop" or "nature ambience"
- Ocean: "ocean waves loop" or "sea ambience"
- Cafe: "coffee shop ambience" or "cafe background"
- White Noise: "white noise" or "brown noise"
- Bell: "soft bell" or "tibetan bell"
- Chime: "wind chime" or "gentle chime"

### Option 2: Pixabay
1. Visit https://pixabay.com/sound-effects/
2. All sounds are royalty-free
3. Search and download each sound type

### Option 3: YouTube Audio Library
1. Visit https://studio.youtube.com (requires Google account)
2. Go to Audio Library
3. Filter by Sound Effects
4. Download royalty-free ambient sounds

### Option 4: Generate with Tone.js (Future Enhancement)
Procedurally generate ambient sounds using JavaScript libraries:
- No files needed
- Less bandwidth
- Customizable

## File Requirements

- **Format**: MP3 (widely supported)
- **Size**: Keep under 1MB each for faster loading
- **Length**: 30-60 seconds (they loop automatically)
- **Quality**: 128kbps is sufficient for ambient sounds
- **Volume**: Normalize to -18dB to prevent clipping

## Testing

After adding sound files:
1. Start the dev server (`npm run dev`)
2. Click the speaker icon (🔊) in the bottom-left
3. Select each sound to test playback
4. Adjust volume as needed

## Fallback

Currently, the app uses placeholder audio. The ambient sound player will:
- Work but use a generic preview sound
- Show all controls and UI correctly
- Save preferences to localStorage

Replace the placeholder URL in `AmbientSound.jsx` with actual file paths once you add the sounds.
