import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import {useAuthorization} from "@/elements/hooks/use-authorization";
import {getAccount} from "@/modules/user";
import {useRequest} from "@/lib/store";

export default <FastifyPluginAsyncZod>async function (app) {
  useAuthorization(app);

  app.get("/", async () => {
    const token = useRequest((store) => {
      return store.token;
    });

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
