import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";

export default function Module() {
  const sections = useEnvironment((state) => {
    return state.sections;
  });

  return sections.map(({model, position}, i) => {
    return <Skin key={i} position={position} link={model} />;
  });
}
