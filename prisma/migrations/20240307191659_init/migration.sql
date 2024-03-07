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

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR(120) NOT NULL,
    "description" VARCHAR NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "is_sold" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_images" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR NOT NULL,
    "alt" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_id" TEXT NOT NULL,

    CONSTRAINT "work_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_materials" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials_on_works" (
    "workId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,

    CONSTRAINT "materials_on_works_pkey" PRIMARY KEY ("workId","materialId")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_image_id" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_framing_types" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_id" TEXT NOT NULL,

    CONSTRAINT "work_framing_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_materials_title_key" ON "work_materials"("title");

-- CreateIndex
CREATE UNIQUE INDEX "files_work_image_id_key" ON "files"("work_image_id");

-- AddForeignKey
ALTER TABLE "work_images" ADD CONSTRAINT "work_images_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials_on_works" ADD CONSTRAINT "materials_on_works_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials_on_works" ADD CONSTRAINT "materials_on_works_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "work_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_work_image_id_fkey" FOREIGN KEY ("work_image_id") REFERENCES "work_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_framing_types" ADD CONSTRAINT "work_framing_types_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
