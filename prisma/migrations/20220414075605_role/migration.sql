-- AlterTable
ALTER TABLE `role` ADD COLUMN `permissions` JSON NOT NULL,
    ADD COLUMN `supplierId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
