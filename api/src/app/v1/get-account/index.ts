import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import {getAccount} from "@/modules/user";
import {useAuthorization} from "@/lib/security";

export default <FastifyPluginAsyncZod>async function (app) {
  app.get("/", async () => {
    const token = useAuthorization();

    if (!token) {
      throw app.httpErrors.unauthorized();
    }

    const account = await getAccount({
      token,
    });

    if (!account) {
      throw app.httpErrors.unauthorized();
    }

    return {
      id: account.id,
      name: account.name,
    };
  });
};
