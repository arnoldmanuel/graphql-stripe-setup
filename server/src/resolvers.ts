import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import { error } from "./types";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    }
  },
  Mutation: {
    // This mutation is called when a user is registered
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
    },
    // This mutation is called when a user tries to login
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return null;

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return { errors: null, me: { id: user.id, email: user.email } };
    }
  }
};
