import {Unit} from "../components/unit";

export function B4({offset}: {offset: number}) {
  return (
    <group position={[30 * offset, 0, 30 * offset]}>
      <Unit x={0} z={2} color={0xffffff} />
      <Unit x={1} z={2} color={0xdddddd} />
      <Unit x={2} z={2} color={0xffffff} />
      <Unit x={3} z={2} color={0xdddddd} />
      <Unit x={4} z={2} color={0xffffff} />
      <Unit x={5} z={2} color={0xdddddd} />
      <Unit x={0} z={3} color={0xdddddd} />
      <Unit x={1} z={3} color={0xffffff} />
      <Unit x={2} z={3} color={0xdddddd} />
      <Unit x={3} z={3} color={0xffffff} />
      <Unit x={4} z={3} color={0xdddddd} />
      <Unit x={5} z={3} color={0xffffff} />
      <Unit x={0} z={4} color={0xffffff} />
      <Unit x={1} z={4} color={0xdddddd} />
      <Unit x={2} z={4} color={0xffffff} />
      <Unit x={3} z={4} color={0xdddddd} />
      <Unit x={4} z={4} color={0xffffff} />
      <Unit x={5} z={4} color={0xdddddd} />
      <Unit x={0} z={5} color={0xdddddd} />
      <Unit x={1} z={5} color={0xffffff} />
      <Unit x={2} z={5} color={0xdddddd} />
      <Unit x={3} z={5} color={0xffffff} />
      <Unit x={4} z={5} color={0xdddddd} />
      <Unit x={5} z={5} color={0xffffff} />
    </group>
  );
}
