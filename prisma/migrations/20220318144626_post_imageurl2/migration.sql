/*
  Warnings:

  - You are about to drop the column `imageurl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageurl",
ADD COLUMN     "imageUrl" TEXT;
