/*
  Warnings:

  - Added the required column `updatedAt` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bank" ("account", "bank", "id", "ifsc", "name", "userId") SELECT "account", "bank", "id", "ifsc", "name", "userId" FROM "Bank";
DROP TABLE "Bank";
ALTER TABLE "new_Bank" RENAME TO "Bank";
CREATE UNIQUE INDEX "Bank_userId_key" ON "Bank"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
