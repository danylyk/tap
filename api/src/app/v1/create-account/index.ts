import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import {createAccount} from "@/modules/user";

export default <FastifyPluginAsyncZod>async function (app) {
  app.post("/", async () => {
    const {token} = await createAccount();

    return {
      token,
    };
  });
};
