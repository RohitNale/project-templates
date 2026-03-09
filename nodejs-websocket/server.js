import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// 0: Connecting
// 1: Open
// 2: Closing
// 3: Closed

// Connection Event
wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log("Client connected from ", ip);

    // Message Event
    socket.on("message", (rawData) => {
        const message = rawData.toString();
        console.log("Message from client: ", message);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server: ${message}`);
            }
        });
    });

    // Error Event
    socket.on("error", (error) => {
        console.log(`Error: ${error.message}: ${ip}`);
    });
    
    // Close Event
    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is live on ws://localhost:8080");