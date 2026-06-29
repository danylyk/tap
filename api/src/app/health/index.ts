import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import getHealth from "@/modules/health";

export default <FastifyPluginAsyncZod>async function (app) {
  app.get("/", async () => {
    return getHealth();
  });
};
