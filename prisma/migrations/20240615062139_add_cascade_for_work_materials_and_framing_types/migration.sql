-- DropForeignKey
ALTER TABLE "framing_types_on_works" DROP CONSTRAINT "framing_types_on_works_work_id_fkey";

-- DropForeignKey
ALTER TABLE "materials_on_works" DROP CONSTRAINT "materials_on_works_work_id_fkey";

-- AddForeignKey
ALTER TABLE "materials_on_works" ADD CONSTRAINT "materials_on_works_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framing_types_on_works" ADD CONSTRAINT "framing_types_on_works_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;
