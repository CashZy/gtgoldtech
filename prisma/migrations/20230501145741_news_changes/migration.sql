-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT,
    "image" TEXT,
    "Featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_News" ("body", "createdAt", "id", "slug", "title", "updatedAt") SELECT "body", "createdAt", "id", "slug", "title", "updatedAt" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
CREATE UNIQUE INDEX "News_title_key" ON "News"("title");
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
