export default function Module() {
  return (
    <mesh position={[15, 15, 15]}>
      <boxGeometry args={[30, 30, 30]} />
      <meshStandardMaterial color={0xbaf455} />
    </mesh>
  );
}
