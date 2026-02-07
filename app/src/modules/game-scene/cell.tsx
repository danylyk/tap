export function Cell({
  width,
  length,
  height = 0.02,
  x,
  y,
  z,
}: {
  width: number;
  length: number;
  height?: number;
  x: number;
  y: number;
  z: number;
}) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[width, height, length]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
