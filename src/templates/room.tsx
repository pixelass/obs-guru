import { constraints } from "@/ions/constants";
import { usePeer } from "@/ions/contexts/peer";
import { startCapture } from "@/ions/hooks/screen-share";
import { useSocket } from "@/ions/hooks/socket";
import { useStore } from "@/ions/store";
import { SocketEvents } from "@/ions/types";
import StreamCard from "@/organisms/stream-card";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

export default function Template() {
	const {
		query: { id },
	} = useRouter();
	const peer = usePeer();
	const socket = useSocket();
	const stream = useStore(state => state.stream);

	const start = useCallback(() => {
		startCapture(constraints).then(stream => {
			useStore.getState().setStream(stream);
		});
	}, []);

	useEffect(() => {
		if (peer && socket) {
			socket.on(SocketEvents.UserConnected, (userId: string) => {
				useStore.getState().addPeer(userId, peer.call(userId, useStore.getState().stream));
			});

			socket.on(SocketEvents.UserDisconnected, (userId: string) => {
				useStore.getState().removePeer(userId);
			});

			peer.on("open", userId => {
				socket.emit(SocketEvents.JoinRoom, id, userId);
			});
		}
	}, [socket, peer, id]);

	return <StreamCard stream={stream} id={id as string} onStart={start} />;
}
