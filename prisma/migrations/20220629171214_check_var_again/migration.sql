/*
  Warnings:

  - You are about to drop the column `varid` on the `Variations` table. All the data in the column will be lost.
  - Added the required column `originId` to the `Variations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Variations` DROP FOREIGN KEY `Variations_varid_fkey`;

-- AlterTable
ALTER TABLE `Variations` DROP COLUMN `varid`,
    ADD COLUMN `originId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Variations` ADD CONSTRAINT `Variations_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
