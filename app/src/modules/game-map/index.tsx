import {Suspense} from "react";

import {Cell} from "./components/cell";

export default function Module() {
  return (
    <>
      <Suspense>
        <Cell x={0} z={-2} />
        <Cell x={1} z={-2} />
      </Suspense>
    </>
  );
}
