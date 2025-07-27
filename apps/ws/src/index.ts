import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({
    port: 8080,
})

server.on("connection", async (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
        console.log("Received message:", message);
    });
});