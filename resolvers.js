import pc from "@prisma/client";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new pc.PrismaClient();
const resolvers = {
  Query: {
    users: async (_, args, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be signed-in");
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: {
            not: userId,
          },
        },
      });
      return users;
    },
  },

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

    createMessage: async (_, { receiverId, text }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be signed-in");
      const message1 = await prisma.message.create({
        data: {
          text:text,
          receiverId:receiverId,
          senderId: userId,
        },
      });
      return message1;
    },
  },
};

export default resolvers;
