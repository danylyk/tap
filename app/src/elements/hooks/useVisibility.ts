import {useFrame} from "@react-three/fiber";
import {useState} from "react";

import useAttempt from "../stores/useAttempt";

export function useVisibility({
  position,
  size,
}: {
  position: number;
  size: number;
}) {
  const [visible, setVisible] = useState(false);

  const boundaries = {
    from: position,
    to: position + size,
  };

  useFrame(() => {
    const {position} = useAttempt.getState();

    const point = {
      from: (position.x + position.z) / 2 + 64,
      to: (position.x + position.z) / 2 - 42,
    };
    const status = point.from > boundaries.from && point.to < boundaries.to;

    if (visible === status) {
      return;
    }

    setVisible(status);
  });

  return visible;
}
