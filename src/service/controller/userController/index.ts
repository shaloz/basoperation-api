import { Request, Response } from "express";
import ApiController from "../../../common/utils/ApiController";
import { HttpOk, HttpBadRequest } from "../../../common/constants/responses";
import {
  LOG_LEVEL_ERROR,
  LOG_LEVEL_INFO,
} from "../../../common/constants/log-levels";
import UserManager from "../../../logic/userManager";
import { Logger } from "winston";

/**
 * @param {class}  UserController definition
 */
class UserController extends ApiController {
  public _userManager;

  constructor(logger: Logger, userManager: UserManager) {
    super("User Controller", logger);
    this._userManager = userManager;
  }

  get UserManager() {
    return this._userManager;
  }

  /**
   * @param {express.Response} response response object
   */
  async handleHealthCheck(_request: Request, response: Response) {
    try {
      const data = await this.UserManager.handleHealthCheck();
      this.log(LOG_LEVEL_INFO, "Health check");
      HttpOk(response, data);
    } catch (error: any) {
      this.log(LOG_LEVEL_ERROR, "Error in handleHealthCheck");
      HttpBadRequest(response, {
        dataPath: "handleHealthCheck",
        message: error.message,
      });
    }
  }

  /**
   * @param {express.Response} response response object
   * @param {express.Request} request request object
   */
  async handleInsertUser(request: Request, response: Response) {
    try {
      const data = await this.UserManager.handleInsertUser(request);
      this.log(LOG_LEVEL_INFO, "handleInsertUser successful");
      HttpOk(response, data);
    } catch (error: any) {
      this.log(LOG_LEVEL_ERROR, "Error in handleInsertUser");
      HttpBadRequest(response, {
        dataPath: "handleInsertUser",
        message: error.message,
      });
    }
  }

  /**
   * @param {express.Response} response response object
   * @param {express.Request} request request object
   */
  async handleFetchUserInRaduis(request: Request, response: Response) {
    try {
      const data = await this.UserManager.handleFetchUserInRaduis(request);
      this.log(LOG_LEVEL_INFO, "handleFetchUserInRaduis successful");
      HttpOk(response, data);
    } catch (error: any) {
      this.log(LOG_LEVEL_ERROR, "Error in handleFetchUserInRaduis");
      HttpBadRequest(response, {
        dataPath: "handleFetchUserInRaduis",
        message: error.message,
      });
    }
  }
}

export default UserController;
