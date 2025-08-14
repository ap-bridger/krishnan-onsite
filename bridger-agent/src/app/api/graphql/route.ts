import { greetings } from "@/server/modules/greet/api";
import { transactions } from "@/server/modules/transaction/api";
import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
        transactions: [Transaction!]!
      }
      
      type Transaction {
        id: String!
        date: String!
        details: String!
        amount: Float!
        predictedVendor: String!
        pickedVendor: String!
        predictedCategory: String!
        pickedCategory: String!
      }
    `,
    resolvers: {
      Query: {
        greetings,
        transactions,
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
