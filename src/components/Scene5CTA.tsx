import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SCENES } from '../constants';
import { Headline, Subtext } from './Typography';

const SUBTEXT_WORDS = ['Schnell.', 'Modern.', 'Automatisch.'];

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - SCENES.s5Start;

  // Main headline springs in
  const headlineScale = spring({
    fps,
    frame: localFrame,
    config: { damping: 20, stiffness: 160, mass: 0.7 },
    from: 0.85,
    to: 1,
  });
  const headlineOpacity = interpolate(localFrame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Accent underline animates after headline
  const UNDERLINE_START = 16;
  const underlineWidth = interpolate(localFrame, [UNDERLINE_START, UNDERLINE_START + 28], [0, 820], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtext words stagger in
  const SUBTEXT_START = 30;
  const subtextOpacity = interpolate(localFrame, [SUBTEXT_START, SUBTEXT_START + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtextY = spring({
    fps,
    frame: Math.max(0, localFrame - SUBTEXT_START),
    config: { damping: 18, stiffness: 200, mass: 0.5 },
    from: 24,
    to: 0,
  });

  // Glow pulse
  const glowOpacity = interpolate(
    (localFrame % 50) / 50,
    [0, 0.5, 1],
    [0.4, 0.8, 0.4],
  );

  // Bottom badge / tag
  const BADGE_START = 48;
  const badgeOpacity = interpolate(localFrame, [BADGE_START, BADGE_START + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeY = spring({
    fps,
    frame: Math.max(0, localFrame - BADGE_START),
    config: { damping: 16, stiffness: 180, mass: 0.5 },
    from: 30,
    to: 0,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent}${Math.round(glowOpacity * 40).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Main headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `scale(${headlineScale})`,
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        <Headline size={92} weight={900} style={{ letterSpacing: -3, lineHeight: 1.05 }}>
          Wir bauen Websites,
          <br />
          die{' '}
          <span style={{ color: COLORS.accent, textShadow: `0 0 40px ${COLORS.accent}66` }}>
            verkaufen.
          </span>
        </Headline>
      </div>

      {/* Accent underline */}
      <div
        style={{
          marginTop: 20,
          height: 6,
          backgroundColor: COLORS.accent,
          borderRadius: 3,
          width: underlineWidth,
          boxShadow: `0 0 24px ${COLORS.accent}88`,
        }}
      />

      {/* Subtext */}
      <div
        style={{
          marginTop: 36,
          opacity: subtextOpacity,
          transform: `translateY(${subtextY}px)`,
          display: 'flex',
          gap: 20,
          alignItems: 'center',
        }}
      >
        {SUBTEXT_WORDS.map((word, i) => (
          <React.Fragment key={word}>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 44,
                fontWeight: 600,
                color: i === 2 ? COLORS.accent : COLORS.grayLight,
                letterSpacing: -0.5,
              }}
            >
              {word}
            </span>
            {i < SUBTEXT_WORDS.length - 1 && (
              <span style={{ color: '#333', fontSize: 32 }}>·</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom CTA badge */}
      <div
        style={{
          marginTop: 64,
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          padding: '18px 40px',
          background: `linear-gradient(135deg, ${COLORS.accent}, #1D4ED8)`,
          borderRadius: 100,
          boxShadow: `0 0 40px ${COLORS.accent}55`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            color: '#FFF',
            fontSize: 32,
            fontWeight: 800,
            fontFamily: FONTS.sans,
            letterSpacing: -0.5,
          }}
        >
          Jetzt kostenlos beraten lassen →
        </span>
      </div>
    </AbsoluteFill>
  );
};
