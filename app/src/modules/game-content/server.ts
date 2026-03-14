/* eslint-disable consistent-return */
import {z} from "zod";

import useEnvironment from "@/elements/stores/useEnvironment";
// import {api} from "@/lib/api";
import {groupOf, mapWith} from "@/lib/utils";

const Scene = z.object({
  duration: z.number().default(0),
  sections: z.array(z.string()).default([]),
});

const Section = z.object({
  model: z.string().default(""),
  size: z.number().default(0),
  positions: z.array(z.tuple([z.number(), z.number()])).default([]),
});

const Document = z.object({
  scene: Scene,
  sections: z.record(z.string(), Section).default({}),
});

export type IScene = z.infer<typeof Scene>;
export type ISection = z.infer<typeof Section>;
export type IDocument = z.infer<typeof Document>;

export async function getDocument({id}: {id: string}) {
  const document = Document.parse(
    await api.get({
      url: `documents/${id}.json`,
    }),
  );

  const sections = mapWith(
    document.scene.sections,
    (helper, section) => {
      const {model, size, positions} =
        document.sections[section as keyof IDocument["sections"]];

      helper.offset += size;

      return {
        model,
        size,
        positions,
        offset: helper.offset - size,
      };
    },
    {
      offset: 0,
    },
  );

  const positions = sections.flatMap(({positions, offset}) => {
    return positions.map(([x, z]) => {
      return {
        x: x + offset,
        z: z + offset,
      };
    });
  });

  positions.sort((a, b) => {
    if (a.z !== b.z) {
      return a.z - b.z;
    }

    return a.x - b.x;
  });

  const z = groupOf(
    mapWith(
      positions,
      (helper, value, i) => {
        const {x, z} = value;
        const {x: x0, z: z0} = helper;

        helper.x = x;
        helper.z = z;

        if (z0 !== z) {
          return [z0, x0];
        }

        if (x - x0 > 1) {
          return [z0, x0];
        }

        if (i === positions.length - 1) {
          return [z, x];
        }
      },
      {
        x: positions[0].x,
        z: positions[0].z,
      },
    ),
  );

  positions.sort((a, b) => {
    if (a.x !== b.x) {
      return a.x - b.x;
    }

    return a.z - b.z;
  });

  const x = groupOf(
    mapWith(
      positions,
      (helper, value, i) => {
        const {x, z} = value;
        const {x: x0, z: z0} = helper;

        helper.x = x;
        helper.z = z;

        if (x0 !== x) {
          return [x0, z0];
        }

        if (z - z0 > 1) {
          return [x0, z0];
        }

        if (i === positions.length - 1) {
          return [x, z];
        }
      },
      {
        x: positions[0].x,
        z: positions[0].z,
      },
    ),
  );

  const {
    content: {attempt},
  } = useEnvironment.getState();

  return {
    id,
    attempt,
    size: sections[sections.length - 1].offset * 2,
    color: `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
    duration: document.scene.duration,
    sections,
    positions,
    boundaries: {
      x,
      z,
    },
  };
}
