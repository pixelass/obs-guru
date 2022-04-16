import type PeerType from "peerjs";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const PeerContext = createContext<PeerType>(null);

interface PeerProviderProps {
	children: ReactNode;
}

export function PeerProvider({ children }: PeerProviderProps) {
	const [peer, setPeer] = useState<PeerType>(null);
	useEffect(() => {
		import("peerjs")
			.then(({ default: Peer }) => {
				setPeer(new Peer());
			})
			.catch(error_ => {
				console.error(error_);
			});
	}, []);

	return <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>;
}

export function usePeer() {
	return useContext(PeerContext);
}
