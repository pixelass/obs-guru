import { produce } from "immer";
import { MediaConnection } from "peerjs";
import create from "zustand";

export type Peers = Record<string, MediaConnection>;

export interface StoreModel {
	stream: MediaStream | undefined;
	peers: Peers;
	setStream(stream: MediaStream): void;
	addPeer(userId: string, connection: MediaConnection): void;
	removePeer(userId: string): void;
}

export const useStore = create<StoreModel>(set => ({
	stream: undefined,
	peers: {},
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
