import {Suspense} from "react";

import {Culling} from "@/elements/components/culling";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";

export default function Module() {
  const sections = useEnvironment((state) => {
    return state.content.sections;
  });

  return sections.map(({model, position, size}, i) => {
    return (
      <Culling key={i} position={position} size={size}>
        <Suspense>
          <Skin position={position} link={model} />
        </Suspense>
      </Culling>
    );
  });
}
