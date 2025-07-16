-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'editor', 'viewer');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'viewer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plantonista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Plantonista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plantao" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "plantonistaInternoId" INTEGER NOT NULL,
    "plantonistaExternoId" INTEGER NOT NULL,
    "houveAtendimentoExterno" BOOLEAN NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "Plantao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "plantaoId" INTEGER NOT NULL,
    "cliente" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "requisitante" TEXT NOT NULL,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plantonista_email_key" ON "Plantonista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plantao_data_key" ON "Plantao"("data");

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_plantonistaInternoId_fkey" FOREIGN KEY ("plantonistaInternoId") REFERENCES "Plantonista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_plantonistaExternoId_fkey" FOREIGN KEY ("plantonistaExternoId") REFERENCES "Plantonista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_plantaoId_fkey" FOREIGN KEY ("plantaoId") REFERENCES "Plantao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
