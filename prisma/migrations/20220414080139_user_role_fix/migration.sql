/*
  Warnings:

  - You are about to drop the column `supplierId` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_supplierId_fkey`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `supplierId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
