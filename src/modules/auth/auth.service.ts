import { comparePassword } from "../../plugins/bcrypt";
import { userRepository } from "../users/user.repository";
import { loginSchemaDTO } from "./auth.schema";

export const authService= {
  async login(data: loginSchemaDTO) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Credenciais inválidas!");
    }

    const passwordMatch = comparePassword(data.password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas!");
    }

    return user
  },
};
