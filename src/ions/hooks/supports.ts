import { useEffect, useState } from "react";

export function useSupports(feature: string, type: string) {
	const [supported, setSupported] = useState(false);
	useEffect(() => {
		let resolvedFeature: unknown = window;
		const path = feature.split(".");
		const last = path[path.length - 1];
		for (const point of path) {
			if (typeof resolvedFeature[point] === "undefined") {
				break;
			} else {
				resolvedFeature = resolvedFeature[point];
				if (point === last && typeof resolvedFeature === type) {
					setSupported(true);
				}
			}
		}
	}, [feature, type]);
	return supported;
}
