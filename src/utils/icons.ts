import type { FC, SVGProps } from "react";

const reactTechIcons = import.meta.glob(
  "/src/assets/technologies/*.svg",
  { eager: true, query: '?react', import: 'default' }
);

export const reactTechnologyIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = Object.fromEntries(
  Object.entries(reactTechIcons).map(([path, mod]) => [
    path.split("/").pop()!,
    mod as FC<SVGProps<SVGSVGElement>>,
  ])
);

const astroTechIcons = import.meta.glob(
  '/src/assets/technologies/*.svg',
  { eager: true, query: '?raw', import: 'default' }
);

export const astroTechnologyIcons: Record<string, string> = Object.fromEntries(
  Object.entries(astroTechIcons).map(([path, mod]) => [
    path.split("/").pop()!,
    mod as string,
  ])
);