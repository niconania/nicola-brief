import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1628",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            color: "#e8e8e8",
            margin: 0,
          }}
        >
          Nicola Nania
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#8899aa",
            marginTop: 16,
          }}
        >
          Web Design
        </p>
      </div>
    </AbsoluteFill>
  );
};
