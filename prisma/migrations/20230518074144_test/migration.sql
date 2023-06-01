-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "days" INTEGER NOT NULL,
    "rate" REAL NOT NULL,
    "percent" REAL NOT NULL DEFAULT 0,
    "totalRevenue" REAL NOT NULL,
    "dayProfit" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);
