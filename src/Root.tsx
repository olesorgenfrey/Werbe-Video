import { Composition } from 'remotion';
import { WebsiteHookIntro } from './WebsiteHookIntro';
import { DURATION_FRAMES, FPS } from './constants';

export const Root: React.FC = () => {
  return (
    <Composition
      id="WebsiteHookIntro"
      component={WebsiteHookIntro}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
