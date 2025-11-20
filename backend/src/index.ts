import Robot from "./robot";

const robot: Robot = new Robot("ws://localhost:9000");

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
            // ws.send(message); // echo the message back
            console.log(`message received: ${message}`);
            if (message === "Hello Server!") {
                ws.send("Hello Client!");
                return;
            }
            if (message.includes("{") && message.includes("}")) {
                try {
                    let parsed = JSON.parse(message.toString()) as { type: "say"; message: string } | { type: "time"; };
                    console.log("parsed JSON:", parsed);
                    switch (parsed.type) {
                        case "say":
                            const message = parsed.message;
                            if (message === undefined) return;
                            ws.send(`You said: ${message}`);
                            robot.say(message);
                            break;
                        case "time":
                            ws.send(`Server time is: ${new Date().toLocaleTimeString()}`);
                            break;
                        default:
                            // ws.send(`Unknown type: ${parsed.type}`);
                    }
                } catch (e) {
                    console.error("Failed to parse JSON:", e);
                    ws.send("Error: Invalid JSON format.");
                }
            }
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
