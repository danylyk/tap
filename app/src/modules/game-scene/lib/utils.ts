import {RootState} from "@react-three/fiber/native";

export function silencePixelStorei({gl}: RootState) {
  const context = gl.getContext();
  const supported = new Set<number>([
    context.PACK_ALIGNMENT,
    context.UNPACK_ALIGNMENT,
  ]);
  const pixelStorei = context.pixelStorei.bind(context);

  context.pixelStorei = (pname, param) => {
    if (supported.has(pname)) {
      pixelStorei(pname, param);
    }
  };
}
