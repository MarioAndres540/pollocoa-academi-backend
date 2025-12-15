import { io } from "socket.io-client";

// Ensure PORT matches your .env or default (3000)
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

console.log(`Attempting to connect to ${URL}...`);

const socket = io(URL, {
    transports: ["websocket", "polling"],
});

socket.on("connect", () => {
    console.log(`✅ SUCCESS: Connected to WebSocket server! Socket ID: ${socket.id}`);

    // Optional: Wait a bit and then disconnect
    setTimeout(() => {
        console.log("Disconnecting...");
        socket.disconnect();
        process.exit(0);
    }, 1000);
});

socket.on("connect_error", (err: any) => {
    console.error(`❌ Connection Error: ${err.message}`);
    // process.exit(1); // Don't exit immediately, let it retry or fail
});

socket.on("disconnect", (reason) => {
    console.log(`Disconnected: ${reason}`);
});

// Timeout if it doesn't connect
setTimeout(() => {
    if (!socket.connected) {
        console.error("❌ TIMEOUT: Could not connect to WebSocket server within 5 seconds.");
        process.exit(1);
    }
}, 5000);
