import { ApolloServer, gql } from "apollo-server";
import crypto from "crypto";

const users = [
  {
    id: "sfdghj",
    firstName: "mukesh",
    lastName: "kumar",
    email: "mukesh@mukeshkumar.com",
    password: "12345",
  },
  {
    id: "dfsghj",
    firstName: "suresh",
    lastName: "sharma",
    email: "suresh@sureshkumar.com",
    password: "12346",
  },
]

const Todos = [
    {title:""}
]

const typeDefs = gql`
    type Query{
        users:[User]
        user(id:ID!):User
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }

    type Mutation{
        createUser(userNew:UserInput!):User
    }

    type User{
        id:ID
        firstName:String
        lastName:String
        email:String
    }

`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, {id}) => {
      console.log(id);
      return users.find((item) => item.id == id);
    },
  },
  Mutation: {
    createUser: (_, { userNew }) => {
      const newUser = {
        id: crypto.randomUUID(),
        ...userNew,
      };
      console.log("new uuid: ", newUser.id)
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(` Server ready at ${