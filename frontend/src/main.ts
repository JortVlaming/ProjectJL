console.log("Hello from TypeScript!");
document.body.insertAdjacentHTML("beforeend", "<p>TypeScript compiled successfully ✅</p>");

const ws = new WebSocket("ws://100.93.139.18:3000");

ws.onopen = () => {
    console.log("WebSocket connection established");
    ws.send("Hello Server!");
};

ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
    document.body.insertAdjacentHTML("beforeend", `<p>Message from server: ${event.data}</p>`);
};

ws.onclose = () => {
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