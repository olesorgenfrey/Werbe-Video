import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../constants';

interface FakeWebsiteModernProps {
  localFrame: number;
}

// A clean, modern SaaS-style website mock that assembles itself
export const FakeWebsiteModern: React.FC<FakeWebsiteModernProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Navbar slides in from top
  const navY = spring({
    fps,
    frame: localFrame,
    config: { damping: 18, stiffness: 180, mass: 0.5 },
    from: -80,
    to: 0,
  });

  // Hero text fades up
  const heroOpacity = interpolate(localFrame, [8, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const heroY = spring({
    fps,
    frame: Math.max(0, localFrame - 8),
    config: { damping: 20, stiffness: 160, mass: 0.6 },
    from: 40,
    to: 0,
  });

  // Buttons animate in
  const btnOpacity = interpolate(localFrame, [18, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnScale = spring({
    fps,
    frame: Math.max(0, localFrame - 18),
    config: { damping: 16, stiffness: 200, mass: 0.5 },
    from: 0.8,
    to: 1,
  });

  // Feature cards stagger in
  const card1Opacity = interpolate(localFrame, [24, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Opacity = interpolate(localFrame, [28, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card3Opacity = interpolate(localFrame, [32, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 700,
        backgroundColor: COLORS.bg,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${COLORS.dark}`,
        boxShadow: `0 0 60px ${COLORS.accent}22`,
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 28px',
          borderBottom: `1px solid ${COLORS.dark}`,
          transform: `translateY(${navY}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: COLORS.accent,
              boxShadow: `0 0 16px ${COLORS.accent}66`,
            }}
          />
          <span style={{ color: COLORS.text, fontSize: 20, fontWeight: 700 }}>studio</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Features', 'Preise', 'Kontakt'].map((item) => (
            <span key={item} style={{ color: COLORS.gray, fontSize: 16, fontWeight: 500 }}>
              {item}
            </span>
          ))}
        </div>
        <div
          style={{
            padding: '8px 20px',
            backgroundColor: COLORS.accent,
            borderRadius: 8,
            color: COLORS.bg,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Start
        </div>
      </div>

      {/* Hero section */}
      <div
        style={{
          padding: '40px 28px 28px',
          opacity: heroOpacity,
          transform: `translateY(${heroY}px)`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '5px 14px',
            backgroundColor: `${COLORS.accent}18`,
            border: `1px solid ${COLORS.accent}44`,
            borderRadius: 100,
            color: COLORS.accent,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          ✦ Neue Version verfügbar
        </div>
        <div style={{ color: COLORS.text, fontSize: 36, fontWeight: 900, letterSpacing: -1, lineHeight: 1.15 }}>
          Websites die
          <br />
          <span style={{ color: COLORS.accent }}>wirklich verkaufen.</span>
        </div>
        <div style={{ color: COLORS.gray, fontSize: 18, marginTop: 14, lineHeight: 1.5 }}>
          Schnell. Modern. Automatisch.
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 24,
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            transformOrigin: 'left center',
          }}
        >
          <div
            style={{
              padding: '14px 28px',
              backgroundColor: COLORS.accent,
              borderRadius: 10,
              color: COLORS.bg,
              fontSize: 17,
              fontWeight: 700,
              boxShadow: `0 0 24px ${COLORS.accent}44`,
            }}
          >
            Jetzt starten →
          </div>
          <div
            style={{
              padding: '14px 28px',
              backgroundColor: 'transparent',
              border: `1.5px solid ${COLORS.dark}`,
              borderRadius: 10,
              color: COLORS.gray,
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            Demo ansehen
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'flex', gap: 12, padding: '0 28px 28px' }}>
        {[
          { label: 'Schnell', icon: '⚡', opacity: card1Opacity },
          { label: 'Modern', icon: '✦', opacity: card2Opacity },
          { label: 'Sicher', icon: '🔒', opacity: card3Opacity },
        ].map(({ label, icon, opacity }) => (
          <div
            key={label}
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              border: `1px solid ${COLORS.dark}`,
              borderRadius: 12,
              padding: '16px 18px',
              opacity,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
            <div style={{ color: COLORS.text, fontSize: 17, fontWeight: 700 }}>{label}</div>
            <div
              style={{
                width: '70%',
                height: 6,
                backgroundColor: COLORS.dark,
                borderRadius: 3,
                marginTop: 8,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
