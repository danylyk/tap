import {uniqWith} from "lodash";
import {Suspense} from "react";

import {Culling} from "@/elements/components/culling";
import {Visible} from "@/elements/components/visible";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";

export default function Module() {
  const marks = useEnvironment((state) => {
    return state.content.marks;
  });

  const a = uniqWith([...marks].reverse(), (a, b) => {
    return a.position.x === b.position.x && a.position.z === b.position.z;
  });

  return a.map(({position}, i) => {
    return (
      <Culling key={`${position.x}:${position.z}`} position={position} size={1}>
        <group position={[position.x, 0, position.z]}>
          <group>
            <Suspense>
              <Visible status={i < 10} delay={1000}>
                <Skin />
              </Visible>
            </Suspense>
          </group>
        </group>
      </Culling>
    );
  });
}
