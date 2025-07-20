-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_session_id_fkey";

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "notesessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
