const http = require("node:http");
const fs = require("node:fs");
const port = Number(process.env.PORT || 8080);

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      ok: true,
      service: "mcp-server-guide-runtime",
      mcp: "https://mcp.figma.com/mcp"
    }));
    return;
  }

  if (req.url === "/readme") {
    try {
      const body = fs.readFileSync("README.md", "utf8");
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      res.end(body);
    } catch {
      res.writeHead(500);
      res.end("README unavailable");
    }
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
