/*
  Warnings:

  - You are about to drop the `UserLesson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Stack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UserLesson" DROP CONSTRAINT "UserLesson_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLesson" DROP CONSTRAINT "UserLesson_userId_fkey";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "code" TEXT,
ADD COLUMN     "lastVisited" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stack" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."UserLesson";

-- AddForeignKey
ALTER TABLE "Stack" ADD CONSTRAINT "Stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
