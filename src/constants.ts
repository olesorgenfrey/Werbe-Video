export const FPS = 30;
export const DURATION_FRAMES = 240; // 8 seconds

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
  s1Start: 0,   // 0s cursor + typing
  s1End: 30,    // 1s
  s2Start: 30,  // 1s backspace + reveal
  s2End: 60,    // 2s
  s3Start: 60,  // 2s problem mini-scenes
  s3End: 120,   // 4s
  s4Start: 120, // 4s glitch + modern site
  s4End: 180,   // 6s
  s5Start: 180, // 6s final CTA
  s5End: 240,   // 8s
};
