console.log("Hello from TypeScript!");
document.body.insertAdjacentHTML("beforeend", "<p>TypeScript compiled successfully ✅</p>");

const dot = document.getElementById("dot")!;
const text = document.getElementById("text")!;

// Change this URL to the actual WebSocket API endpoint you're connecting to
const ws = new WebSocket("ws://100.93.139.18:3000");

function setStatus(state: "connected" | "disconnected" | "error" | "connecting") {
    switch (state) {
        case "connected":
            dot.style.background = "limegreen";
            text.textContent = "Connected";
            break;
        case "disconnected":
            dot.style.background = "gray";
            text.textContent = "Disconnected";
            break;
        case "error":
            dot.style.background = "orange";
            text.textContent = "Connection Error";
            break;
        case "connecting":
            dot.style.background = "yellow";
            text.textContent = "Connecting...";
            break;
    }
}

setStatus("connecting");

ws.onopen = () => {
    setStatus("connected");
    console.log("WebSocket connection established");
    ws.send("Hello Server!");
};

ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
    document.getElementById("log")!.insertAdjacentHTML("beforeend", `<p>Message from server: ${event.data}</p>`);
};

ws.onclose = () => {
    setStatus("disconnected");
    console.log("WebSocket connection closed");
};

ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

function sendMessage(message: string) {
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