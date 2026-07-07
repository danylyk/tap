import {randomBytes} from "node:crypto";

export function createToken() {
  return randomBytes(32).toString("hex");
}
