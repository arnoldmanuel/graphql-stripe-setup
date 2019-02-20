import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req })
  });

  await createConnection();

  const app = express();

  app.use(
    session({
      secret: "adsasfe234f89i23hhf",
      saveUninitialized: false,
      resave: false
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
