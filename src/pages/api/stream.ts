import { SocketEvents } from "@/ions/types";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, ServerOptions } from "socket.io";

// Fixes TS2339: Property 'server' does not exist on type 'Socket'.
// ToDo find a valid solution
interface FixIt {
	socket: {
		server: ServerOptions & {
			io: Server;
		};
	};
}

export default function handler(request: NextApiRequest, response: NextApiResponse & FixIt) {
	if (response.socket.server.io) {
		console.log("socket already running");
	} else {
		console.log("starting new socket");
		const io = new Server(response.socket.server);

		io.on("connection", socket => {
			console.log("new connection");
			socket.on(SocketEvents.JoinRoom, async (roomId, userId) => {
				console.log("join-room", { roomId, userId });
				await socket.join(roomId);
				socket.broadcast.to(roomId).emit(SocketEvents.UserConnected, userId);

				socket.on("disconnect", () => {
					console.log("disconnect");
					socket.broadcast.to(roomId).emit(SocketEvents.UserDisconnected, userId);
				});
			});
		});

		response.socket.server.io = io;
	}
	response.end();
}

export const config = {
	api: {
		bodyParser: false,
	},
};
