import type {FastifyBaseLogger} from "fastify";

export let logger: FastifyBaseLogger;

export function setLogger(instance: FastifyBaseLogger) {
  logger = instance;
}
