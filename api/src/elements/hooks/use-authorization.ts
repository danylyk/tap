import {FastifyInstance} from "fastify";
import {setRequest, useRequest} from "@/lib/store";

export function useAuthorization(app: FastifyInstance) {
  app.addHook("onRequest", async () => {
    const token = useRequest((store) => {
      return store.headers.authorization?.replace("Bearer ", "");
    });

    if (!token) {
      throw app.httpErrors.unauthorized();
    }

    setRequest({
      token,
    });
  });
}
