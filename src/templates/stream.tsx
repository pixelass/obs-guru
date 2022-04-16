import { StyledVideo } from "@/atoms/video/styled";
import { usePeer } from "@/ions/contexts/peer";
import { FitScreenLoader } from "@/ions/styles";
import { SocketEvents } from "@/ions/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

export default function Template() {
	const {
		query: { id },
	} = useRouter();
	const peer = usePeer();
	const video = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (peer) {
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
			let waitingUserId;
			peer.on("open", userId => {
				waitingUserId = userId;
				void axios.post("/api/pusher", {
					channel: id,
					data: { roomId: id, userId },
					event: SocketEvents.JoinRoom,
				});
			});

			const cleanup = (userId?: string) => {
				if (userId) {
					void axios.post("/api/pusher", {
						channel: id,
						data: { roomId: id, userId },
						event: SocketEvents.UserDisconnected,
					});
				}
			};

			const handleBeforeUnload = (event_: BeforeUnloadEvent) => {
				event_.preventDefault();
				// Chrome requires returnValue to be set.
				event_.returnValue = "";
				cleanup(waitingUserId);
			};

			window.addEventListener("beforeunload", handleBeforeUnload);

			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
				cleanup(waitingUserId);
			};
		}

		return () => {
			/* Keep cleanup */
		};
	}, [id, peer]);
	return (
		<>
			<FitScreenLoader />
			<StyledVideo ref={video} muted />
		</>
	);
}
