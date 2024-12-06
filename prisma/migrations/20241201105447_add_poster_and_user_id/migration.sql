-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("description", "id", "poster", "releaseDate", "title", "userId") SELECT "description", "id", "poster", "releaseDate", "title", "userId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
