import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import { stripe } from "./stripe";
import { LoginResponse, RegisterResponse } from "./utils/responseHelper";

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
    register: async (_, { fullName, email, password }) => {
      try {
        // check if email is already in use
        const isValid = await User.find({ where: { email } });

        if (isValid.length > 0) {
          throw "email is already in use";
        }

        // if not hash the password and insert user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          fullName,
          email,
          password: hashedPassword
        }).save();

        // if we can't save the user throw an error
        if (!user) {
          throw "Something went wrong by regestration";
        }

        RegisterResponse.code = 200;
        RegisterResponse.success = true;
        RegisterResponse.errors = null;
        RegisterResponse.message = "User was succesfully created";
        return RegisterResponse;
      } catch (error) {
        RegisterResponse.code = 404;
        RegisterResponse.success = false;
        RegisterResponse.message = "Faild to create a user";
        RegisterResponse.errors = [{ message: error }];
        return RegisterResponse;
      }
    },

    // This mutation is called when a user tries to login
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        LoginResponse.code = 404;
        LoginResponse.success = false;
        LoginResponse.message = "User could not login";
        LoginResponse.errors = [{ message: "email is wrong" }];
        return LoginResponse;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        LoginResponse.code = 404;
        LoginResponse.success = false;
        LoginResponse.message = "User could not login";
        LoginResponse.errors = [{ message: "password is wrong" }];
        return LoginResponse;
      }

      req.session.userId = user.id;

      LoginResponse.code = 200;
      LoginResponse.success = true;
      LoginResponse.errors = null;
      LoginResponse.message = "User successfully loged in";
      LoginResponse.me = {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      };
      return LoginResponse;
    },
    createSubscription: async (_, { source }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user) {
        throw new Error("There is not a user with this id");
      }

      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.STRIPE_BASIC_PLAN
      });

      user.stripeId = customer.id;
      user.type = "paid_basic";

      await user.save();

      return user;
    }
  }
};
