import { json, urlencoded } from "body-parser";

export const middlewareRequestParserURLEncoded = (application: any) => {
    application.use(urlencoded({ extended: true }));
};

export const middlewareRequestParserJSON = (application: any) => {
    application.use(json());
};

export const middlewareRequestProxy = (application: any) => {
    application.set("trust proxy", true);
};
