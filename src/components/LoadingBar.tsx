import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface LoadingBarProps {
  targetPercent?: number;
  localFrame: number;
  totalFrames: number;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  targetPercent = 23,
  localFrame,
  totalFrames,
}) => {
  const barWidth = 600;

  // Quickly fills to targetPercent then freezes / wobbles slightly
  const fillProgress = interpolate(localFrame, [0, totalFrames * 0.4], [0, targetPercent], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle stuck wobble after fill
  const wobble = localFrame > totalFrames * 0.4
    ? Math.sin(localFrame * 0.6) * 0.8
    : 0;

  const fillPercent = fillProgress + wobble;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Browser chrome mock */}
      <div
        style={{
          width: 680,
          backgroundColor: '#1A1A1A',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #2A2A2A',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #222',
            gap: 10,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#28C840' }} />
          <div
            style={{
              flex: 1,
              height: 32,
              backgroundColor: '#252525',
              borderRadius: 8,
              marginLeft: 10,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 14,
            }}
          >
            <span style={{ color: '#555', fontSize: 18, fontFamily: 'monospace' }}>
              meinewebsite.de
            </span>
          </div>
        </div>

        {/* Loading content area */}
        <div style={{ padding: '40px 30px', minHeight: 140 }}>
          <div
            style={{
              width: '100%',
              height: 12,
              backgroundColor: '#222',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${fillPercent}%`,
                height: '100%',
                backgroundColor: COLORS.accent,
                borderRadius: 6,
                transition: 'width 0.1s',
                boxShadow: `0 0 12px ${COLORS.accent}80`,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 16,
              color: '#555',
              fontSize: 20,
              fontFamily: 'monospace',
              textAlign: 'center',
            }}
          >
            {Math.round(fillPercent)}%
          </div>
        </div>
      </div>
    </div>
  );
};
