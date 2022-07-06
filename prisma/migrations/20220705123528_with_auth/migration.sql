/*
  Warnings:

  - You are about to drop the column `foodid` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the `Ingridient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodToIngridient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thaiName` to the `Method` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Food` DROP FOREIGN KEY `Food_foodid_fkey`;

-- DropForeignKey
ALTER TABLE `_FoodToIngridient` DROP FOREIGN KEY `_FoodToIngridient_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FoodToIngridient` DROP FOREIGN KEY `_FoodToIngridient_B_fkey`;

-- AlterTable
ALTER TABLE `Food` DROP COLUMN `foodid`;

-- AlterTable
ALTER TABLE `Method` ADD COLUMN `thaiName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Ingridient`;

-- DropTable
DROP TABLE `_FoodToIngridient`;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thaiName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `img1` VARCHAR(191) NULL,

    UNIQUE INDEX `Ingredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FoodToMethod` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FoodToMethod_AB_unique`(`A`, `B`),
    INDEX `_FoodToMethod_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FoodToIngredient` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FoodToIngredient_AB_unique`(`A`, `B`),
    INDEX `_FoodToIngredient_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToMethod` ADD CONSTRAINT `_FoodToMethod_A_fkey` FOREIGN KEY (`A`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToMethod` ADD CONSTRAINT `_FoodToMethod_B_fkey` FOREIGN KEY (`B`) REFERENCES `Method`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToIngredient` ADD CONSTRAINT `_FoodToIngredient_A_fkey` FOREIGN KEY (`A`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodToIngredient` ADD CONSTRAINT `_FoodToIngredient_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
