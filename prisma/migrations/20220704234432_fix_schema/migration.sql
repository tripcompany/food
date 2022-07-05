/*
  Warnings:

  - You are about to drop the `_FoodToMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foodid` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_FoodToMethod` DROP FOREIGN KEY `_FoodToMethod_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FoodToMethod` DROP FOREIGN KEY `_FoodToMethod_B_fkey`;

-- AlterTable
ALTER TABLE `Food` ADD COLUMN `foodid` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_FoodToMethod`;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_foodid_fkey` FOREIGN KEY (`foodid`) REFERENCES `Method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
