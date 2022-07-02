/*
  Warnings:

  - You are about to drop the column `variationDes1` on the `Variations` table. All the data in the column will be lost.
  - You are about to drop the column `variationDes2` on the `Variations` table. All the data in the column will be lost.
  - You are about to drop the column `variationDes3` on the `Variations` table. All the data in the column will be lost.
  - You are about to drop the column `variationName1` on the `Variations` table. All the data in the column will be lost.
  - You are about to drop the column `variationName2` on the `Variations` table. All the data in the column will be lost.
  - You are about to drop the column `variationName3` on the `Variations` table. All the data in the column will be lost.
  - Added the required column `varDes` to the `Variations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varName` to the `Variations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Variations` DROP COLUMN `variationDes1`,
    DROP COLUMN `variationDes2`,
    DROP COLUMN `variationDes3`,
    DROP COLUMN `variationName1`,
    DROP COLUMN `variationName2`,
    DROP COLUMN `variationName3`,
    ADD COLUMN `varDes` VARCHAR(191) NOT NULL,
    ADD COLUMN `varName` VARCHAR(191) NOT NULL;
