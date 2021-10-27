const net = require("net");
const fs = require("fs");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const param = data.toString().split(/\n/);
    const index = ~param[0].indexOf("GET /index.html");
    const janken = ~param[0].indexOf("POST /janken");
    console.log(param);
    const statusLine = "HTTP/1.1 200 OK\r\n";
    const header = "Host: codesandbox\r\n";
    try {
      var response = "";
      if (index) {
        const text = fs.readFileSync("src/public/index.html", "utf-8");
        response = statusLine + header + "\r\n" + text + "\r\n";
      } else if (janken) {
        const results = ["勝ち", "負け", "あいこ"];
        const text = results[Math.floor(Math.random() * 3)];
        response = statusLine + header + "\r\n" + text + "\r\n";
      }
      socket.write(response);
    } catch (err) {
      console.error(err);
    }
    socket.end();
  });
});
server.listen(8080);
