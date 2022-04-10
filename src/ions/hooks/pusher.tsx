import Pusher from "pusher-js";
import { useEffect } from "react";
import process from "process";

export type Events = Record<string, (data: Record<string, unknown>) => void>;

export function usePusher(channel: string, events?: Events) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// Enable pusher logging - don't include this in production
			Pusher.logToConsole = true;
		}

		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: "eu",
		});

		const mainChannel = pusher.subscribe(channel);

		if (events) {
			for (const key in events) {
				if (Object.prototype.hasOwnProperty.call(events, key)) {
					mainChannel.bind(key, events[key]);
				}
			}
		}

		return () => {
			pusher.unsubscribe(channel);
		};
	}, [channel, events]);
}
