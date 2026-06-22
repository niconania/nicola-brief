import { staticFile } from "remotion";

export interface Project {
  title: string;
  subtitle: string;
  category: string;
  coverUrl: string;
  color: string;
}

export const heroProjects: Project[] = [
  {
    title: "SOCIAL MEDIA",
    subtitle: "DESIGN",
    category: "Digital Strategy & Content",
    coverUrl: staticFile("covers/02.png"),
    color: "#d94a7a",
  },
  {
    title: "PRINT",
    subtitle: "DESIGN",
    category: "Editorial & Packaging",
    coverUrl: staticFile("covers/03.png"),
    color: "#4ac9a0",
  },
  {
    title: "MOTION",
    subtitle: "GRAPHICS",
    category: "Animation & Video",
    coverUrl: staticFile("covers/04.jpg"),
    color: "#9a6ad9",
  },
];

export const supportProjects: Project[] = [
  {
    title: "JMEDICAL",
    subtitle: "REBRANDING",
    category: "Brand Identity",
    coverUrl: staticFile("covers/01.png"),
    color: "#4a90d9",
  },
  {
    title: "710 CLINIQUE",
    subtitle: "STYLE GUIDE",
    category: "Visual System",
    coverUrl: staticFile("covers/05.png"),
    color: "#5ac97a",
  },
  {
    title: "CLICK & PRINT",
    subtitle: "BRANDING",
    category: "Concept & Identity",
    coverUrl: staticFile("covers/08.png"),
    color: "#c97a4a",
  },
  {
    title: "DIVECOM",
    subtitle: "TOOLKIT",
    category: "Brand System",
    coverUrl: staticFile("covers/07.png"),
    color: "#4a8ad9",
  },
  {
    title: "B&B",
    subtitle: "TOOLKIT",
    category: "Brand Identity",
    coverUrl: staticFile("covers/06.jpg"),
    color: "#d9a04a",
  },
];
