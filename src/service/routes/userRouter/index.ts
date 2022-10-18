import UserController from "../../controller/userController";
import BaseRouter from "../BaseRouter";
import validateInsertSchema from "../../handler/insertSchemaValidation";
import fetchSchemaValidation from "../../handler/fetchSchemaValidation";

class UserRouter extends BaseRouter {
  constructor(userController: UserController) {
    super(userController);

    this.Router.route("/insert-user").post(
      validateInsertSchema,
      userController.handleInsertUser.bind(userController)
    );

    this.Router.route("/fetch-user").post(
      fetchSchemaValidation,
      userController.handleFetchUserInRaduis.bind(userController)
    );
  }
}

export default UserRouter;
