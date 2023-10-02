import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { dbConn } from "./src/db/index.js";
import cookieParser from "cookie-parser";
import pkg from "body-parser";
const { json } = pkg;

import { models } from "./src/db/models.js";
import schema from "./src/schema/index.js";

import {
  validateRefreshToken,
  generateAccessToken,
  sendRefreshToken,
  getUser,
} from "./src/utils/jwt.js";
import { isAuth } from "./src/utils/auth.js";
import {
  ORIGIN_DEVELOP,
  ORIGIN_DEVELOP_PATH,
  ORIGIN_PROD,
} from "./src/utils/config.js";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema: schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.set("trust proxy", true);
app.use(cookieParser());
app.use((req, res, next) => isAuth(req, res, next));

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies["refreshToken"];
  console.log({ refreshToken: token });

  if (!token) {
    return res.send({ res: false, accessToken: "" });
  }
  let payload = null;

  try {
    payload = validateRefreshToken(token);
  } catch (err) {
    console.log(err);
    return res.send({
      ok: false,
      accessToken: "",
    });
  }

  const user = await models.User.findById(payload.id);

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, user);

  return res.send({
    ok: true,
    accessToken: generateAccessToken(user),
  });
});

async function data() {
  dbConn.on("connected", function () {
    console.log("Mongoose connected");
  });

  await server.start();
  app.use(
    "/graphql",
    cors({
      origin: [ORIGIN_DEVELOP, ORIGIN_DEVELOP_PATH, ORIGIN_PROD],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { models, req, res };
      },
    })
  );
}

data().catch((err) => console.error(err));

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    process.env.NODE_ENV === "production"
      ? `server live`
      : `server live on http://localhost:${port}/graphql`
  );
});
