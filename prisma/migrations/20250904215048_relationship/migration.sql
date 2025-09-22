-- AddForeignKey
ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
