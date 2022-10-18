import { LOG_LEVEL_ERROR } from "../constants/log-levels";

/**
 * @param {class}  ApiController definition
 */
class ApiController {
  public _label: any;
  public _logger: any;
  /**
   * @param {any} label
   * @param {any} logger
   * @param {initialize} constructor ApiController
   */
  constructor(label: any, logger: any) {
    this._label = label;
    this._logger = logger;
  }

  /**
   * @param {property} Label
   */
  get Label() {
    return this._label;
  }
  /**
   * @param {property} Logger
   */
  get Logger() {
    return this._logger;
  }

  /**
   * @param {any} level
   * @param {any} logEntry
   */
  log(level: any, logEntry: any) {
    this._logger.log(
      Object.assign({}, logEntry, { label: this._label, level })
    );
  }

  logError(logEntry: any) {
    this.log(LOG_LEVEL_ERROR, logEntry);
  }
}

export default ApiController;
