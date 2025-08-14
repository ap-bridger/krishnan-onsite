-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "bankDetails" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "predVendor" TEXT,
    "pickedVendor" TEXT,
    "predCategory" TEXT,
    "pickedCategory" TEXT
);
