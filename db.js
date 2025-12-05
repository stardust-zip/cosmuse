import Database from "better-sqlite3";
const db = new Database("cosmuse.db");

// WAL mode is generally safer and faster for concurrency.
// db.pragma("journa;_mode = WAL");

const createChapterTable = `
  CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    wordCount INTEGER
  );
`;

const insertDefaultChaptersData = `
  INSERT INTO chapters (title, wordCount) VALUES ('Pillar of the World', 10231);
  INSERT INTO chapters (title, wordCount) VALUES ('The Edge of Sunlight', 5234);
  INSERT INTO chapters (title, wordCount) VALUES ('Whisper of Snow', 4421);
  INSERT INTO chapters (title, wordCount) VALUES ('Wind of the West', 6201);
  INSERT INTO chapters (title, wordCount) VALUES ('The Jewel of Tommorrow', 8282);
`;

db.exec(createChapterTable);
if (
  db
    .prepare("SELECT EXISTS(SELECT 1 FROM chapters) as val")
    .pluck(true)
    .get() === 0
) {
  db.exec(insertDefaultChaptersData);
}

export default db;
