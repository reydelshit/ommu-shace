-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `coverPicture` VARCHAR(191) NULL,
    ADD COLUMN `interests` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    ADD COLUMN `verifiedBy` VARCHAR(191) NULL,
    ADD COLUMN `verifiedDate` VARCHAR(191) NULL,
    ADD COLUMN `verifiedStatus` VARCHAR(191) NULL;
