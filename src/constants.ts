export const FPS = 30;
export const DURATION_FRAMES = 480; // 16 seconds

export const COLORS = {
  bg: '#0A0A0A',
  text: '#FFFFFF',
  accent: '#3B82F6',
  accentDim: 'rgba(59,130,246,0.18)',
  gray: '#888888',
  grayLight: '#CCCCCC',
  dark: '#111111',
  darker: '#0D0D0D',
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
