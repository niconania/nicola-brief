import { Composition } from "remotion";
import { PortfolioShowcase } from "./PortfolioShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PortfolioReel"
      component={PortfolioShowcase}
      durationInFrames={700}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
