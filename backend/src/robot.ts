export default class Robot {
    ws: WebSocket | null = null;

    constructor(url: string) {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            console.log("WebSocket connection opened");
        };

        this.ws.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        this.ws.onclose = (event) => {
            console.log(`WebSocket connection closed: ${event.code} - ${event.reason}`);
            this.ws = null;
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    say(message: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log(`Sending message to robot: ${message}`);
            this.ws.send(JSON.stringify({ type: "say", message }));
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    }
}