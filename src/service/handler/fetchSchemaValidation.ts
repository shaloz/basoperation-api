import { NextFunction, Request, Response } from "express";
import { HttpNotFound } from "../../common/constants/responses";
import { validateBySchema } from "../../common/constants/validators";
import JSONSchemaFetchAPIPayload from "../schema/fetch_payload.json";

export default (request: Request, response: Response, next: NextFunction) => {
  const { isValid, errors } = validateBySchema(JSONSchemaFetchAPIPayload, {
    ...request.body,
  });
  try {
    if (isValid) {
      next();
    } else {
      throw new Error("error");
    }
  } catch (err) {
    if (err instanceof Error) {
      HttpNotFound(response, errors);
    }
  }
};
