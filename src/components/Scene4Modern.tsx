import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SCENES } from '../constants';
import { FakeWebsiteModern } from './FakeWebsiteModern';
import { GlitchOverlay } from './GlitchOverlay';
import { Headline } from './Typography';

export const Scene4Modern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - SCENES.s4Start;

  // Glitch transition at start (frames 0-12)
  const GLITCH_END = 12;
  const CONTENT_START = 10;

  const contentOpacity = interpolate(localFrame, [CONTENT_START, CONTENT_START + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Das geht besser." text
  const TEXT_START = 28;
  const textOpacity = interpolate(localFrame, [TEXT_START, TEXT_START + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = spring({
    fps,
    frame: Math.max(0, localFrame - TEXT_START),
    config: { damping: 18, stiffness: 180, mass: 0.6 },
    from: 40,
    to: 0,
  });

  // Accent underline
  const UNDERLINE_START = TEXT_START + 8;
  const underlineWidth = interpolate(localFrame, [UNDERLINE_START, UNDERLINE_START + 18], [0, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene fade out
  const overallOpacity = interpolate(localFrame, [54, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 52,
        opacity: overallOpacity,
      }}
    >
      {/* Glitch transition */}
      <GlitchOverlay startFrame={SCENES.s4Start} durationFrames={GLITCH_END} />

      {/* Modern website mock */}
      <div style={{ opacity: contentOpacity }}>
        <FakeWebsiteModern localFrame={Math.max(0, localFrame - CONTENT_START)} />
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        <Headline size={100} weight={900} style={{ letterSpacing: -4 }}>
          Das geht besser.
        </Headline>
        <div
          style={{
            height: 7,
            backgroundColor: COLORS.accent,
            borderRadius: 4,
            width: underlineWidth,
            marginTop: 6,
            boxShadow: `0 0 20px ${COLORS.accent}88`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
