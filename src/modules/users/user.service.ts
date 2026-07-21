import { userRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema";
import { hashPassword } from "../../plugins/bcrypt";
import { AppError } from "@/src/errors/app.error";
import { uploadService } from "../../services/upload.service";
import { MultipartFile } from "@fastify/multipart";

export const userService = {
  async createUser(data: CreateUserDTO) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Já existe um utilizador registado com e-mail", 409);
    }
    const hashedPassword = hashPassword(data.passwordHash);
    return userRepository.create({ ...data, passwordHash: hashedPassword });
  },

  async getUserById(id: string) {
    if (!id) throw new Error("ID required");
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("Utilizador não encontrado", 404);
    }
    return user;
  },

  async getUserByName(name: string) {
    if (!name) throw new Error("Name required");
    let user = await userRepository.findByName(name);
    if (!user) {
      throw new AppError("Utilizador não encontrado", 404);
    }
    return user;
  },

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("Utilizador não encontrado", 404);
    }
    return userRepository.update(id, data);
  },

  async updateAvatar(id: string, file: MultipartFile) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Utilizador não encontrado.", 404);
    }

    if (user.avatarPublicId) {
      await uploadService.remove(user.avatarPublicId);
    }

    const image = await uploadService.upload(file, "portfolio/users");
    return userRepository.updateAvatar(user.id, image.url, image.publicId);
  },

  async removeAvatar(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("Utilizador não encontrado.", 404);
    }

    if (!user.avatarPublicId) {
      return user;
    }

    await uploadService.remove(user.avatarPublicId);

    return userRepository.updateAvatar(user.id, "", "");
  },

  async deleteUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("Utilizador não encontrado", 404);
    }
    return userRepository.delete(id);
  },
};
