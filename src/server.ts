import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { getuser } from './auth';
const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getuser(token);

    return { user };
  },
});

app.use('*', cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const httpServer = createServer(app);
httpServer.listen(
  { port: 4000 },
  (): void => console.log(`\n🚀      
  GraphQL is now running on http://localhost:4000/graphql`
));