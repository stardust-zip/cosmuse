import http from "node:http";
import db from "./db.js";

const host = "127.0.0.1";
const port = "8282";

const query = db.prepare("SELECT * FROM chapters");
const chapters = query.all();
console.log(chapters);

const server = http.createServer((req, res) => {
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
        res.end(JSON.stringify(chapters, null, 2));
      } else if (req.url.startsWith("/chapter/")) {
        const url_splitted = req.url.split("/");
        const targetId = parseInt(url_splitted[url_splitted.length - 1]);
        const chapter = chapters.find((c) => c.id === targetId);

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
            const newId =
              chapters.length > 0 ? chapters[chapters.length - 1].id + 1 : 1;
            const chapter = {
              id: newId,
              title: data.title,
              wordCount: data.wordCount,
            };
            chapters.push(chapter);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(chapter));
          } catch (err) {
            console.log("Error while parsing JSON: ", err);
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to parse JSON" }));
          }
        });
      }
      break;
    default:
      console.log("Not implemented yet!");
  }
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
