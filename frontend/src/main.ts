const WS_URL = "ws://100.93.139.18:3000";

const dot = document.getElementById("dot")!;
const text = document.getElementById("text")!;

// Change this URL to the actual WebSocket API endpoint you're connecting to
let ws: WebSocket | null = null;

function setStatus(state: "connected" | "disconnected" | "error" | "connecting") {
    switch (state) {
        case "connected":
            dot.style.background = "limegreen";
            text.textContent = "Connected";
            document.getElementById("connectButton")!.innerHTML = "disconnect";
            document.getElementById("wsConnected")!.style.display = "block";
            break;
        case "disconnected":
            dot.style.background = "gray";
            text.textContent = "Disconnected";
            document.getElementById("connectButton")!.innerHTML = "connect";
            document.getElementById("wsConnected")!.style.display = "none";
            break;
        case "error":
            dot.style.background = "orange";
            text.textContent = "Connection Error";
            break;
        case "connecting":
            dot.style.background = "yellow";
            text.textContent = "Connecting...";
            document.getElementById("connectButton")!.innerHTML = "disconnect";
            document.getElementById("wsConnected")!.style.display = "none";
            break;
    }
}

setStatus("disconnected");

function createWebSocket() {
    setStatus("connecting");
    ws = new WebSocket(WS_URL);
    ws.onopen = () => {
        if (!ws) return;
        setStatus("connected");
        console.log("WebSocket connection established");
        ws.send("Hello Server!");
    };

    ws.onmessage = (event) => {
        if (!ws) return;
        console.log("Message from server:", event.data);
        document.body.insertAdjacentHTML("beforeend", `<p>Message from server: ${event.data}</p>`);
    };

    ws.onclose = () => {
        if (!ws) return;
        setStatus("disconnected");
        console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
        if (!ws) return;
        console.error("WebSocket error:", error);
    };
}

function sendMessage(message: string) {
    if (!ws) {
        console.error("WebSocket is not initialized.");
        return;
    }
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        console.log("Sent to server:", message);
    } else {
        console.error("WebSocket is not open. Ready state:", ws.readyState);
    }
}

document.getElementById("sendMessageButton")?.addEventListener("click", () => {
    const input = document.getElementById("messageInput") as HTMLInputElement;
    if (input && input.value) {
        sendMessage(input.value);
        input.value = "";
    }
});

document.getElementById("connectButton")?.addEventListener("click", () => {
    if (document.getElementById("connectButton")!.innerHTML === "disconnect") {
        if (ws) {
            ws.close();
            ws = null;
        }
        setStatus("disconnected");
        return;
    }
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already connected.");
        return;
    }
    createWebSocket();
});