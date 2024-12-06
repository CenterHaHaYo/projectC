/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `poster` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Movie` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Cinema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Showtime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    CONSTRAINT "Showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Showtime_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "showtimeId" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("id", "title") SELECT "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
