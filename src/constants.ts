export const FPS = 30;
export const DURATION_FRAMES = 532; // ~17.73 seconds

export const COLORS = {
  bg: '#F5EFE6',
  text: '#1A1A1A',
  accent: '#C4512D',
  accentDim: 'rgba(196,81,45,0.18)',
  gray: '#B8B0A4',
  grayLight: '#B8B0A4',
  dark: '#D8CFC2',
  darker: '#F5EFE6',
};

export const FONTS = {
  sans: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Scene frame boundaries (synced to 17.73s voiceover @ 30fps)
export const SCENES = {
  s1Start: 0,   // 0s   – Typing
  s1End: 60,    // 2s
  s2Start: 60,  // 2s   – Problem-Text
  s2End: 120,   // 4s
  s3Start: 120, // 4s   – Mini-Cuts (Langsam/Unmodern/Unsichtbar)
  s3End: 255,   // 8.5s
  s4Start: 270, // 9s   – Glitch + "Das geht besser"
  s4End: 300,   // 10s
  s5Start: 300, // 10s  – CTA
  s5End: 532,   // ~17.73s
};
