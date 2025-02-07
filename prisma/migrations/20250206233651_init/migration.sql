-- CreateTable
CREATE TABLE `Prestador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestNome` VARCHAR(191) NOT NULL,
    `prestEndereco` VARCHAR(191) NOT NULL,
    `prestNumero` VARCHAR(191) NOT NULL,
    `prestComplemento` VARCHAR(191) NOT NULL,
    `prestBairro` VARCHAR(191) NOT NULL,
    `prestCEP` VARCHAR(191) NOT NULL,
    `telefone1` VARCHAR(191) NOT NULL,
    `telefone2` VARCHAR(191) NOT NULL,
    `telefone3` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
