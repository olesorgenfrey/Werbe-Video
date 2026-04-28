import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SCENES } from '../constants';

const FULL_TEXT = 'Deine Website...';
const NEW_TEXT = '...kostet dich Kunden.';

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Local frame within scene (scene starts at SCENES.s2Start)
  const localFrame = frame - SCENES.s2Start;

  // Backspace phase: frames 0-18 → delete all 16 chars
  const backspacePhaseEnd = 18;
  const deletedChars = Math.min(FULL_TEXT.length, Math.floor(localFrame / (backspacePhaseEnd / FULL_TEXT.length)));
  const remainingText = FULL_TEXT.slice(0, FULL_TEXT.length - deletedChars);

  // New text phase: starts at frame 24, each char every 1 frame → done by frame ~46
  const newTextStart = 24;
  const newTextLocalFrame = Math.max(0, localFrame - newTextStart);
  const newCharsVisible = Math.min(NEW_TEXT.length, Math.floor(newTextLocalFrame / 1.0));
  const displayNewText = NEW_TEXT.slice(0, newCharsVisible);
  const showNewText = localFrame >= newTextStart;

  // Scale spring for new text
  const scale = spring({
    fps,
    frame: Math.max(0, localFrame - newTextStart),
    config: { damping: 16, stiffness: 200, mass: 0.6 },
    from: 0.82,
    to: 1,
  });

  // Screen shake on new text reveal
  const shakeAmp = interpolate(localFrame, [newTextStart, newTextStart + 8], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = showNewText ? Math.sin(localFrame * 3.7) * shakeAmp : 0;
  const shakeY = showNewText ? Math.cos(localFrame * 5.1) * shakeAmp * 0.5 : 0;

  const cursorVisible = Math.floor(localFrame / 7) % 2 === 0;
  const showCursor = !showNewText || newCharsVisible < NEW_TEXT.length;

  // Fade out at end of scene (60 frames total)
  const overallOpacity = interpolate(localFrame, [52, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        opacity: overallOpacity,
      }}
    >
      {!showNewText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
            {remainingText}
          </span>
          {showCursor && (
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
          )}
        </div>
      )}

      {showNewText && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${scale})`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 88,
              fontWeight: 900,
              color: COLORS.text,
              letterSpacing: -3,
              textAlign: 'center',
              lineHeight: 1.1,
              padding: '0 60px',
            }}
          >
            {displayNewText}
            {showCursor && newCharsVisible < NEW_TEXT.length && (
              <span
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 84,
                  backgroundColor: COLORS.accent,
                  borderRadius: 2,
                  opacity: cursorVisible ? 1 : 0,
                  marginLeft: 4,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </span>
          {/* Red accent underline */}
          {newCharsVisible === NEW_TEXT.length && (
            <div
              style={{
                marginTop: 16,
                height: 6,
                backgroundColor: COLORS.accent,
                borderRadius: 3,
                width: interpolate(localFrame, [newTextStart + NEW_TEXT.length, newTextStart + NEW_TEXT.length + 12], [0, 700], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
