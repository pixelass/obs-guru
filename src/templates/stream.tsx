import { StyledVideo } from "@/atoms/video/styled";
import { usePeer } from "@/ions/contexts/peer";
import { useSocket } from "@/ions/hooks/socket";
import { fitScreen } from "@/ions/styles";
import { SocketEvents } from "@/ions/types";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

export default function Template() {
	const {
		query: { id },
	} = useRouter();
	const peer = usePeer();
	const socket = useSocket();
	const video = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (peer && socket) {
			peer.on("call", function (call) {
				call.answer();
				call.on("stream", remoteStream => {
					video.current.srcObject = remoteStream;
					video.current.muted = true;
					video.current.addEventListener("loadedmetadata", () => {
						void video.current.play();
					});
				});
			});

			peer.on("open", peerId => {
				socket.emit(SocketEvents.JoinRoom, id, peerId);
			});
		}
	}, [id, peer, socket]);
	return (
		<>
			{fitScreen}
			<StyledVideo ref={video} muted />
		</>
	);
}
