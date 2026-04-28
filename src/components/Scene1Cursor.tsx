import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';

const FULL_TEXT = 'Deine Website...';
// Typing covers frames 0-40, cursor blinks until end of scene (60 frames)
const CHARS = FULL_TEXT.length; // 16
const FRAMES_PER_CHAR = 2.5;

export const Scene1Cursor: React.FC = () => {
  const frame = useCurrentFrame();

  const visibleChars = Math.min(CHARS, Math.floor(frame / FRAMES_PER_CHAR));
  const displayedText = FULL_TEXT.slice(0, visibleChars);

  // Cursor blinks at ~8fps feel
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -2,
            whiteSpace: 'nowrap',
          }}
        >
          {displayedText}
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 80,
            backgroundColor: COLORS.accent,
            borderRadius: 2,
            opacity: cursorVisible ? 1 : 0,
            marginLeft: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
