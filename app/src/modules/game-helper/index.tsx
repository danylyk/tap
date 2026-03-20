import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module() {
  const positions = useEnvironment((state) => {
    return state.content.positions;
  });

  return (
    <>
      <gridHelper args={[1320, 440]} />
      <axesHelper args={[10]} />

      {positions.entries().map(([point, type]) => {
        const [x, z] = point.split(":").map(Number);

        if (type === "a") {
          return (
            <mesh key={`${x}:${z}`} position={[x + 0.5, 0, z + 0.5]}>
              <boxGeometry args={[0.5, 0.01, 0.5]} />
              <meshBasicMaterial color="green" />
            </mesh>
          );
        }

        return null;
      })}
    </>
  );
}
