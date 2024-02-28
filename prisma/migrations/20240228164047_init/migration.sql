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
    "work_id" TEXT NOT NULL,

    CONSTRAINT "work_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "path" VARCHAR NOT NULL,
    "preview_path" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_image_id" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framing_types" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work_id" TEXT NOT NULL,

    CONSTRAINT "framing_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_work_image_id_key" ON "files"("work_image_id");

-- AddForeignKey
ALTER TABLE "work_images" ADD CONSTRAINT "work_images_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_materials" ADD CONSTRAINT "work_materials_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_work_image_id_fkey" FOREIGN KEY ("work_image_id") REFERENCES "work_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framing_types" ADD CONSTRAINT "framing_types_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
