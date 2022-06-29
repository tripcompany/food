-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `engName` VARCHAR(191) NOT NULL,
    `thaiName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Variations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `varid` INTEGER NOT NULL,
    `variationName1` VARCHAR(191) NOT NULL,
    `variationDes1` VARCHAR(191) NOT NULL,
    `variationName2` VARCHAR(191) NOT NULL,
    `variationDes2` VARCHAR(191) NOT NULL,
    `variationName3` VARCHAR(191) NOT NULL,
    `variationDes3` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToFood` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToFood_AB_unique`(`A`, `B`),
    INDEX `_CategoryToFood_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Variations` ADD CONSTRAINT `Variations_varid_fkey` FOREIGN KEY (`varid`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToFood` ADD CONSTRAINT `_CategoryToFood_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToFood` ADD CONSTRAINT `_CategoryToFood_B_fkey` FOREIGN KEY (`B`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
