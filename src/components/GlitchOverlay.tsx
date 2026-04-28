import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface GlitchOverlayProps {
  startFrame: number;
  durationFrames?: number;
}

// Digital glitch transition — RGB split slices
export const GlitchOverlay: React.FC<GlitchOverlayProps> = ({
  startFrame,
  durationFrames = 12,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationFrames) return null;

  const progress = localFrame / durationFrames;
  const intensity = Math.sin(progress * Math.PI); // peaks in middle

  // Generate pseudo-random slice data derived from frame number
  const slices = Array.from({ length: 8 }, (_, i) => {
    const seed = (localFrame * 13 + i * 37) % 100;
    return {
      y: (i / 8) * 100 + (seed % 8),
      height: 6 + (seed % 14),
      offsetX: (seed % 30 - 15) * intensity,
      opacity: 0.6 + (seed % 40) * 0.01 * intensity,
    };
  });

  const overallOpacity = interpolate(localFrame, [0, 3, durationFrames - 3, durationFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100, opacity: overallOpacity }}>
      {/* Red channel shift */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255,0,0,0.08)',
          transform: `translateX(${8 * intensity}px)`,
          mixBlendMode: 'screen',
        }}
      />
      {/* Blue channel shift */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,100,255,0.08)',
          transform: `translateX(${-8 * intensity}px)`,
          mixBlendMode: 'screen',
        }}
      />
      {/* Horizontal scan slices */}
      {slices.map((slice, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${slice.y}%`,
            left: 0,
            right: 0,
            height: `${slice.height}px`,
            backgroundColor: 'rgba(59,130,246,0.15)',
            transform: `translateX(${slice.offsetX}px)`,
            opacity: slice.opacity,
          }}
        />
      ))}
      {/* Full flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFF',
          opacity: localFrame === 0 ? 0.4 : localFrame === 1 ? 0.2 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
