import serverless from "serverless-http";
import app from "../../main.js";

export const handler = serverless(app);
