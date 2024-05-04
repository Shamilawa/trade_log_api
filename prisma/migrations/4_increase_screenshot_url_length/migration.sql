-- CreateTable
CREATE TABLE `trade_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `currency_pair` VARCHAR(255) NOT NULL,
    `entry_price` DECIMAL(10, 4) NULL,
    `exit_price` DECIMAL(10, 4) NULL,
    `entry_time` TIMESTAMP(0) NULL,
    `exit_time` TIMESTAMP(0) NULL,
    `position_size` FLOAT NOT NULL,
    `profit` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PROFIT', 'LOSS') NULL,
    `strategy` VARCHAR(255) NULL,
    `risk_reward_ratio` DECIMAL(10, 2) NULL,
    `comment` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `user_id` INTEGER NOT NULL,
    `entry_screenshot_url` VARCHAR(255) NULL,
    `exit_screenshot_url` VARCHAR(255) NULL,

    INDEX `fk_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trade_log` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

