interface ServerResponse extends Errors {
  code: number;
  success: boolean;
  message: string;
}

interface Errors {
  errors: { message: string }[] | null;
}

export const RegisterResponse: ServerResponse = {
  code: 200,
  success: true,
  message: "Registration was successful.",
  errors: null
};

interface LoginServerResponse extends ServerResponse {
  me: {
    id: number;
    email: string;
    fullName: string;
  } | null;
}

export const LoginResponse: LoginServerResponse = {
  code: 200,
  success: true,
  message: "User successfully loged in.",
  errors: null,
  me: null
};
