/*
  Warnings:

  - You are about to drop the column `techonologies` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "techonologies",
ADD COLUMN     "technologies" TEXT[];
