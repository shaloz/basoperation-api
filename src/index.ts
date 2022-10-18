import application from "./service/app";
import config from "../config/config.json";
import createLogger from "./common/utils/loggers";
import { config as dotEnvConfig } from "dotenv";
import {
  HTTP_VERB_OPTIONS,
  HTTP_VERB_POST,
  HTTP_VERB_GET,
  HTTP_VERB_PUT,
  HTTP_VERB_PATCH,
  HTTP_VERB_DELETE,
  HTTP_VERB_HEAD,
} from "./common/constants/http-verbs";

const startServer = async () => {
  dotEnvConfig();
  const { log: logConfig } = config;

  const logger = createLogger(logConfig);

  let origin = ["http://localhost:3000"];

  const corsConfig = {
    origin: origin,
    methods: [
      HTTP_VERB_OPTIONS,
      HTTP_VERB_POST,
      HTTP_VERB_GET,
      HTTP_VERB_PUT,
      HTTP_VERB_PATCH,
      HTTP_VERB_DELETE,
      HTTP_VERB_HEAD,
      HTTP_VERB_OPTIONS,
    ],
    allowedHeaders: ["Content-Type"],
  };

  const app = await application(logger, corsConfig);
  const PORT = process.env.PORT ? process.env.PORT : 8080;

  app.listen(PORT, function (this: typeof app) {
    const { address, port } = this.address();

    logger.info({
      message: `Process started successfully on ${address}:${port}`,
    });
  });
};

startServer();
