import { produce } from "immer";
import { MediaConnection } from "peerjs";
import create from "zustand";

export type Peers = Record<string, MediaConnection>;

export interface StoreModel {
	stream: MediaStream | undefined;
	peers: Peers;
	width: number;
	height: number;
	setHeight(height: number): void;
	setWidth(width: number): void;
	setStream(stream: MediaStream): void;
	addPeer(userId: string, connection: MediaConnection): void;
	removePeer(userId: string): void;
}

export const useStore = create<StoreModel>(set => ({
	stream: undefined,
	peers: {},
	width: 2160,
	height: 1440,
	setHeight(height) {
		set({ height });
	},
	setWidth(width) {
		set({ width });
	},
	setStream(stream) {
		set({ stream });
	},
	addPeer(userId, connection) {
		set(
			produce<StoreModel>(state => {
				state.peers[userId] = connection;
			})
		);
	},
	removePeer(userId) {
		set(
			produce<StoreModel>(state => {
				if (state.peers[userId]) {
					state.peers[userId].close();
					state.peers[userId] = undefined;
				}
			})
		);
	},
}));
