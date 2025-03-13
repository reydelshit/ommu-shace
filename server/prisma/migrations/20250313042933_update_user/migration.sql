-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `phoneNumber` DROP DEFAULT,
    ALTER COLUMN `username` DROP DEFAULT;
