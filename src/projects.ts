import { staticFile } from "remotion";

export interface Project {
  title: string;
  category: string;
  coverUrl: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "JMEDICAL",
    category: "Rebranding",
    coverUrl: staticFile("covers/01.png"),
    color: "#4a90d9",
  },
  {
    title: "SOCIAL MEDIA",
    category: "Design Portfolio",
    coverUrl: staticFile("covers/02.png"),
    color: "#d94a7a",
  },
  {
    title: "PRINT DESIGN",
    category: "Portfolio",
    coverUrl: staticFile("covers/03.png"),
    color: "#4ac9a0",
  },
  {
    title: "MOTION GRAPHICS",
    category: "Animation Portfolio",
    coverUrl: staticFile("covers/04.jpg"),
    color: "#9a6ad9",
  },
  {
    title: "710 CLINIQUE",
    category: "Guía de Estilo",
    coverUrl: staticFile("covers/05.png"),
    color: "#5ac97a",
  },
  {
    title: "B&B TOOLKIT",
    category: "Brand Identity",
    coverUrl: staticFile("covers/06.jpg"),
    color: "#d9a04a",
  },
  {
    title: "DIVECOM",
    category: "Brand Toolkit",
    coverUrl: staticFile("covers/07.png"),
    color: "#4a8ad9",
  },
  {
    title: "CLICK & PRINT",
    category: "Conceptualización de Marca",
    coverUrl: staticFile("covers/08.png"),
    color: "#c97a4a",
  },
];
