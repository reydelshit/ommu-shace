-- AlterTable
ALTER TABLE `eventattendees` ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CHECKED_IN') NOT NULL DEFAULT 'PENDING';
