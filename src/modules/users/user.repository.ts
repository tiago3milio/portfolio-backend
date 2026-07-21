import { prisma } from "@/lib/prisma";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema";

export const userRepository = {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async findByName(name: string) {
    return prisma.user.findUnique({
      where: {
        name,
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  async update(id: string, data: UpdateUserDTO) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async updateAvatar(id: string, avatarUrl: string) {
    return prisma.user.update({
      where: { id },
      data: { avatarUrl },
    });
  },

  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
