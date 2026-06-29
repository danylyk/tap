import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import autoload from "@fastify/autoload";
import sensible from "@fastify/sensible";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createStore} from "@/lib/store";
import {setLogger} from "@/lib/logger";
import {getEnv} from "@/lib/env";

const server = fastify({
  logger: true,
  disableRequestLogging: true,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const app = server.withTypeProvider<ZodTypeProvider>();

setLogger(app.log);

app.addHook("onRequest", (request, _reply, done) => {
  createStore(
    {
      headers: Object.fromEntries(
        Object.entries(request.headers)
          .map(([key, value]) => {
            if (typeof value === "string") {
              return [key.toLowerCase(), value];
            }

            if (Array.isArray(value)) {
              return [key.toLowerCase(), value.join(",")];
            }

            return null;
          })
          .filter((header) => {
            return header !== null;
          }),
      ),
    },
    done,
  );
});

app.register(sensible);
app.register(autoload, {
  dir: path.join(__dirname, "app"),
});

app.listen(
  {
    port: getEnv("PORT", "number"),
  },
  (err) => {
    if (!err) {
      return;
    }

    app.log.error(err);

    process.exit(1);
  },
);
