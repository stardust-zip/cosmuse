import http from "node:http";

const host = "127.0.0.1";
const port = "8282";

const server = http.createServer((req, res) => {
  const chapters = [
    {
      id: 1,
      title: "Pillar of the World",
      wordCount: 10231,
    },
    {
      id: 2,
      title: "The Edge of Sunlight",
      wordCount: 10231,
    },
    {
      id: 3,
      title: "Whisper of Snow",
      wordCount: 10231,
    },
    {
      id: 4,
      title: "Wind of the West",
      wordCount: 10231,
    },
    {
      id: 5,
      title: "The Jewel of Tommorrow",
      wordCount: 10231,
    },
  ];
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
      break;
    default:
      console.log("Not implemented yet!");
  }
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
