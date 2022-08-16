const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const dotenv = require("dotenv");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

require("./src/db");
const models = require("./src/db/models");
const schema = require("./src/schema");
const {
  validateRefreshToken,
  generateAccessToken,
  sendRefreshToken,
  getUser,
} = require("./src/utils/jwt");
const { isAuth } = require("./src/utils/auth");
const {
  ORIGIN_DEVELOP,
  ORIGIN_DEVELOP_PATH,
  ORIGIN_PROD,
} = require("./src/utils/config");
// const { redisClient } = require("./src/services/redis");
// const { graceful, bree } = require("./src/services/bree");
// const { bot } = require("./src/services/telegram");

const app = express();
app.use(
  cors({
    origin: [ORIGIN_DEVELOP, ORIGIN_DEVELOP_PATH, ORIGIN_PROD],
    credentials: true,
  })
);
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

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (err) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }

    return err;
  },
  context: ({ req, res }) => {
    // const authorization = req.headers["authorization"];
    // const token = authorization.split(" ")[1];
    // const getID = getUser(token)
    // console.log({ getID: getID.id });
    return { models, req, res };
  },
});

async function data() {
  // await redisClient;
  // await graceful.listen();
  // await bree.start();
  // await bot.launch();
  await server.start();

  server.applyMiddleware({
    app,
    cors: false,
    path: "/graphql",
  });
}

data().catch((err) => console.error(err));

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    process.env.NODE_ENV === "production"
      ? `server live`
      : `server live on http://localhost:${port}${server.graphqlPath}`
  );
});
