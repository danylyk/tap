import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import {z} from "zod";
import {auth} from "@/modules/user";

export default <FastifyPluginAsyncZod>async function (app) {
  app.post(
    "/",
    {
      schema: {
        body: z.object({
          device_id: z.string().min(1),
        }),
      },
    },
    async (request) => {
      const {device_id} = request.body;

      const {token} = await auth({
        device_id,
      });

      return {
        token,
      };
    },
  );
};
