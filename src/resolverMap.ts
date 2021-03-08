import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, user: string): string {
      return `👋 Hello world! 👋`;
    },
  },
};
export default resolverMap;