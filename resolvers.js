import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import { ApolloError, AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { Token } from "graphql";

const prisma = new pc.PrismaClient();
const resolvers = {
  Query: {},

  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user) {
        throw new AuthenticationError("User already exists with email");
      } else {
        const hashedPassword = await bcrypt.hash(userNew.password, 10);
        const newUser = await prisma.user.create({
          data: {
            ...userNew,
            password: hashedPassword,
          },
        });
        return newUser;
      }
    },

    signinUser: async (_, { userSignin }) => {
      const user = await prisma.user.findUnique({
        where: { email: userSignin.email },
      });
      if (!user) {
        throw new AuthenticationError("User doesn't exist...");
      } else {
        const doMatch = await bcrypt.compare(
          userSignin.password,
          user.password
        );
        if (!doMatch)
          throw new AuthenticationError("email or password is invalid");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token };
    },
  },
};

export default resolvers;
