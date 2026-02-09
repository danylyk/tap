import {Unit} from "../components/unit";

export function B3({offset}: {offset: number}) {
  return (
    <group position={[30 * offset, 0, 30 * offset]}>
      <Unit z={0} x={2} color={0xffffff} />
      <Unit z={1} x={2} color={0xdddddd} />
      <Unit z={2} x={2} color={0xffffff} />
      <Unit z={3} x={2} color={0xdddddd} />
      <Unit z={4} x={2} color={0xffffff} />
      <Unit z={5} x={2} color={0xdddddd} />
      <Unit z={0} x={3} color={0xdddddd} />
      <Unit z={1} x={3} color={0xffffff} />
      <Unit z={2} x={3} color={0xdddddd} />
      <Unit z={3} x={3} color={0xffffff} />
      <Unit z={4} x={3} color={0xdddddd} />
      <Unit z={5} x={3} color={0xffffff} />
      <Unit z={4} x={4} color={0xffffff} />
      <Unit z={5} x={4} color={0xdddddd} />
      <Unit z={6} x={4} color={0xffffff} />
      <Unit z={7} x={4} color={0xdddddd} />
      <Unit z={8} x={4} color={0xffffff} />
      <Unit z={9} x={4} color={0xdddddd} />
      <Unit z={4} x={5} color={0xdddddd} />
      <Unit z={5} x={5} color={0xffffff} />
      <Unit z={6} x={5} color={0xdddddd} />
      <Unit z={7} x={5} color={0xffffff} />
      <Unit z={8} x={5} color={0xdddddd} />
      <Unit z={9} x={5} color={0xffffff} />
    </group>
  );
}
