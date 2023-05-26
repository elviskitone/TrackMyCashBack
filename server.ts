import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import express from "express";
import * as crypto from "crypto";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

dotenv.config();

const TEST_PORT = 3400;
const DEVELOPMENT_PORT = 3500;
const PRODUCTION_PORT = process.env.PORT || 3600;


const app = express();

app.use(
  cookieSession(
    process.env.NODE_ENV == "production" ?
    {
      name: "google-auth-session",
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      keys: ["key1", "key2"],
    }
    :
    {
      name: "google-auth-session",
      maxAge: 24 * 60 * 60 * 1000,
      keys: ["key1", "key2"],
    }
  )
);

// generating a secret key
const secretKey = crypto.randomBytes(64).toString("hex");

// setting the secret key in the app configuration
app.set("secretKey", process.env.SECRET_KEY || secretKey);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors({ 
  origin: true, 
  credentials: true, 
  methods: ['POST', 'OPTIONS', 'GET', 'DELETE', 'PUT'],
}));

app.use("/api", routes);

switch (process.env.NODE_ENV) {
  case "test":
    app.listen(TEST_PORT, () => console.log(`TEST PORT: ${TEST_PORT}`));
    break;   

  case "production":
    app.listen(PRODUCTION_PORT, () =>
      console.log(`PRODUCTION PORT: ${PRODUCTION_PORT}`)
    );
    break;

  default:
    app.listen(DEVELOPMENT_PORT, () =>
      console.log(`DEVELOPMENT PORT: ${DEVELOPMENT_PORT}`)
    );    
}

export default app;
