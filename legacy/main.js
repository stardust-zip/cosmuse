import http from "node:http";
import db from "./db.js";

const host = "127.0.0.1";
const port = "8281";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Welcome to Cosmuse, my personal blog.",
          }),
        );
      } else if (req.url === "/chapters") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const chapters = db.prepare("SELECT * FROM chapters").all();
        res.end(JSON.stringify(chapters, null, 2));
      } else if (req.url.startsWith("/chapter/")) {
        const url_splitted = req.url.split("/");
        const targetId = parseInt(url_splitted[url_splitted.length - 1]);
        const chapter = db
          .prepare("SELECT * FROM chapters WHERE id = ?")
          .get(targetId);

        if (!chapter) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Not found" }));
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(chapter, null, 2));
        }
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Not found" }));
      }
      break;
    case "POST":
      if (req.url === "/chapters") {
        let body = "";

        req.on("data", (chunk) => {
          // 'chunk' is a Buffer (binary data).
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const data = JSON.parse(body);
            const info = db
              .prepare("INSERT INTO chapters (title, wordCount) VALUES (?, ?)")
              .run(data.title, data.wordCount);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                id: info.lastInsertRowid,
                title: data.title,
                wordCount: data.wordCount,
              }),
            );
          } catch (err) {
            console.log("Error while parsing JSON: ", err);
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to parse JSON" }));
          }
        });
      }
      break;
    case "PUT":
      if (req.url.startsWith("/chapter/")) {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const data = JSON.parse(body);

          const url_splitted = req.url.split("/");
          const targetId = parseInt(url_splitted[url_splitted.length - 1]);

          const info = db
            .prepare(
              "UPDATE chapters SET title = ?, wordCount = ? Where id = ?",
            )
            .run(data.title, data.wordCount, targetId);

          if (info.changes == 1) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(info));
          } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "update failed" }));
          }
        });
      }
      break;
    case "DELETE":
      if (req.url.startsWith("/chapter/")) {
        const url_splitted = req.url.split("/");
        const targetId = parseInt(url_splitted[url_splitted.length - 1]);

        const info = db
          .prepare("DELETE FROM chapters WHERE id = ?")
          .run(targetId);
        if (info.changes == 1) {
          res.end(JSON.stringify(info));
        } else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "delete failed" }));
        }
      } else {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
      break;
    default:
      console.log("Not implemented yet!");
  }
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
