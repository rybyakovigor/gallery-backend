-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_work_image_id_fkey";

-- DropForeignKey
ALTER TABLE "work_images" DROP CONSTRAINT "work_images_work_id_fkey";

-- AddForeignKey
ALTER TABLE "work_images" ADD CONSTRAINT "work_images_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_work_image_id_fkey" FOREIGN KEY ("work_image_id") REFERENCES "work_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
