import {Suspense} from "react";

import {B1} from "./blocks/b1";
import {B2} from "./blocks/b2";
import {B3} from "./blocks/b3";
import {B4} from "./blocks/b4";

export default function Module() {
  return (
    <>
      <Suspense>
        {/* <Cell x={0} z={-2} /> */}
        {/* <Cell x={1} z={-2} /> */}
        <B1 offset={0} />
        <B2 offset={4} />
        <B3 offset={10} />
        <B2 offset={16} />
        <B3 offset={22} />
        <B2 offset={28} />
        <B3 offset={34} />
        <B2 offset={40} />
        <B4 offset={44} />
      </Suspense>
    </>
  );
}
