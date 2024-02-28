-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('superadmin', 'moderator');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "full_name" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "role" "RoleEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
