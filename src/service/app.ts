import express from "express";
import { Logger } from "winston";
import { middlewareCors } from "../middlewares/middleware-cors";
import { middlewareLogging } from "../middlewares/middleware-logging";
import { middlewareRequestParserJSON } from "../middlewares/middleware-request-parser";

import UserController from "../service/controller/userController";
import UserRouter from "../service/routes/userRouter";
import UserManager from "../logic/userManager";

const application = (logger: Logger, corsConfig: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      const baseUrl = "/base_operation/v1/api";

      const userManager = new UserManager();
      const userController = new UserController(logger, userManager);
      const userRouter = new UserRouter(userController);

      middlewareCors(app, corsConfig);
      middlewareLogging(app, logger);
      middlewareRequestParserJSON(app);

      app.use(`${baseUrl}/user`, userRouter.Router);
      resolve(app);
    } catch (error) {
      reject("error connecting to server");
      logger.error(
        `APP: A fatal error occurred, application failed to start ${error}`
      );
    }
  });
};

export default application;
