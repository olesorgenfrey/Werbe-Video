import { createRoot } from 'react-dom/client';
import { Player } from '@remotion/player';
import { WebsiteHookIntro } from './WebsiteHookIntro';
import { DURATION_FRAMES, FPS } from './constants';

const root = createRoot(document.getElementById('preview-root')!);

root.render(
  <Player
    component={WebsiteHookIntro}
    durationInFrames={DURATION_FRAMES}
    fps={FPS}
    compositionWidth={1080}
    compositionHeight={1920}
    style={{
      width: 360,
      height: 640,
    }}
    controls
    autoPlay
    loop
  />,
);
