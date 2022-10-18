import morgan from "morgan";

morgan.token("app-user", (request: any) => (request.user && request.user._id) || "anonymous");
morgan.token("content-type", (request) => {
    return request.headers["content-type"];
});

export const middlewareLogging = (application: any, logger: any) => {
    application.use(
        morgan(":remote-addr :app-user HTTP/:http-version :method :url :content-type :status :response-time ms", {
            stream: logger.stream("Request"),
        })
    );
};
