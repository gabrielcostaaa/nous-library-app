-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'OVERDUE', 'RETURNED');

-- CreateTable
CREATE TABLE "users" (
    "usr_id" TEXT NOT NULL,
    "usr_name" TEXT NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_role" "Role" NOT NULL DEFAULT 'USER',
    "usr_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("usr_id")
);

-- CreateTable
CREATE TABLE "books" (
    "bok_id" TEXT NOT NULL,
    "bok_title" TEXT NOT NULL,
    "bok_author" TEXT NOT NULL,
    "bok_base_price" DOUBLE PRECISION NOT NULL,
    "bok_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bok_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("bok_id")
);

-- CreateTable
CREATE TABLE "loans" (
    "lon_id" TEXT NOT NULL,
    "lon_usr_id" TEXT NOT NULL,
    "lon_bok_id" TEXT NOT NULL,
    "lon_loan_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lon_due_date" TIMESTAMP(3) NOT NULL,
    "lon_return_date" TIMESTAMP(3),
    "lon_status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "lon_fine_discount_applied" BOOLEAN NOT NULL DEFAULT false,
    "lon_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lon_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("lon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_usr_email_key" ON "users"("usr_email");

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_lon_usr_id_fkey" FOREIGN KEY ("lon_usr_id") REFERENCES "users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_lon_bok_id_fkey" FOREIGN KEY ("lon_bok_id") REFERENCES "books"("bok_id") ON DELETE RESTRICT ON UPDATE CASCADE;
