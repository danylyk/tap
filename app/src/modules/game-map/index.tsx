import {Suspense} from "react";

import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";

export default function Module() {
  const sections = useEnvironment((state) => {
    return state.sections;
  });

  return sections.map(({model, position}, i) => {
    return (
      <Suspense key={i}>
        <Skin position={position} link={model} />
      </Suspense>
    );
  });
}
