import { comparePassword, hashPassword } from "../../plugins/bcrypt";
import { userRepository } from "../users/user.repository";
import { ForgotPasswordDTO, loginSchemaDTO } from "./auth.schema";

export const authService = {
  async login(data: loginSchemaDTO) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Credenciais inválidas!");
    }

    const passwordMatch = comparePassword(data.password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas!");
    }
    return user;
  },

  async forgotPassword(data: ForgotPasswordDTO) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      return null;
    }
    return user;
  },

  async resetPassword(userId: string, password: string) {
    const passwordHash = hashPassword(password);
    await userRepository.updatePassword(userId, passwordHash);
  },
};
