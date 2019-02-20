import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import { error } from "./types";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hi"
  },
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        // check if email is already in use
        const isValid = await User.find({ where: { email } });

        if (isValid.length > 0) {
          throw "email is already in use";
        }

        // if not hash the password and insert user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          email,
          password: hashedPassword
        }).save();

        // if we can't save the user throw an error
        if (!user) {
          throw "Something went wrong by regestration";
        }

        return { errors: null, didWork: true };
      } catch (error) {
        const errors: error = [{ message: error }];
        return { errors: errors, didWork: false };
      }
    }
  }
};
