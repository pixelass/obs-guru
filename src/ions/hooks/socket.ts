import axios from "axios";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
	const [socket, setSocket] = useState<Socket>(null);
	useEffect(() => {
		axios
			.get("/api/stream")
			.then(() => {
				setSocket(io());
			})
			.catch(error_ => {
				console.error(error_);
			});
	}, []);
	return socket;
}
