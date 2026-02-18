import {useEffect, useMemo} from "react";

import useGame from "@/elements/stores/game";
import useScene from "@/elements/stores/scene";

import {Skin} from "./components/skin";
import {getMap} from "./server";

export default function Module() {
  const {sections, positions, boundaries} = useMemo(() => {
    return getMap();
  }, []);

  const initializeGame = useGame((state) => {
    return state.initialize;
  });

  const initializeScene = useScene((state) => {
    return state.initialize;
  });

  useEffect(() => {
    initializeGame({
      positions,
    });
  }, [initializeGame, positions]);

  useEffect(() => {
    initializeScene({
      boundaries,
    });
  }, [initializeScene, boundaries]);

  return (
    <>
      {sections.map(({model, offset}, i) => {
        return <Skin key={i} offset={offset} link={model} />;
      })}
      {positions.map(({x, z}, i) => {
        return (
          <mesh key={i} position={[x + 0.5, 0.05, z + 0.5]}>
            <boxGeometry args={[0.6, 0.1, 0.6]} />
            <meshBasicMaterial color="#0000ff" />
          </mesh>
        );
      })}
      {Object.entries(boundaries.x).map(([key, value], i) => {
        const x = Number(key);

        return value.map((z, j) => {
          return (
            <mesh key={`${i}:${j}`} position={[x + 0.5, 0.1, z + 0.5]}>
              <boxGeometry args={[0.3, 0.2, 0.3]} />
              <meshBasicMaterial color="#00ff1a" />
            </mesh>
          );
        });
      })}
      {Object.entries(boundaries.z).map(([key, value], i) => {
        const z = Number(key);

        return value.map((x, j) => {
          return (
            <mesh key={`${i}:${j}`} position={[x + 0.5, 0.2, z + 0.5]}>
              <boxGeometry args={[0.3, 0.4, 0.3]} />
              <meshBasicMaterial color="#ff0000" />
            </mesh>
          );
        });
      })}
    </>
  );
}
