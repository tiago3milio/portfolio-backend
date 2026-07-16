import { userRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema";
import { hashPassword } from "../../plugins/bcrypt";

export const userService = {
  async createUser(data: CreateUserDTO) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = hashPassword(data.passwordHash);
    return userRepository.create({ ...data, passwordHash: hashedPassword });
  },

  async getUserById(id: string) {
    if (!id) throw new Error("ID required");
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async getUserByName(name: string) {
    if (!name) throw new Error("Name required");
    let user = await userRepository.findByName(name);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.update(id, data);
  },

  async deleteUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(id);
  },
};
