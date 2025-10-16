const WS_URL = "ws://100.93.139.18:3000";

const dot = document.getElementById("dot")!;
const text = document.getElementById("text")!;

const connectButton = document.getElementById("connectButton")!;
const sendMessageButton = document.getElementById("sendMessageButton")!;

const wsConnectedDiv = document.getElementById("wsConnected")!;
const log = document.getElementById("log");

let ws: WebSocket | null = null;

function setStatus(state: "connected" | "disconnected" | "error" | "connecting") {
    switch (state) {
        case "connected":
            dot.style.background = "limegreen";
            text.textContent = "Connected";
            connectButton.innerHTML = "disconnect";
            wsConnectedDiv.style.display = "block";
            break;
        case "disconnected":
            dot.style.background = "gray";
            text.textContent = "Disconnected";
            connectButton.innerHTML = "connect";
            wsConnectedDiv.style.display = "none";
            break;
        case "error":
            dot.style.background = "orange";
            text.textContent = "Connection Error";
            break;
        case "connecting":
            dot.style.background = "yellow";
            text.textContent = "Connecting...";
            connectButton.innerHTML = "disconnect";
            wsConnectedDiv.style.display = "none";
            break;
    }
}

setStatus("disconnected");

function addLog(message: string) {
    if (log) {
        const entry = document.createElement("div");
        entry.textContent = message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight; // Auto-scroll to the bottom
    }
}

function createWebSocket() {
    setStatus("connecting");
    ws = new WebSocket(WS_URL);
    ws.onopen = () => {
        if (!ws) return;
        setStatus("connected");
        console.log("WebSocket connection established");
        addLog("WebSocket connection established");
        ws.send("Hello Server!");
    };

    ws.onmessage = (event) => {
        if (!ws) return;
        console.log("Message from server:", event.data);
        addLog(`[Server]: ${event.data}`);
    };

    ws.onclose = (event) => {
        if (!ws) return;
        setStatus("disconnected");
        console.log("WebSocket connection closed");

        if (event.code !== 1000) {
            console.error("WebSocket closed unexpectedly with code:", event.code);
            setStatus("error");

            attemptReconnection();
        }

        addLog("WebSocket connection closed");
    };

    ws.onerror = (error) => {
        if (!ws) return;
        console.error("WebSocket error:", error);
        setStatus("error");
        addLog("WebSocket error occurred! Check console for details.");
    };
}

function attemptReconnection() {
    const retryInterval = 5000; // 5 seconds
    console.log(`Attempting to reconnect in ${retryInterval / 1000} seconds...`);
    setTimeout(() => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
            addLog("Attempting to reconnect...");
            createWebSocket();
        }
    }, retryInterval);
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
        addLog(`[You]: ${input.value}`);
        sendMessage(input.value);
        input.value = "";
    }
});

document.getElementById("connectButton")?.addEventListener("click", () => {
    if (document.getElementById("connectButton")!.innerHTML === "disconnect") {
        if (ws) {
            ws.close(1000, "User disconnected");
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