-- AlterTable
ALTER TABLE `Prestador` MODIFY `prestNome` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `prestEndereco` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `prestNumero` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `prestComplemento` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `prestBairro` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `prestCEP` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `telefone1` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `telefone2` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `telefone3` VARCHAR(191) NOT NULL DEFAULT '';
