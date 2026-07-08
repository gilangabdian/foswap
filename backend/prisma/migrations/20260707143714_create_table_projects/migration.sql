-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NULL,
    `status` ENUM('DRAFT', 'PROCESSING', 'DONE', 'FAILED') NOT NULL DEFAULT 'DRAFT',
    `transitionDuration` TINYINT NOT NULL DEFAULT 1,
    `backgroundType` ENUM('SOLID_COLOR', 'BLUR_IMAGE') NOT NULL DEFAULT 'SOLID_COLOR',
    `backgroundColor` VARCHAR(7) NULL,
    `resultVideoUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
