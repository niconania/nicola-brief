import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  Sequence,
} from "remotion";
import { heroProjects, supportProjects, Project } from "./projects";

const chromeGradient =
  "linear-gradient(135deg, #e8e8e8, #a0a0a0, #e8e8e8, #777, #d0d0d0)";

const ChromeSphere: React.FC<{
  size: number;
  x: number;
  y: number;
  blur?: number;
  opacity?: number;
  scale?: number;
}> = ({ size, x, y, blur = 0, opacity = 1, scale = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0 30%, #888888 60%, #444444 80%, #222222)",
      boxShadow: `0 ${size / 4}px ${size / 2}px rgba(0,0,0,0.4), inset 0 -${size / 6}px ${size / 3}px rgba(0,0,0,0.3)`,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      opacity,
      transform: `scale(${scale})`,
    }}
  />
);

const ChromeRing: React.FC<{
  size: number;
  x: number;
  y: number;
  rotation?: number;
  blur?: number;
  opacity?: number;
  thickness?: number;
}> = ({ size, x, y, rotation = 0, blur = 0, opacity = 1, thickness = 4 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      border: `${thickness}px solid rgba(192,192,192,0.5)`,
      boxShadow: `0 0 ${thickness * 3}px rgba(192,192,192,0.15), inset 0 0 ${thickness * 2}px rgba(192,192,192,0.1)`,
      transform: `rotate(${rotation}deg) perspective(800px) rotateX(65deg)`,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      opacity,
    }}
  />
);

const ChromeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, mass: 0.8 },
  });
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [30, 55], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [5, 45], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sphere1Scale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 10 },
  });
  const sphere2Scale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 10 },
  });
  const sphere3Scale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 10 },
  });
  const float1 = Math.sin(frame * 0.04) * 15;
  const float2 = Math.cos(frame * 0.05) * 12;
  const ringRot = frame * 1.2;
  const exitOpacity = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [75, 90], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080f", opacity: exitOpacity }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(60,60,80,0.3) 0%, transparent 70%)",
        }}
      />

      <ChromeSphere
        size={120}
        x={150}
        y={100}
        blur={8}
        opacity={0.4}
        scale={sphere1Scale}
      />
      <ChromeSphere
        size={60}
        x={1650}
        y={200}
        blur={12}
        opacity={0.3}
        scale={sphere2Scale}
      />
      <ChromeSphere
        size={80}
        x={200}
        y={750}
        blur={10}
        opacity={0.25}
        scale={sphere3Scale}
      />

      <ChromeRing
        size={200}
        x={1500}
        y={600}
        rotation={ringRot}
        blur={6}
        opacity={0.2}
      />
      <ChromeRing
        size={150}
        x={100}
        y={500}
        rotation={-ringRot}
        blur={4}
        opacity={0.15}
      />

      <div style={{ transform: `translateY(${float1}px)` }}>
        <ChromeSphere
          size={40}
          x={1700}
          y={450}
          scale={sphere1Scale}
          opacity={0.7}
        />
      </div>
      <div style={{ transform: `translateY(${float2}px)` }}>
        <ChromeSphere
          size={25}
          x={180}
          y={380}
          scale={sphere2Scale}
          opacity={0.6}
        />
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${exitScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "36%",
            width: lineW,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #c0c0c0, #e8e8e8, #c0c0c0, transparent)",
          }}
        />

        <div style={{ textAlign: "center", transform: `scale(${nameScale})` }}>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 100,
              fontWeight: 800,
              margin: 0,
              letterSpacing: -3,
              lineHeight: 1,
              background: chromeGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NICOLA NANIA
          </h1>
        </div>

        <div
          style={{
            position: "absolute",
            top: "53%",
            width: lineW,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #c0c0c0, #e8e8e8, #c0c0c0, transparent)",
          }}
        />

        <p
          style={{
            position: "absolute",
            top: "57%",
            fontFamily: "'Inter', sans-serif",
            fontSize: 30,
            fontWeight: 300,
            letterSpacing: 16,
            textTransform: "uppercase",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            background: "linear-gradient(90deg, #888, #d0d0d0, #888)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Graphic Designer
        </p>

        <div
          style={{
            position: "absolute",
            top: "67%",
            display: "flex",
            gap: 20,
            opacity: tagOpacity,
          }}
        >
          {["Social Media", "Print Design", "Motion Graphics", "Branding"].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#999",
                  border: "1px solid #333",
                  padding: "8px 20px",
                  borderRadius: 20,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.08))",
                }}
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LaptopRotation: React.FC<{ project: Project }> = ({ project }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotateY = interpolate(frame, [10, 120], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const normalizedAngle = ((rotateY % 360) + 360) % 360;
  const isFacingForward = normalizedAngle < 90 || normalizedAngle > 270;

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleX = interpolate(frame, [15, 35], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const categoryOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [20, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const float1 = Math.sin(frame * 0.05) * 10;
  const float2 = Math.cos(frame * 0.04) * 15;

  const exitOpacity = interpolate(frame, [115, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080f", opacity: exitOpacity }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 60% 50%, ${project.color}18 0%, transparent 60%)`,
        }}
      />

      <div style={{ transform: `translateY(${float1}px)` }}>
        <ChromeSphere size={100} x={100} y={150} blur={15} opacity={0.2} />
      </div>
      <div style={{ transform: `translateY(${float2}px)` }}>
        <ChromeSphere size={70} x={1700} y={700} blur={12} opacity={0.15} />
      </div>
      <ChromeRing
        size={180}
        x={1550}
        y={100}
        rotation={frame * 0.8}
        blur={8}
        opacity={0.12}
      />

      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: `translateY(-50%) translateX(${titleX}px)`,
          opacity: titleOpacity,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: project.color,
            opacity: categoryOpacity,
          }}
        >
          {project.category}
        </span>

        <div
          style={{
            width: lineW,
            height: 3,
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
            margin: "18px 0",
          }}
        />

        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 68,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1,
            letterSpacing: -2,
            background: chromeGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {project.title}
        </h2>
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 68,
            fontWeight: 300,
            margin: 0,
            lineHeight: 1,
            letterSpacing: -2,
            color: "#555",
          }}
        >
          {project.subtitle}
        </h3>
      </div>

      <div
        style={{
          position: "absolute",
          right: 220,
          top: "50%",
          transform: `translateY(-55%) scale(${enterScale})`,
          perspective: 1200,
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotateY}deg)`,
            width: 550,
            height: 370,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: 16,
              background: "#1a1a1a",
              border: "3px solid #333",
              padding: 10,
              backfaceVisibility: "hidden",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                height: 28,
                background: "#222",
                borderRadius: "8px 8px 0 0",
                display: "flex",
                alignItems: "center",
                paddingLeft: 10,
                gap: 6,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff5f57",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#febc2e",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#28c840",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                background: "#111",
                borderRadius: "0 0 6px 6px",
              }}
            >
              {isFacingForward && (
                <Img
                  src={project.coverUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #2a2a2a, #1a1a1a, #2a2a2a)",
              border: "3px solid #333",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: chromeGradient,
                opacity: 0.25,
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: 600,
            height: 12,
            background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
            borderRadius: "0 0 10px 10px",
            marginLeft: -25,
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const HeroShowcase: React.FC<{
  project: Project;
  variant: "immersive" | "split";
}> = ({ project, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const slideX = interpolate(frame, [0, 25], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [10, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [15, 45], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [80, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [80, 95], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = Math.sin(frame * 0.04) * 8;
  const parallaxBg = frame * 0.3;
  const imgScale = interpolate(frame, [0, 100], [1.05, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (variant === "immersive") {
    return (
      <AbsoluteFill
        style={{ backgroundColor: "#08080f", opacity: exitOpacity }}
      >
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            left: "-10%",
            top: "-10%",
            filter: "blur(30px) brightness(0.3)",
            transform: `translateX(${-parallaxBg}px) scale(${imgScale})`,
          }}
        >
          <Img
            src={project.coverUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, rgba(8,8,15,0.8), ${project.color}20, rgba(8,8,15,0.9))`,
          }}
        />

        <div style={{ transform: `translateY(${float}px)` }}>
          <ChromeSphere size={35} x={1650} y={200} opacity={0.5} />
        </div>
        <ChromeSphere size={50} x={120} y={750} blur={6} opacity={0.2} />

        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              transform: `scale(${enterScale}) translateX(${slideX}px) translateY(${float}px)`,
              display: "flex",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 700,
                height: 480,
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.1)",
                boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${project.color}20`,
                position: "relative",
              }}
            >
              <Img
                src={project.coverUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${imgScale})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: chromeGradient,
                  opacity: 0.5,
                }}
              />
            </div>

            <div
              style={{
                opacity: textOpacity,
                transform: `translateY(${textY}px)`,
                maxWidth: 400,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  color: project.color,
                }}
              >
                {project.category}
              </span>

              <div
                style={{
                  width: lineW,
                  height: 3,
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  margin: "18px 0",
                }}
              />

              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 62,
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: -2,
                  background: chromeGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {project.title}
              </h2>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 62,
                  fontWeight: 300,
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: -2,
                  color: "#444",
                }}
              >
                {project.subtitle}
              </h3>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#08080f",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
          right: 0,
          background: `linear-gradient(180deg, ${project.color}08, ${project.color}15, ${project.color}08)`,
        }}
      />

      <ChromeSphere size={90} x={80} y={100} blur={12} opacity={0.15} />
      <ChromeRing
        size={140}
        x={1600}
        y={700}
        rotation={frame * 0.5}
        blur={5}
        opacity={0.1}
      />

      <div style={{ transform: `translateY(${float}px)` }}>
        <ChromeSphere size={28} x={1750} y={300} opacity={0.4} />
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            flex: "0 0 420px",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: project.color,
            }}
          >
            {project.category}
          </span>

          <div
            style={{
              width: lineW,
              height: 3,
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
              margin: "18px 0",
            }}
          />

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 72,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1,
              letterSpacing: -2,
              background: chromeGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {project.title}
          </h2>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 72,
              fontWeight: 300,
              margin: 0,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#444",
            }}
          >
            {project.subtitle}
          </h3>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `translateX(${slideX}px) scale(${enterScale}) translateY(${float}px)`,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 580,
                height: 400,
                borderRadius: 24,
                background: "#1a1a1a",
                border: "3px solid #333",
                padding: 14,
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${project.color}10`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <Img
                  src={project.coverUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${imgScale})`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                right: -50,
                bottom: -40,
                width: 160,
                height: 340,
                borderRadius: 28,
                background: "#1a1a1a",
                border: "3px solid #333",
                padding: 8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                transform: `scale(${spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } })})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 50,
                  height: 16,
                  background: "#1a1a1a",
                  borderRadius: "0 0 10px 10px",
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 22,
                  overflow: "hidden",
                }}
              >
                <Img
                  src={project.coverUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ProjectsMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitOpacity = interpolate(frame, [130, 145], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgShift = frame * 0.4;
  const headerOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#08080f", opacity: exitOpacity }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame * 0.02) * 10}% 50%, rgba(60,60,80,0.2), transparent 70%)`,
        }}
      />

      <ChromeSphere size={80} x={100} y={100} blur={15} opacity={0.12} />
      <ChromeSphere size={60} x={1700} y={800} blur={12} opacity={0.1} />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: headerOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#555",
          }}
        >
          Selected Works
        </span>
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            transform: `translateX(${-bgShift}px)`,
          }}
        >
          {supportProjects.map((project, i) => {
            const delay = i * 6;
            const itemScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 12 },
            });
            const itemOpacity = interpolate(
              frame,
              [delay, delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            const hoverY = Math.sin((frame + i * 20) * 0.05) * 6;

            return (
              <div
                key={i}
                style={{
                  transform: `scale(${itemScale}) translateY(${hoverY}px)`,
                  opacity: itemOpacity,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 220,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "2px solid #222",
                    boxShadow: `0 15px 50px rgba(0,0,0,0.4), 0 0 20px ${project.color}10`,
                    position: "relative",
                  }}
                >
                  <Img
                    src={project.coverUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "30px 14px 12px",
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.9))",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: 1,
                      }}
                    >
                      {project.title}
                    </span>
                    <br />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#888",
                        letterSpacing: 2,
                      }}
                    >
                      {project.subtitle}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: "80%",
                    height: 2,
                    background: chromeGradient,
                    margin: "8px auto 0",
                    opacity: 0.3,
                    borderRadius: 1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ChromeOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14 },
  });
  const lineW = interpolate(frame, [5, 45], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [35, 55], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame * 0.06) * 0.015;
  const sphere1Scale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 10 },
  });
  const sphere2Scale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10 },
  });
  const float1 = Math.sin(frame * 0.04) * 12;
  const float2 = Math.cos(frame * 0.05) * 10;
  const ringRot = frame * 0.6;

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080f" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(80,80,100,0.15), transparent 60%)",
        }}
      />

      <div style={{ transform: `translateY(${float1}px)` }}>
        <ChromeSphere
          size={70}
          x={200}
          y={180}
          blur={4}
          opacity={0.25}
          scale={sphere1Scale}
        />
      </div>
      <div style={{ transform: `translateY(${float2}px)` }}>
        <ChromeSphere
          size={45}
          x={1600}
          y={300}
          opacity={0.35}
          scale={sphere2Scale}
        />
      </div>
      <ChromeSphere
        size={30}
        x={1700}
        y={700}
        blur={8}
        opacity={0.15}
        scale={sphere1Scale}
      />
      <ChromeSphere
        size={55}
        x={150}
        y={700}
        blur={10}
        opacity={0.12}
        scale={sphere2Scale}
      />

      <ChromeRing
        size={160}
        x={1500}
        y={550}
        rotation={ringRot}
        blur={3}
        opacity={0.1}
        thickness={3}
      />
      <ChromeRing
        size={120}
        x={250}
        y={450}
        rotation={-ringRot}
        blur={5}
        opacity={0.08}
        thickness={2}
      />

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: lineW,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #c0c0c0, #e8e8e8, #c0c0c0, transparent)",
              margin: "0 auto 35px",
            }}
          />

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 80,
              fontWeight: 800,
              margin: 0,
              letterSpacing: -2,
              transform: `scale(${nameScale})`,
              background: chromeGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NICOLA NANIA
          </h1>

          <div
            style={{
              width: lineW,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #c0c0c0, #e8e8e8, #c0c0c0, transparent)",
              margin: "35px auto",
            }}
          />

          <div
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: 8,
                textTransform: "uppercase",
                marginBottom: 45,
                background: "linear-gradient(90deg, #777, #bbb, #777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let's create something amazing
            </p>

            <div
              style={{
                display: "inline-flex",
                border: "1px solid #333",
                borderRadius: 30,
                padding: "14px 45px",
                transform: `scale(${pulse})`,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  background: chromeGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
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
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={95}>
        <ChromeIntro />
      </Sequence>

      <Sequence from={95} durationInFrames={135}>
        <LaptopRotation project={heroProjects[0]} />
      </Sequence>

      <Sequence from={230} durationInFrames={100}>
        <HeroShowcase project={heroProjects[1]} variant="immersive" />
      </Sequence>

      <Sequence from={330} durationInFrames={100}>
        <HeroShowcase project={heroProjects[2]} variant="split" />
      </Sequence>

      <Sequence from={430} durationInFrames={150}>
        <ProjectsMontage />
      </Sequence>

      <Sequence from={580} durationInFrames={120}>
        <ChromeOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
