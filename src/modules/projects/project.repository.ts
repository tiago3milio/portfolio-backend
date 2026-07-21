import { prisma } from "@/lib/prisma";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.schema";

export const projectRepository = {
  async create(data: CreateProjectDTO) {
    return prisma.project.create({ data });
  },

  async findMany() {
    return prisma.project.findMany();
  },

  async findUnique(id: string) {
    return prisma.project.findUnique({
      where: { id },
    });
  },

  async updateThumbnail(
    id: string,
    thumbnail: string,
    thumbnailPublicId: string,
  ) {
    return prisma.project.update({
      where: { id },
      data: {
        thumbnail,
        thumbnailPublicId,
      },
    });
  },

  async update(id: string, data: UpdateProjectDTO) {
    return prisma.project.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  },
};
