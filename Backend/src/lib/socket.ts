import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"

const app = express();
const server = createServer(app)

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
	}
})

io.on('connection', (socket) => {
	console.log("User connected: ", socket.id)
	
	socket.on('disconnect', () => {
		console.log("User disconnected: ", socket.id)
	})
})

export { app, server, io }