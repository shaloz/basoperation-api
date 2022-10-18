import Ajv from "ajv";
import AjvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
AjvErrors(ajv);

/**
 *
 * @param {object} schema
 * @param {object} data
 * @return {any}
 */
export function validateBySchema(schema: object, data: object): any {
  const validate = ajv.compile(schema);

  const isValid = validate(data);

  if (isValid) {
    return { isValid, errors: validate.errors };
  } else {
    const errors: Array<object> = [];
    for (const el of validate.errors!) {
      const dataPath = el.schemaPath.substring(1);

      const error = {
        dataPath,
        message: el.message,
      };
      errors.push(error);
    }

    return {
      isValid,
      errors,
    };
  }
}
