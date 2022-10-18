-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "propertyName" TEXT NOT NULL,
    "propertyValue" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "platform" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_propertyName_key" ON "Config"("propertyName");
