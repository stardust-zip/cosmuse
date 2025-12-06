import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const isTest = process.env.NODE_ENV === "test";
const dbLocation = isTest
  ? ":memory:"
  : path.join(import.meta.dirname, "../cosmuse.db");

const db = new Database(dbLocation);

const sqlPath = path.join(import.meta.dirname, "sql", "create_tables.sql");

const createTable = fs.readFileSync(sqlPath, "utf-8");

db.exec(createTable);

if (isTest) {
  const title = "Test Post";
  const content = "Test Content";

  db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").run(
    title,
    content,
  );
} else if (
  db.prepare("SELECT EXISTS (SELECT 1 FROM posts) as val").pluck(true).get() ===
  0
) {
  db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").run(
    "A New Dawn",
    "Let's start with a new day.",
  );
  db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").run(
    "Learn Backend with JS",
    "I think JS is alrigth.",
  );
  db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").run(
    "Zed Editor is great!",
    "Zed is better than VSCode.",
  );
}

export default db;
