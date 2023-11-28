import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import { schema } from './graphql/schemas/index.js'
import { resolvers } from './graphql/resolvers/index.js'

dotenv.config();
const app = express();

app.use(cors());

const server = new ApolloServer({ typeDefs: schema, resolvers });
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});
