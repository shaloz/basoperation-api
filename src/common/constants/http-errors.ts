import { HTTP_STATUS_BAD_REQUEST } from "./http-status-codes";
//

export class ApiError extends Error {
    public _errors: string;
    public _statusCode: number;
    constructor(message: any, errors: any, statusCode = 500) {
        super(message);
        this.name = "ApiError";
        this._errors = errors;
        this._statusCode = statusCode;
    }

    get StatusCode() {
        return this._statusCode;
    }

    get Name() {
        return this.name;
    }

    get Errors() {
        return this._errors;
    }
}

export class DuplicateDataError extends ApiError {
    constructor(message: any, errors: any) {
        super(message, errors, HTTP_STATUS_BAD_REQUEST);
        this.name = "DuplicateDataError";
    }
}

export class SchemaValidationError extends ApiError {
    constructor(message: any, errors: any) {
        super(message, errors, HTTP_STATUS_BAD_REQUEST);
        this.name = "SchemaValidationError";
    }
}
