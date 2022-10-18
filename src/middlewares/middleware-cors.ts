import cors from "cors";

export const middlewareCors = (application: any, corsConfig: any) => {
    application.use(cors(corsConfig));
    application.options("/api/*", cors(corsConfig));
};
