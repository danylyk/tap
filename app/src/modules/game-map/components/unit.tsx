export function Unit({x, z, color}: {x: number; z: number; color: number}) {
  return (
    <mesh position={[15 + x * 30, -0.05, 15 + z * 30]}>
      <boxGeometry args={[30, 0.1, 30]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
