import {useVisibility} from "../hooks/useVisiibility";

export function Culling({
  children,
  position,
  size,
}: {
  children: React.ReactNode;
  position: {x: number; z: number};
  size: number;
}) {
  const isVisible = useVisibility({
    position: (position.x + position.z) / 2,
    size,
  });

  if (isVisible === false) {
    return null;
  }

  return children;
}
