export const FPS = 30;
export const DURATION_FRAMES = 480; // 16 seconds

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

// Scene frame boundaries
export const SCENES = {
  s1Start: 0,   // 0s  – Typing
  s1End: 60,    // 2s
  s2Start: 60,  // 2s  – Problem-Text
  s2End: 150,   // 5s
  s3Start: 150, // 5s  – Mini-Cuts
  s3End: 300,   // 10s
  s4Start: 300, // 10s – Glitch + moderne Site
  s4End: 390,   // 13s
  s5Start: 390, // 13s – CTA
  s5End: 480,   // 16s
};
