import {Skin} from "./components/skin";

const map = {
  speed: 120,
  sections: [
    {
      skin: "https://content.combostreak.com/tap/sections/19c765ce2bf25409ee83682efbd69bb2.glb",
      offset: 0,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
        {x: 1, z: 0},
        {x: 1, z: 1},
        {x: 1, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/f804856e387da5f3a929a4ce2c27ff3b.glb",
      offset: 4,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/67587f97f2f00a44ac34641132934156.glb",
      offset: 10,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/f804856e387da5f3a929a4ce2c27ff3b.glb",
      offset: 16,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/67587f97f2f00a44ac34641132934156.glb",
      offset: 22,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/f804856e387da5f3a929a4ce2c27ff3b.glb",
      offset: 28,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/67587f97f2f00a44ac34641132934156.glb",
      offset: 34,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/f804856e387da5f3a929a4ce2c27ff3b.glb",
      offset: 40,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
    {
      skin: "https://content.combostreak.com/tap/sections/115b0541ac517957946d31d831fc6782.glb",
      offset: 46,
      positions: [
        {x: 0, z: 0},
        {x: 0, z: 1},
        {x: 0, z: 2},
      ],
    },
  ],
};

export default function Module() {
  return (
    <>
      {map.sections.map(({skin, offset}, i) => {
        return <Skin key={i} offset={offset} link={skin} />;
      })}
      {map.sections.map(({positions, offset}, i) => {
        return positions.map((position, j) => {
          return (
            <mesh
              key={`${i}:${j}`}
              position={[
                offset * 30 + position.x * 10 + 5,
                0,
                offset * 30 + position.z * 10 + 5,
              ]}
            >
              <boxGeometry args={[5, 0.1, 5]} />
              <meshBasicMaterial color="#0000ff" />
            </mesh>
          );
        });
      })}
    </>
  );
}
