import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SCENES } from '../constants';
import { LoadingBar } from './LoadingBar';
import { FakeWebsiteOld } from './FakeWebsiteOld';
import { Headline } from './Typography';

// 3 mini-scenes each 50 frames (1.67s) – 150 frames total
const MINI_DURATION = 50;
const MINI_SCENES = [
  { label: 'Langsam.', startFrame: 0 },
  { label: 'Unmodern.', startFrame: MINI_DURATION },
  { label: 'Unsichtbar.', startFrame: MINI_DURATION * 2 },
];

interface MiniSceneWrapperProps {
  localFrame: number;
  label: string;
  children: React.ReactNode;
}

const MiniSceneWrapper: React.FC<MiniSceneWrapperProps> = ({ localFrame, label, children }) => {
  const { fps } = useVideoConfig();

  const opacity = interpolate(localFrame, [0, 6, MINI_DURATION - 6, MINI_DURATION], [0, 1, 1, 0], {
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
const MouseLeave: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  const cursorX = interpolate(localFrame, [0, MINI_DURATION], [500, 900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => t * t,
  });

  return (
    <div
      style={{
        width: 680,
        height: 220,
        backgroundColor: '#111118',
        borderRadius: 16,
        border: '1px solid #2A2A3A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fake page content */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ width: 200, height: 20, backgroundColor: '#222', borderRadius: 4, marginBottom: 12 }} />
        <div style={{ width: '80%', height: 12, backgroundColor: '#1A1A1A', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ width: '60%', height: 12, backgroundColor: '#1A1A1A', borderRadius: 4, marginBottom: 24 }} />
        {/* Ghost button */}
        <div
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            backgroundColor: COLORS.accent,
            borderRadius: 8,
            color: '#FFF',
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
          borderLeft: '14px solid #FFF',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))',
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
          background: 'linear-gradient(to left, rgba(239,68,68,0.15), transparent)',
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
      {localFrame >= MINI_SCENES[0].startFrame && localFrame < MINI_SCENES[0].startFrame + MINI_DURATION && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[0].startFrame} label="Langsam.">
          <LoadingBar targetPercent={23} localFrame={localFrame - MINI_SCENES[0].startFrame} totalFrames={MINI_DURATION} />
        </MiniSceneWrapper>
      )}
      {localFrame >= MINI_SCENES[1].startFrame && localFrame < MINI_SCENES[1].startFrame + MINI_DURATION && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[1].startFrame} label="Unmodern.">
          <FakeWebsiteOld />
        </MiniSceneWrapper>
      )}
      {localFrame >= MINI_SCENES[2].startFrame && localFrame < MINI_SCENES[2].startFrame + MINI_DURATION && (
        <MiniSceneWrapper localFrame={localFrame - MINI_SCENES[2].startFrame} label="Unsichtbar.">
          <MouseLeave localFrame={localFrame - MINI_SCENES[2].startFrame} />
        </MiniSceneWrapper>
      )}
    </>
  );
};
