export default class Robot {
    ws: WebSocket | null = null;
    robot_ip: string;

    constructor(url: string, robot_ip: string = "192.168.2.196") {
        this.ws = new WebSocket(url);
        this.robot_ip = robot_ip

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
            this.ws.send(JSON.stringify({
                type: "method",
                robot: this.robot_ip,
                service: "ALTextToSpeech",
                method: "say",
                args: [message]
            }));
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    }
}