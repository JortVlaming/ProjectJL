Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch(req, server) {
        // Check if this is a WebSocket upgrade request
        if (server.upgrade(req)) {
            // WebSocket upgrade was successful
            return;
        }
        
        // Handle regular HTTP requests
        return new Response("Hello World!");
    }, // upgrade logic
    websocket: {
        // a message is received
        message(ws, message) {
            ws.send(message);
            console.log(`message received: ${message}`);
        },
        // a socket is opened
        open(ws) {
            console.log("socket opened");
            ws.send("Bite my shiny metal ass!");
        },
        // a socket is closed
        close(ws, code, message) {
            console.log(`socket closed: ${code} - ${message}`);
        },
        // the socket is ready to receive more data
        drain(ws) { },
    },
});
