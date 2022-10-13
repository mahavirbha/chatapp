import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_MSG = gql`
  query MessageByUser($receiverId: Int!) {
    messageByUser(receiverId: $receiverId) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;
