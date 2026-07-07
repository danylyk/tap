import {randomBytes} from "node:crypto";
import {useRequest} from "@/lib/store";

export function createToken() {
  return randomBytes(32).toString("hex");
}

export function useAuthorization() {
  return useRequest((store) => {
    return store.headers.authorization?.replace("Bearer ", "");
  });
}
