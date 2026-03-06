import {uniqWith} from "lodash";
import {Suspense} from "react";

import {Visible} from "@/elements/primitives/visible";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";

export default function Module() {
  const marks = useEnvironment((state) => {
    return state.marks;
  });

  return uniqWith(marks, (a, b) => {
    return a.position.x === b.position.x && a.position.z === b.position.z;
  }).map(({position}) => {
    return (
      <group
        key={`${position.x}:${position.z}`}
        position={[position.x, 0, position.z]}
      >
        <group>
          <Suspense>
            <Visible status={true} delay={1000}>
              <Skin />
            </Visible>
          </Suspense>
        </group>
      </group>
    );
  });
}
