import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({ uri: "/api/graphql" }),
  cache: new InMemoryCache(),
});
