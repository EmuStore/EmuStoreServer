-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "propertyName" TEXT NOT NULL,
    "propertyValue" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_propertyName_key" ON "Config"("propertyName");
