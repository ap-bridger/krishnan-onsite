import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      date
      details
      amount
      predictedVendor
      pickedVendor
      predictedCategory
      pickedCategory
    }
  }
`;