import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";

const typeDefs = `#graphql
 enum ShareMode {
  HOURS_BY_HOURS
  DAYS_BY_DAYS
  SPLIT_STORE
  DAY_OR_NIGHT
  Weekend
  Regular
}


  type Store {
    id: ID!
    title: String!
    desc: String!
    peopleDesc: String!
    storeSize: String!
    businessType: String!
    country: String!
    state: String!
    city: String!
    pin: String!
    
    latitude: Float
    longitude: Float
    bannerImageUrl: String
    priceInr: Int!
    shareMode: ShareMode!
    startTime: String
    endTime: String
    days: [String!]!
    sqft: Int
    dayOrNight: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    stores: [Store!]!
    store(id: ID!): Store
    

  }
`;

const resolvers = {
  Query: {
    stores: async () => {
      return prisma.store.findMany();
    },

    store: async (_: any, args: { id: string }) => {
      return prisma.store.findUnique({
        where: { id: args.id },
      });
    },
   
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
