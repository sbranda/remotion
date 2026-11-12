import { Composition } from "remotion";
import { Story, STORY_DURATION } from "./Story";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="NadieEstaSolo"
    component={Story}
    durationInFrames={STORY_DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);
