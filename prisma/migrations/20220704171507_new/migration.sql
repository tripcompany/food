/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Variations` DROP FOREIGN KEY `Variations_originId_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToFood` DROP FOREIGN KEY `_CategoryToFood_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToFood` DROP FOREIGN KEY `_CategoryToFood_B_fkey`;

-- AlterTable
ALTER TABLE `Food` ADD COLUMN `img1` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Variations` MODIFY `originId` INTEGER NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `_CategoryToFood`;

-- CreateTable
CREATE TABLE `Method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `img1` VARCHAR(191) NULL,

    UNIQUE INDEX `Method_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingridient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `img1` VARCHAR(191) NULL,

    UNIQUE INDEX `Ingridient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FoodToMethod` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FoodToMethod_AB_unique`(`A`, `B`),
    INDEX `_FoodToMethod_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FoodToIngridient` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FoodToIngridient_AB_unique`(`A`, `B`),
    INDEX `_FoodToIngridient_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Variations` ADD CONSTRAINT `Variations_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `Food`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToMethod` ADD CONSTRAINT `_FoodToMethod_A_fkey` FOREIGN KEY (`A`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToMethod` ADD CONSTRAINT `_FoodToMethod_B_fkey` FOREIGN KEY (`B`) REFERENCES `Method`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToIngridient` ADD CONSTRAINT `_FoodToIngridient_A_fkey` FOREIGN KEY (`A`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToIngridient` ADD CONSTRAINT `_FoodToIngridient_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ingridient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
