import {useGLTF} from "@react-three/drei/native";
import {useMemo, useRef} from "react";
import {SkeletonUtils} from "three-stdlib";

export function useModel({link}: {link: string}) {
  const {scene, ...model} = useGLTF(link);

  const clone = useMemo(() => {
    return SkeletonUtils.clone(scene);
  }, [scene]);

  const ref = useRef(null);

  return useMemo(() => {
    return {
      scene: clone,
      ...model,
      ref,
    };
  }, [clone, model]);
}
