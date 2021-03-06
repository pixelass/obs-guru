import { usePeer } from "@/ions/contexts/peer";
import { usePusher } from "@/ions/hooks/pusher";
import { useStore } from "@/ions/store";
import { SocketEvents } from "@/ions/types";
import { startCameraCapture, startScreenCapture } from "@/ions/utils/screen-share";
import StreamCard from "@/organisms/stream-card";
import { Column, Grid } from "@contour/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";

export default function Template() {
	const {
		query: { id },
	} = useRouter();
	const peer = usePeer();
	const stream = useStore(state => state.stream);
	const height = useStore(state => state.height);
	const width = useStore(state => state.width);

	const startScreenShare = useCallback(async () => {
		const stream = await startScreenCapture({
			audio: false,
			video: {
				width,
				height,
			},
		});
		useStore.getState().setStream(stream);
	}, [height, width]);

	const startCameraShare = useCallback(async () => {
		const stream = await startCameraCapture({
			audio: false,
			video: true,
		});
		useStore.getState().setStream(stream);
	}, []);

	usePusher(
		id as string,
		useMemo(
			() => ({
				[SocketEvents.JoinRoom]({ userId }: { userId: string; roomId: string }) {
					console.log("Connect", userId);
					if (peer) {
						useStore
							.getState()
							.addPeer(userId, peer.call(userId, useStore.getState().stream));
					}
				},
				[SocketEvents.UserDisconnected]({ userId }: { userId: string; roomId: string }) {
					console.log("Disconnect", userId);
					useStore.getState().removePeer(userId);
				},
			}),
			[peer]
		)
	);

	useEffect(() => {
		if (peer) {
			peer.on("open", userId => {
				void axios.post("/api/pusher", {
					channel: id,
					data: { roomId: id, userId },
					event: SocketEvents.JoinRoom,
				});
			});
		}
	}, [peer, id]);

	return (
		<Grid
			strategy="grid"
			colCount={{ xs: 2, s: 2, m: 6, l: 6, xl: 6 }}
			sx={{ minHeight: "100vh" }}
		>
			<Column
				flex
				colStart={{ m: 2, l: 2, xl: 2 }}
				colSpan={{ m: 4 }}
				sx={{ alignItems: "center", justifyContent: "stretch" }}
			>
				<StreamCard
					stream={stream}
					id={id as string}
					onShareScreen={startScreenShare}
					onShareCamera={startCameraShare}
					onStop={() => {
						const tracks = useStore.getState().stream.getTracks();
						for (const track of tracks) {
							track.stop();
						}

						useStore.getState().setStream(null);
					}}
				/>
			</Column>
		</Grid>
	);
}
