-- DropForeignKey
ALTER TABLE "materials_on_works" DROP CONSTRAINT "materials_on_works_material_id_fkey";

-- AddForeignKey
ALTER TABLE "materials_on_works" ADD CONSTRAINT "materials_on_works_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "work_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
