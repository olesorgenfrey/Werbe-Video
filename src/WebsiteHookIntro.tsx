import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, SCENES } from './constants';
import { Scene1Cursor } from './components/Scene1Cursor';
import { Scene2Problem } from './components/Scene2Problem';
import { Scene3MiniCuts } from './components/Scene3MiniCuts';
import { Scene4Modern } from './components/Scene4Modern';
import { Scene5CTA } from './components/Scene5CTA';

export const WebsiteHookIntro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: 'hidden',
      }}
    >
      <Audio src={staticFile('voiceover.mp3')} />
      {frame < SCENES.s1End && <Scene1Cursor />}
      {frame >= SCENES.s2Start && frame < SCENES.s2End && <Scene2Problem />}
      {frame >= SCENES.s3Start && frame < SCENES.s3End && <Scene3MiniCuts />}
      {frame >= SCENES.s4Start && frame < SCENES.s4End && <Scene4Modern />}
      {frame >= SCENES.s5Start && <Scene5CTA />}
    </AbsoluteFill>
  );
};
