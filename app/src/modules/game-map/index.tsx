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

  return sections.map(({model, offset}, i) => {
    return <Skin key={i} offset={offset} link={model} />;
  });
}
