import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SCENES } from '../constants';
import { LoadingBar } from './LoadingBar';
import { FakeWebsiteOld } from './FakeWebsiteOld';
import { Headline } from './Typography';

// Per-scene durations (frames): Langsam 30, Unmodern 60, Unsichtbar 45
const MINI_SCENES = [
  { label: 'Langsam.',    startFrame: 0,   duration: 30 },
  { label: 'Unmodern.',   startFrame: 30,  duration: 60 },
  { label: 'Unsichtbar.', startFrame: 90,  duration: 45 },
];

interface MiniSceneWrapperProps {
  localFrame: number;
  duration: number;
  label: string;
  children: React.ReactNode;
}

const MiniSceneWrapper: React.FC<MiniSceneWrapperProps> = ({ localFrame, duration, label, children }) => {
  const { fps } = useVideoConfig();

  const opacity = interpolate(localFrame, [0, 6, duration - 6, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame: localFrame,
    config: { damping: 20, stiffness: 220, mass: 0.5 },
    from: 0.92,
    to: 1,
  });

  const labelY = spring({
    fps,
    frame: Math.max(0, localFrame - 10),
    config: { damping: 18, stiffness: 200, mass: 0.5 },
    from: 30,
    to: 0,
  });
  const labelOpacity = interpolate(localFrame, [10, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 40,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ transform: 'scale(0.85)' }}>{children}</div>
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <Headline
          size={112}
          weight={900}
          color={COLORS.text}
          style={{ letterSpacing: -4 }}
        >
          {label}
        </Headline>
      </div>
    </AbsoluteFill>
  );
};

// Mini-scene 3: cursor leaving (mouse click visual)
const MouseLeave: React.FC<{ localFrame: number; totalFrames: number }> = ({ localFrame, totalFrames }) => {
  const { fps } = useVideoConfig();
  const cursorX = interpolate(localFrame, [0, totalFrames], [500, 900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => t * t,
  });

  return (
    <div
      style={{
        width: 680,
        height: 220,
        backgroundColor: COLORS.bg,
        borderRadius: 16,
        border: `1px solid ${COLORS.dark}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fake page content */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ width: 200, height: 20, backgroundColor: COLORS.dark, borderRadius: 4, marginBottom: 12 }} />
        <div style={{ width: '80%', height: 12, backgroundColor: COLORS.dark, borderRadius: 4, marginBottom: 8 }} />
        <div style={{ width: '60%', height: 12, backgroundColor: COLORS.dark, borderRadius: 4, marginBottom: 24 }} />
        {/* Ghost button */}
        <div
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            backgroundColor: COLORS.accent,
            borderRadius: 8,
            color: COLORS.bg,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Mehr erfahren
        </div>
      </div>
      {/* Mouse cursor moving away */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: cursorX,
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderLeft: `14px solid ${COLORS.text}`,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          filter: `drop-shadow(0 0 6px ${COLORS.accent}66)`,
        }}
      />
      {/* Leaving indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: interpolate(cursorX, [400, 900], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          height: '100%',
          background: `linear-gradient(to left, rgba(196,81,45,0.15), transparent)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export const Scene3MiniCuts: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - SCENES.s3Start;

  return (
    <>
      {localFrame >= MINI_SCENES[0].startFrame && localFrame < MINI_SCENES[0].startFrame + MINI_SCENES[0].duration && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[0].startFrame} duration={MINI_SCENES[0].duration} label="Langsam.">
          <LoadingBar targetPercent={23} localFrame={localFrame - MINI_SCENES[0].startFrame} totalFrames={MINI_SCENES[0].duration} />
        </MiniSceneWrapper>
      )}
      {localFrame >= MINI_SCENES[1].startFrame && localFrame < MINI_SCENES[1].startFrame + MINI_SCENES[1].duration && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[1].startFrame} duration={MINI_SCENES[1].duration} label="Unmodern.">
          <FakeWebsiteOld />
        </MiniSceneWrapper>
      )}
      {localFrame >= MINI_SCENES[2].startFrame && localFrame < MINI_SCENES[2].startFrame + MINI_SCENES[2].duration && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[2].startFrame} duration={MINI_SCENES[2].duration} label="Unsichtbar.">
          <MouseLeave localFrame={localFrame - MINI_SCENES[2].startFrame} totalFrames={MINI_SCENES[2].duration} />
        </MiniSceneWrapper>
      )}
    </>
  );
};
