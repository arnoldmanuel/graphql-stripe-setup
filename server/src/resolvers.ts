import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";

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
      const RegisterResponse = {
        code: 200,
        success: true,
        message: "User was registered",
        errors: [{}]
      };
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

        RegisterResponse.code = 200;
        RegisterResponse.success = true;
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
      const LoginResponse = {
        code: 200,
        success: true,
        message: "User was registered",
        errors: [{}],
        me: {}
      };

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
      LoginResponse.message = "User successfully loged in";
      LoginResponse.me = { id: user.id, email: user.email };
      return LoginResponse;
    }
  }
};
