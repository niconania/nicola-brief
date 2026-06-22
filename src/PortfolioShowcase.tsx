import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  Sequence,
} from "remotion";
import { projects } from "./projects";

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 400], {
    extrapolateRight: "clamp",
  });

  const nameScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, mass: 0.8 } });
  const titleOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [25, 50], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const tagOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [45, 65], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const dot1 = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 10 } });
  const dot2 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 10 } });
  const dot3 = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 10 } });

  const exitOpacity = interpolate(frame, [80, 95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", opacity: exitOpacity }}>
      {/* Decorative dots */}
      <div style={{ position: "absolute", top: 120, left: 180, width: 12, height: 12, borderRadius: "50%", background: "#c0c0c0", transform: `scale(${dot1})`, opacity: 0.3 }} />
      <div style={{ position: "absolute", top: 200, right: 250, width: 8, height: 8, borderRadius: "50%", background: "#e8e8e8", transform: `scale(${dot2})`, opacity: 0.2 }} />
      <div style={{ position: "absolute", bottom: 180, left: 300, width: 10, height: 10, borderRadius: "50%", background: "#888", transform: `scale(${dot3})`, opacity: 0.25 }} />

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 80, right: 200, width: 1, height: interpolate(frame, [10, 50], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), background: "linear-gradient(180deg, transparent, rgba(192,192,192,0.15), transparent)" }} />
      <div style={{ position: "absolute", bottom: 100, left: 150, width: interpolate(frame, [15, 55], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), height: 1, background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.15), transparent)" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Top line */}
        <div style={{ position: "absolute", top: "38%", width: lineWidth, height: 2, background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)", transform: "translateY(-60px)" }} />

        <div style={{ textAlign: "center", transform: `scale(${nameScale})` }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 90, fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: -2, lineHeight: 1 }}>
            NICOLA NANIA
          </h1>
        </div>

        {/* Bottom line */}
        <div style={{ position: "absolute", top: "52%", width: lineWidth, height: 2, background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)", transform: "translateY(20px)" }} />

        <p style={{ position: "absolute", top: "56%", fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 300, color: "#c0c0c0", letterSpacing: 12, textTransform: "uppercase", opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          Graphic Designer
        </p>

        <div style={{ position: "absolute", top: "65%", display: "flex", gap: 24, opacity: tagOpacity, transform: `translateY(${tagY}px)` }}>
          {["Branding", "Social Media", "Print", "Motion"].map((tag) => (
            <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#666", border: "1px solid #333", padding: "6px 18px", borderRadius: 20, letterSpacing: 2, textTransform: "uppercase" }}>
              {tag}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TabletMockup: React.FC<{
  imageUrl: string;
  rotation?: number;
  scale?: number;
}> = ({ imageUrl, rotation = 0, scale = 1 }) => {
  return (
    <div style={{
      width: 500,
      height: 360,
      borderRadius: 24,
      background: "#1a1a1a",
      border: "3px solid #333",
      padding: 16,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
        background: "#111",
      }}>
        <Img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Camera dot */}
      <div style={{ position: "absolute", top: "50%", left: 8, width: 6, height: 6, borderRadius: "50%", background: "#222", transform: "translateY(-50%)" }} />
    </div>
  );
};

const LaptopMockup: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Screen */}
      <div style={{
        width: 620,
        height: 388,
        borderRadius: "16px 16px 0 0",
        background: "#1a1a1a",
        border: "3px solid #333",
        borderBottom: "none",
        padding: "12px 12px 0 12px",
        boxShadow: "0 -10px 60px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}>
        {/* Browser bar */}
        <div style={{ height: 28, background: "#222", borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", paddingLeft: 10, gap: 6, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          <div style={{ marginLeft: 20, height: 16, flex: 1, maxWidth: 300, background: "#1a1a1a", borderRadius: 4 }} />
        </div>
        <div style={{ width: "100%", height: "calc(100% - 30px)", overflow: "hidden", background: "#111" }}>
          <Img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      {/* Base */}
      <div style={{ width: 700, height: 14, background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)", borderRadius: "0 0 12px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
      <div style={{ width: 200, height: 4, background: "#222", borderRadius: "0 0 4px 4px" }} />
    </div>
  );
};

const PhoneMockup: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div style={{
      width: 200,
      height: 420,
      borderRadius: 32,
      background: "#1a1a1a",
      border: "3px solid #333",
      padding: 10,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      position: "relative",
    }}>
      {/* Notch */}
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 60, height: 20, background: "#1a1a1a", borderRadius: "0 0 12px 12px", zIndex: 2 }} />
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: 24,
        overflow: "hidden",
        background: "#111",
      }}>
        <Img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
};

const ProjectSlide: React.FC<{
  project: typeof projects[0];
  index: number;
  variant: "tablet" | "laptop" | "multi";
}> = ({ project, index, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterScale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const enterX = interpolate(frame, [0, 20], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [10, 25], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const lineW = interpolate(frame, [15, 40], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [50, 60], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const numberOpacity = interpolate(frame, [5, 18], [0, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const floatY = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", opacity: exitOpacity }}>
      {/* Large background number */}
      <div style={{
        position: "absolute",
        right: -40,
        top: "10%",
        fontFamily: "'Inter', sans-serif",
        fontSize: 500,
        fontWeight: 900,
        color: "#fff",
        opacity: numberOpacity,
        lineHeight: 1,
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Gradient accent */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        opacity: interpolate(frame, [5, 30], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }} />

      {/* Content */}
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 120px" }}>
        {/* Left: Text */}
        <div style={{ flex: "0 0 400px", opacity: textOpacity, transform: `translateY(${textY}px)` }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: project.color,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}>
            {project.category}
          </span>

          <div style={{ width: lineW, height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)`, margin: "16px 0" }} />

          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}>
            {project.title}
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "#555",
            marginTop: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}>
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        {/* Right: Device mockup */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateX(${enterX}px) scale(${enterScale}) translateY(${floatY}px)`,
        }}>
          {variant === "tablet" && (
            <TabletMockup imageUrl={project.coverUrl} rotation={-3} />
          )}
          {variant === "laptop" && (
            <LaptopMockup imageUrl={project.coverUrl} />
          )}
          {variant === "multi" && (
            <div style={{ position: "relative" }}>
              <div style={{ transform: "translateX(-60px)" }}>
                <TabletMockup imageUrl={project.coverUrl} rotation={-5} scale={0.85} />
              </div>
              <div style={{ position: "absolute", right: -80, bottom: -30 }}>
                <PhoneMockup imageUrl={project.coverUrl} />
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const GridShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitOpacity = interpolate(frame, [85, 95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", opacity: exitOpacity }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          padding: 80,
          width: "100%",
        }}>
          {projects.map((project, i) => {
            const delay = i * 4;
            const itemScale = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12 } });
            const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                transform: `scale(${itemScale})`,
                opacity: itemOpacity,
                borderRadius: 16,
                overflow: "hidden",
                border: "2px solid #222",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                aspectRatio: "4/3",
                position: "relative",
              }}>
                <Img src={project.coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 14px 10px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
                    {project.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14 } });
  const lineW = interpolate(frame, [10, 45], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaY = interpolate(frame, [30, 50], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pulse = 1 + Math.sin(frame * 0.08) * 0.02;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: lineW, height: 2, background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)", margin: "0 auto 30px" }} />

          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            letterSpacing: -2,
            transform: `scale(${nameScale})`,
          }}>
            NICOLA NANIA
          </h1>

          <div style={{ width: lineW, height: 2, background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)", margin: "30px auto" }} />

          <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)` }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              color: "#888",
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 40,
            }}>
              Let's create something amazing
            </p>

            <div style={{
              display: "inline-flex",
              border: "1px solid #333",
              borderRadius: 30,
              padding: "14px 40px",
              transform: `scale(${pulse})`,
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#c0c0c0",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}>
                behance.net/nicolanania1
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const PortfolioShowcase: React.FC = () => {
  const variants: Array<"tablet" | "laptop" | "multi"> = [
    "laptop", "tablet", "multi", "laptop", "tablet", "multi", "laptop", "tablet",
  ];

  return (
    <AbsoluteFill>
      {/* Intro: 0-95 */}
      <Sequence from={0} durationInFrames={95}>
        <IntroScene />
      </Sequence>

      {/* Project slides: each 65 frames */}
      {projects.map((project, i) => (
        <Sequence key={i} from={95 + i * 55} durationInFrames={65}>
          <ProjectSlide project={project} index={i} variant={variants[i]} />
        </Sequence>
      ))}

      {/* Grid showcase: after all slides */}
      <Sequence from={95 + projects.length * 55} durationInFrames={100}>
        <GridShowcase />
      </Sequence>

      {/* Outro */}
      <Sequence from={95 + projects.length * 55 + 100} durationInFrames={90}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
