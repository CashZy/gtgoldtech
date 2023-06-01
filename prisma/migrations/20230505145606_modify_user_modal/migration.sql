/*
  Warnings:

  - You are about to drop the column `Avatar` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT NOT NULL,
    "password" TEXT,
    "avatar" TEXT,
    "nickName" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT,
    "invitationId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "id", "isAdmin", "password", "phone", "updatedAt") SELECT "createdAt", "id", "isAdmin", "password", "phone", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
